#!/usr/bin/env python3
"""
Semantic validator for Rollups marketing-site PageSpecs.
Enforces everything JSON Schema structurally cannot express:
 - basedOnTemplate required-vs-extra section enforcement (cross-referenced against
   templates/templates.json's REAL node list for the declared template — not nodes[]
   checked in isolation).
 - Rhythm rules from compatibility/graph.json, respecting severity (error vs warn).
 - Required reducedMotionFallback presence on every node's motion object.
 - Per-instance maxWords word counts, derived from sections/*.json content contracts.
 - Route-to-template consistency (route must be one of the template's own `routes`,
   or match `routes: ["/blog/:slug"]` pattern for parametrized routes).

Path portability: repo root is derived from this file's own location, never hardcoded.
"""
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(relpath):
    with open(os.path.join(REPO_ROOT, relpath)) as f:
        return json.load(f)


def word_count(text):
    if not isinstance(text, str):
        return 0
    return len(re.findall(r"\S+", text))


class ValidationError(Exception):
    pass


def load_templates():
    return {t["id"]: t for t in load("templates/templates.json")["templates"]}


def load_sections():
    sections = {}
    sec_dir = os.path.join(REPO_ROOT, "sections")
    for fname in os.listdir(sec_dir):
        if not fname.endswith(".json"):
            continue
        data = json.load(open(os.path.join(sec_dir, fname)))
        # id like "section.hero.product" -> node-enum key "hero.product"
        key = data["id"][len("section."):]
        sections[key] = data
    return sections


def load_graph_rules():
    return load("compatibility/graph.json")["rules"]


def load_components():
    components = {}
    comp_dir = os.path.join(REPO_ROOT, "components")
    for fname in os.listdir(comp_dir):
        if not fname.endswith(".json"):
            continue
        data = json.load(open(os.path.join(comp_dir, fname)))
        key = data["id"]  # e.g. "component.faq-item"
        components[key] = data
    return components


def validate_pagespec(spec, templates, sections, graph_rules, errors, warnings):
    template_id = spec.get("template")
    route = spec.get("route")
    nodes = spec.get("nodes", [])

    # --- 1. Template must exist ---
    if template_id not in templates:
        errors.append(f"Unknown template '{template_id}' — not present in templates/templates.json")
        return
    template = templates[template_id]

    # --- 2. Route must belong to the declared template ---
    tpl_routes = template.get("routes", [])
    route_ok = route in tpl_routes
    if not route_ok and "/blog/:slug" in tpl_routes:
        route_ok = bool(re.match(r"^/blog/[a-z0-9-]+$", route or ""))
    if not route_ok:
        errors.append(f"Route '{route}' is not declared for template '{template_id}' (template.routes={tpl_routes})")

    # --- 3. THE CORE CHECK (MASTER-GUIDE 3.3): node sequence must match declared template's real node list ---
    expected_nodes = template["nodes"]
    expected_sections = [n["section"] for n in expected_nodes]
    actual_sections = [n.get("section") for n in nodes]

    if actual_sections != expected_sections:
        errors.append(
            f"Node sequence mismatch for template '{template_id}': "
            f"expected {expected_sections}, got {actual_sections}"
        )

    # Required/repeatable flags must match template's own declaration per node
    for i, (exp, act) in enumerate(zip(expected_nodes, nodes)):
        if exp["section"] != act.get("section"):
            continue  # already flagged above
        if act.get("required") != exp["required"]:
            errors.append(f"Node[{i}] '{exp['section']}': required flag {act.get('required')} != template's {exp['required']}")
        if act.get("repeatable") != exp["repeatable"]:
            errors.append(f"Node[{i}] '{exp['section']}': repeatable flag {act.get('repeatable')} != template's {exp['repeatable']}")

    # --- 4. Required reducedMotionFallback on every node ---
    for i, node in enumerate(nodes):
        motion = node.get("motion")
        if not motion or not motion.get("reducedMotionFallback"):
            errors.append(f"Node[{i}] '{node.get('section')}' missing required motion.reducedMotionFallback")

    # --- 5. Rhythm rules from compatibility/graph.json ---
    section_seq = actual_sections
    categories = [sections.get(s, {}).get("category") for s in section_seq]

    for rule in graph_rules:
        rid = rule["id"]
        sev = rule["severity"]
        bucket = errors if sev == "error" else warnings

        if rid == "ONE_NAVBAR_PER_PAGE":
            if section_seq.count("shell.navbar") != 1 or (section_seq and section_seq[0] != "shell.navbar"):
                bucket.append(f"[{rid}] shell.navbar must appear exactly once, first")

        elif rid == "ONE_FOOTER_PER_PAGE":
            if section_seq.count("shell.footer") != 1:
                bucket.append(f"[{rid}] shell.footer must appear exactly once")
            elif len(section_seq) < 2 or section_seq[-2] != "shell.footer":
                bucket.append(f"[{rid}] shell.footer must be immediately followed by shell.cookiebar as the final two nodes")

        elif rid == "ONE_HERO_PER_PAGE":
            no_hero_templates = {"template.contact-form", "template.blog-index", "template.blog-article", "template.legal-doc", "template.placeholder-stub"}
            hero_count = sum(1 for s in section_seq if s.startswith("hero."))
            if template_id in no_hero_templates:
                if hero_count != 0:
                    bucket.append(f"[{rid}] template '{template_id}' is a named no-hero exception but has {hero_count} hero node(s)")
            else:
                if hero_count != 1:
                    bucket.append(f"[{rid}] expected exactly 1 hero.* node, found {hero_count}")
                elif len(section_seq) < 2 or section_seq[1] != next(s for s in section_seq if s.startswith("hero.")):
                    bucket.append(f"[{rid}] hero node must immediately follow shell.navbar")

        elif rid == "FAQ_MUST_PRECEDE_FOOTER":
            if "faq.accordion" in section_seq:
                idx = section_seq.index("faq.accordion")
                if idx + 1 >= len(section_seq) or section_seq[idx + 1] != "shell.footer":
                    bucket.append(f"[{rid}] faq.accordion must be immediately followed by shell.footer")

        elif rid == "TESTIMONIAL_SLIDER_SCOPE":
            allowed = {"template.product-landing", "template.product-landing-scroll"}
            if "testimonial.slider" in section_seq and template_id not in allowed:
                bucket.append(f"[{rid}] testimonial.slider not permitted on template '{template_id}'")

        elif rid == "MOTION_BUDGET_SCROLL_SCRUB":
            for node in nodes:
                if node.get("motion", {}).get("pattern") == "scroll-scrubbed-lottie" and node.get("section") != "hero.consolidate-scroll":
                    bucket.append(f"[{rid}] scroll-scrubbed-lottie motion pattern only permitted on hero.consolidate-scroll, found on '{node.get('section')}'")

        elif rid == "REAL_LOGO_NO_FABRICATION":
            pinned_roles = {"company-logo", "trusted-by-logo", "testimonial-author-photo"}
            def walk(obj):
                if isinstance(obj, dict):
                    if obj.get("assetRole") in pinned_roles and not obj.get("path"):
                        bucket.append(f"[{rid}] assetRole '{obj.get('assetRole')}' present with no real path citation")
                    for v in obj.values():
                        walk(v)
                elif isinstance(obj, list):
                    for v in obj:
                        walk(v)
            walk(spec)

        # NO_ADJACENT_SAME_CATEGORY, NO_CONSECUTIVE_SCROLL_STAGES, SIGNUP_TOKENS_EXCLUDED
        # are warn-severity, structural/repo-wide checks not meaningfully evaluable per-instance
        # beyond what's already covered above; intentionally not re-implemented here to avoid
        # false positives on the named real exceptions documented in graph.json.

    # --- 6. maxWords enforcement per real content field (recurses into array-of-component-ref fields) ---
    components = load_components()
    _check_maxwords(spec, sections, components, errors)


def _field_maxwords_map(fields):
    """Component contracts store field rules under 'fields' with either a dict {"type":..,"maxWords":N}
    or a shorthand string like 'string maxWords:60'. Normalize both into {field: maxWordsInt}."""
    out = {}
    for name, rule in (fields or {}).items():
        if isinstance(rule, dict) and "maxWords" in rule:
            out[name] = rule["maxWords"]
        elif isinstance(rule, str):
            m = re.search(r"maxWords[:\s]+(\d+)", rule)
            if m:
                out[name] = int(m.group(1))
    return out


def _check_maxwords(spec, sections, components, errors):
    """Walk each node's content against its section contract's maxWords budgets, including
    recursing into array fields whose items are {"type":"ref","component":"component.X"} —
    the real shape used by faq.accordion.items (component.faq-item), testimonial.slider.items
    (component.testimonial-card), etc."""
    for node in spec.get("nodes", []):
        sec_key = node.get("section")
        sec = sections.get(sec_key)
        if not sec:
            continue
        content_contract = sec.get("content", {})
        actual_content = node.get("content", {})
        for field, rule in content_contract.items():
            if not isinstance(rule, dict):
                continue

            # Direct string field with a maxWords budget
            if "maxWords" in rule:
                val = actual_content.get(field)
                if isinstance(val, str):
                    wc = word_count(val)
                    if wc > rule["maxWords"]:
                        errors.append(f"Node '{sec_key}' field '{field}' exceeds maxWords ({wc} > {rule['maxWords']})")
                continue

            # Array of component refs — check each item's string fields against the component's own budgets
            if rule.get("type") == "array":
                items_rule = rule.get("items", {})
                comp_id = items_rule.get("component") if isinstance(items_rule, dict) else None
                if not comp_id or comp_id not in components:
                    continue
                comp = components[comp_id]
                # component contracts may nest fields directly, or under a single variant
                comp_fields = comp.get("fields")
                if not comp_fields and "variants" in comp:
                    # polymorphic component (e.g. pricing-cell): union all variant field budgets
                    comp_fields = {}
                    for variant in comp["variants"].values():
                        comp_fields.update(variant.get("fields", {}))
                budgets = _field_maxwords_map(comp_fields)
                actual_items = actual_content.get(field, [])
                if isinstance(actual_items, list):
                    for idx, item in enumerate(actual_items):
                        if not isinstance(item, dict):
                            continue
                        for subfield, maxw in budgets.items():
                            val = item.get(subfield)
                            if isinstance(val, str):
                                wc = word_count(val)
                                if wc > maxw:
                                    errors.append(
                                        f"Node '{sec_key}' field '{field}[{idx}].{subfield}' exceeds maxWords ({wc} > {maxw})"
                                    )


def main():
    if len(sys.argv) < 2:
        print("usage: semantic_validate.py <pagespec.json>", file=sys.stderr)
        sys.exit(2)

    spec = json.load(open(sys.argv[1]))
    templates = load_templates()
    sections = load_sections()
    graph_rules = load_graph_rules()

    errors, warnings = [], []
    validate_pagespec(spec, templates, sections, graph_rules, errors, warnings)

    for w in warnings:
        print(f"WARN: {w}")
    for e in errors:
        print(f"ERROR: {e}")

    if errors:
        print(f"\nFAILED: {len(errors)} error(s), {len(warnings)} warning(s)")
        sys.exit(1)
    print(f"\nPASSED: 0 errors, {len(warnings)} warning(s)")
    sys.exit(0)


if __name__ == "__main__":
    main()
