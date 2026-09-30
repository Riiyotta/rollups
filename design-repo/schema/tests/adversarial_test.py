#!/usr/bin/env python3
"""
Adversarial test suite. For every rule in schema/pagespec.schema.json and
schema/semantic_validate.py, constructs a mutated instance that should be REJECTED,
and proves it is. Also asserts the control case: the unmutated example, and one
minimal synthesized instance per real template, all produce zero errors.

Path portability: repo root derived from __file__, never hardcoded.
"""
import copy
import json
import os
import subprocess
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCHEMA_DIR = os.path.join(REPO_ROOT, "schema")

sys.path.insert(0, SCHEMA_DIR)
import semantic_validate as sv  # noqa: E402

try:
    import jsonschema
    from jsonschema import Draft7Validator
    HAVE_JSONSCHEMA = True
except ImportError:
    HAVE_JSONSCHEMA = False


def load_json(relpath):
    with open(os.path.join(REPO_ROOT, relpath)) as f:
        return json.load(f)


PASS = []
FAIL = []


def check(name, condition, detail=""):
    if condition:
        PASS.append(name)
    else:
        FAIL.append(f"{name}: {detail}")


def schema_validate(instance, schema):
    if not HAVE_JSONSCHEMA:
        return []
    validator = Draft7Validator(schema)
    return sorted(validator.iter_errors(instance), key=lambda e: e.path)


def semantic_validate(instance):
    templates = sv.load_templates()
    sections = sv.load_sections()
    graph_rules = sv.load_graph_rules()
    errors, warnings = [], []
    sv.validate_pagespec(instance, templates, sections, graph_rules, errors, warnings)
    return errors, warnings


def main():
    schema = load_json("schema/pagespec.schema.json")
    example = load_json("schema/example.pagespec.json")
    templates_doc = load_json("templates/templates.json")

    # ---------- CONTROL CASES ----------
    errs = schema_validate(example, schema)
    check("control: bundled example passes Draft-07 schema", len(errs) == 0, str(errs))

    sem_errs, sem_warns = semantic_validate(example)
    check("control: bundled example passes semantic validator", len(sem_errs) == 0, str(sem_errs))

    # One minimal synthesized control PageSpec per real template (generic loop —
    # auto-covers any future template addition, per MASTER-GUIDE.md 3.22's reusable technique).
    sections_map = sv.load_sections()
    for tpl in templates_doc["templates"]:
        route = tpl["routes"][0] if tpl["routes"][0] != "/blog/:slug" else "/blog/announcing-rollups"
        nodes = []
        for n in tpl["nodes"]:
            sec = sections_map.get(n["section"], {})
            motion = {"pattern": "none", "reducedMotionFallback": "n/a — synthesized control"}
            nodes.append({
                "section": n["section"],
                "required": n["required"],
                "repeatable": n["repeatable"],
                "content": {},
                "motion": motion,
            })
        instance = {"template": tpl["id"], "route": route, "theme": "light", "nodes": nodes}
        errs = schema_validate(instance, schema)
        check(f"control: synthesized minimal instance for {tpl['id']} passes Draft-07 schema", len(errs) == 0, str(errs))
        sem_errs, sem_warns = semantic_validate(instance)
        check(f"control: synthesized minimal instance for {tpl['id']} passes semantic validator", len(sem_errs) == 0, str(sem_errs))

    # ---------- ADVERSARIAL MUTATIONS ----------

    # 1. Schema-layer: wrong enum value for template
    bad = copy.deepcopy(example)
    bad["template"] = "template.does-not-exist"
    errs = schema_validate(bad, schema)
    check("adversarial: invented template enum value rejected by schema", len(errs) > 0)

    # 2. Schema-layer: missing required field (route)
    bad = copy.deepcopy(example)
    del bad["route"]
    errs = schema_validate(bad, schema)
    check("adversarial: missing required 'route' rejected by schema", len(errs) > 0)

    # 3. Schema-layer: invented section type alias
    bad = copy.deepcopy(example)
    bad["nodes"][1]["section"] = "hero.invented-variant"
    errs = schema_validate(bad, schema)
    check("adversarial: invented section enum value rejected by schema", len(errs) > 0)

    # 4. Schema-layer: missing reducedMotionFallback
    bad = copy.deepcopy(example)
    del bad["nodes"][1]["motion"]["reducedMotionFallback"]
    errs = schema_validate(bad, schema)
    check("adversarial: missing motion.reducedMotionFallback rejected by schema", len(errs) > 0)
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: missing motion.reducedMotionFallback rejected by semantic validator too", len(sem_errs) > 0)

    # 5. Schema-layer: motion additionalProperties smuggling an invented field
    bad = copy.deepcopy(example)
    bad["nodes"][1]["motion"]["inventedAnimation"] = "spin-forever"
    errs = schema_validate(bad, schema)
    check("adversarial: invented motion field rejected by closed motion schema (additionalProperties:false)", len(errs) > 0)

    # 6. Structural: duplicate one-per-page section (two shell.navbar)
    bad = copy.deepcopy(example)
    bad["nodes"].insert(0, copy.deepcopy(bad["nodes"][0]))
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: duplicate shell.navbar rejected by semantic validator (ONE_NAVBAR_PER_PAGE)", len(sem_errs) > 0, str(sem_errs))

    # 7. Structural: removed mandatory section (drop faq.accordion)
    bad = copy.deepcopy(example)
    bad["nodes"] = [n for n in bad["nodes"] if n["section"] != "faq.accordion"]
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: removed mandatory faq.accordion rejected by semantic validator (node-sequence mismatch)", len(sem_errs) > 0, str(sem_errs))

    # 8. Structural: reordered fixed-position section (footer before hero)
    bad = copy.deepcopy(example)
    footer_node = [n for n in bad["nodes"] if n["section"] == "shell.footer"][0]
    bad["nodes"].remove(footer_node)
    bad["nodes"].insert(1, footer_node)
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: reordered shell.footer rejected by semantic validator (node-sequence mismatch)", len(sem_errs) > 0, str(sem_errs))

    # 9. Structural: template/node-sequence mismatch (declare product-landing-lite, keep testimonial-slider node)
    bad = copy.deepcopy(example)
    bad["template"] = "template.product-landing-lite"
    bad["route"] = "/safe"
    sem_errs, _ = semantic_validate(bad)
    check(
        "adversarial: PageSpec declaring product-landing-lite but with /ruv's node sequence "
        "(including testimonial.slider, which product-landing-lite forbids) rejected",
        len(sem_errs) > 0,
        str(sem_errs),
    )
    check(
        "adversarial: TESTIMONIAL_SLIDER_SCOPE rule specifically fires on the mismatch above",
        any("TESTIMONIAL_SLIDER_SCOPE" in e for e in sem_errs),
        str(sem_errs),
    )

    # 10. Runtime: maxWords overflow on a real field (faq answer way over budget)
    bad = copy.deepcopy(example)
    faq_node = [n for n in bad["nodes"] if n["section"] == "faq.accordion"][0]
    faq_node["content"]["items"][0]["a"] = " ".join(["word"] * 500)
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: maxWords overflow on faq answer rejected by semantic validator", len(sem_errs) > 0, str(sem_errs))

    # 11. Route/template mismatch
    bad = copy.deepcopy(example)
    bad["route"] = "/this-route-does-not-exist"
    sem_errs, _ = semantic_validate(bad)
    check("adversarial: route not declared for template rejected", len(sem_errs) > 0, str(sem_errs))

    # 12. scroll-scrubbed-lottie motion pattern used on wrong section
    bad = copy.deepcopy(example)
    bad["nodes"][1]["motion"]["pattern"] = "scroll-scrubbed-lottie"
    sem_errs, _ = semantic_validate(bad)
    check(
        "adversarial: scroll-scrubbed-lottie motion pattern on hero.product (not hero.consolidate-scroll) rejected (MOTION_BUDGET_SCROLL_SCRUB)",
        any("MOTION_BUDGET_SCROLL_SCRUB" in e for e in sem_errs),
        str(sem_errs),
    )

    # ---------- REPORT ----------
    print(f"PASS: {len(PASS)}")
    for p in PASS:
        print(f"  ok   {p}")
    print(f"FAIL: {len(FAIL)}")
    for f in FAIL:
        print(f"  FAIL {f}")

    if FAIL:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
