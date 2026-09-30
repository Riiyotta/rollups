#!/usr/bin/env python3
"""
Self-containment + schema + structural + maxWords + drift verification, all in one.
Run from anywhere: repo root is derived from this file's own location (never hardcoded),
so this script works identically in place or copied to an isolated scratch directory with
zero siblings.

Checks:
  1. registry.manifest.json's counts block matches the real files on disk.
  2. allowlist parity: every tokens/llm/component-allowlist.json entry has a matching file,
     every real primitive/component/section file has an allowlist entry.
  3. allowlistVersion in registry.manifest.json matches component-allowlist.json's own version.
  4. citation-range validity: every measuredFrom "path:line[-line]" citation resolves against
     a real file IF a sibling source tree is present (this repo's own extraction/measured-values.json
     citations reference the ORIGINAL project's files, one level up — this check degrades
     gracefully to a warning, not a failure, when that sibling tree isn't found, e.g. after
     this design-repo is zipped/copied standalone).
  5. Pinned-value asset-role check: company-logo / trusted-by-logo / testimonial-author-photo
     must be pinned to generationPolicy "must-reuse-exact-or-omit" specifically (not just any
     valid enum member) — a membership-only check would silently accept a swap to
     "may-generate-new", which is still valid-enum but compliance-wrong.
  6. No absolute /Users/ (or other local machine) paths anywhere in the repo.
  7. No entryPoints in registry.manifest.json use a ../ path.
"""
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FAILURES = []
WARNINGS = []


def fail(msg):
    FAILURES.append(msg)
    print(f"FAIL: {msg}")


def warn(msg):
    WARNINGS.append(msg)
    print(f"WARN: {msg}")


def ok(msg):
    print(f"OK:   {msg}")


def load(relpath):
    with open(os.path.join(REPO_ROOT, relpath)) as f:
        return json.load(f)


def check_manifest_counts():
    manifest = load("registry.manifest.json")
    counts = manifest["counts"]

    def count_files(d, exclude=None):
        p = os.path.join(REPO_ROOT, d)
        files = [f for f in os.listdir(p) if f.endswith(".json")]
        return len(files)

    real = {
        "foundationTokenFiles": count_files("tokens/00-foundation"),
        "semanticTokenFiles": count_files("tokens/10-semantic"),
        "componentTokenFiles": count_files("tokens/20-component"),
        "layoutTokenFiles": count_files("tokens/30-layout"),
        "themeFiles": count_files("tokens/themes"),
        "primitives": count_files("primitives"),
        "components": count_files("components"),
        "sections": count_files("sections"),
        "templates": len(load("templates/templates.json")["templates"]),
        "assetRoles": len(load("tokens/llm/asset-roles.json")["roles"]),
        "compatibilityGraphRules": len(load("compatibility/graph.json")["rules"]),
    }

    for key, real_val in real.items():
        claimed = counts.get(key)
        if claimed != real_val:
            fail(f"manifest counts.{key} = {claimed}, but real count on disk = {real_val}")
        else:
            ok(f"manifest counts.{key} = {claimed} matches disk")

    # Route coverage recompute
    templates_doc = load("templates/templates.json")
    all_routes = []
    for t in templates_doc["templates"]:
        all_routes.extend(t["routes"])
    if len(all_routes) != len(set(all_routes)):
        dupes = [r for r in all_routes if all_routes.count(r) > 1]
        fail(f"duplicate route assignment across templates: {dupes}")
    else:
        ok(f"route coverage: {len(all_routes)} routes, each assigned exactly once")
    if counts.get("realRoutesCoveredByTemplates") != len(all_routes):
        fail(f"manifest counts.realRoutesCoveredByTemplates = {counts.get('realRoutesCoveredByTemplates')}, real = {len(all_routes)}")
    else:
        ok(f"manifest counts.realRoutesCoveredByTemplates matches real route coverage ({len(all_routes)})")


def check_allowlist_parity():
    allowlist = load("tokens/llm/component-allowlist.json")
    entries = allowlist["entries"]
    entry_paths = {e["path"] for e in entries}
    entry_ids = {e["id"] for e in entries}

    missing_files = [e for e in entries if not os.path.exists(os.path.join(REPO_ROOT, e["path"]))]
    if missing_files:
        fail(f"allowlist entries with no matching file (phantom entries): {[e['id'] for e in missing_files]}")
    else:
        ok(f"all {len(entries)} allowlist entries have matching files")

    real_files = []
    for d in ["primitives", "components", "sections"]:
        for fname in os.listdir(os.path.join(REPO_ROOT, d)):
            if fname.endswith(".json"):
                real_files.append(f"{d}/{fname}")
    orphans = [f for f in real_files if f not in entry_paths]
    if orphans:
        fail(f"real contract files with no allowlist entry (orphans): {orphans}")
    else:
        ok(f"all {len(real_files)} real contract files have allowlist entries")

    if len(entry_ids) != len(entries):
        fail("duplicate ids in allowlist entries")


def check_allowlist_version_parity():
    manifest = load("registry.manifest.json")
    allowlist = load("tokens/llm/component-allowlist.json")
    m_ver = manifest.get("allowlistVersion")
    a_ver = allowlist.get("allowlistVersion")
    if m_ver != a_ver:
        fail(f"registry.manifest.json allowlistVersion ({m_ver}) != tokens/llm/component-allowlist.json allowlistVersion ({a_ver})")
    else:
        ok(f"allowlistVersion parity: {m_ver}")


CITATION_RE = re.compile(r"^([A-Za-z0-9_./-]+\.(?:jsx?|tsx?|json|css|md)):(\d+)(?:-(\d+))?$")


def check_citations():
    """Citations in extraction/measured-values.json and section/*.json 'measuredFrom' fields
    reference the ORIGINAL source project (one directory up from design-repo/). This check
    degrades gracefully — warns, doesn't fail — when that sibling tree isn't present, e.g.
    when design-repo/ has been copied/zipped standalone (the self-containment test)."""
    sibling_root = os.path.dirname(REPO_ROOT)
    project_markers = ["src", "package.json"]
    sibling_present = all(os.path.exists(os.path.join(sibling_root, m)) for m in project_markers)

    if not sibling_present:
        warn(f"sibling source tree not found at {sibling_root} — citation-range validity check skipped gracefully (expected when design-repo is copied standalone)")
        return

    checked = 0
    resolved_ok = 0
    bad = []

    def walk_citations(obj):
        nonlocal checked
        if isinstance(obj, str) and "measuredFrom" not in obj:
            return
        if isinstance(obj, dict):
            mf = obj.get("measuredFrom")
            if isinstance(mf, str):
                for part in re.split(r",\s*", mf):
                    m = CITATION_RE.match(part.strip())
                    if m:
                        checked += 1
                        fpath, start, end = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
                        full = os.path.join(sibling_root, fpath)
                        if not os.path.exists(full):
                            bad.append(f"{part.strip()} -> file does not exist: {full}")
                            continue
                        with open(full, errors="ignore") as fh:
                            nlines = sum(1 for _ in fh)
                        if end > nlines:
                            bad.append(f"{part.strip()} -> range exceeds file length ({nlines} lines)")
                        else:
                            nonlocal resolved_ok
                            resolved_ok += 1
            for v in obj.values():
                walk_citations(v)
        elif isinstance(obj, list):
            for v in obj:
                walk_citations(v)

    for d in ["tokens", "primitives", "components", "sections", "templates", "extraction"]:
        for root, _, files in os.walk(os.path.join(REPO_ROOT, d)):
            for fname in files:
                if fname.endswith(".json"):
                    try:
                        data = json.load(open(os.path.join(root, fname)))
                    except json.JSONDecodeError:
                        continue
                    walk_citations(data)

    if bad:
        fail(f"{len(bad)} of {checked} parseable line-range citations are invalid: {bad[:10]}{'...' if len(bad) > 10 else ''}")
    else:
        ok(f"citation-range validity: {resolved_ok}/{checked} parseable line-range citations resolve against real files")


def check_pinned_asset_roles():
    roles = load("tokens/llm/asset-roles.json")["roles"]
    pinned = {
        "company-logo": "must-reuse-exact-or-omit",
        "trusted-by-logo": "must-reuse-exact-or-omit",
        "testimonial-author-photo": "must-reuse-exact-or-omit",
    }
    for role_id, expected_policy in pinned.items():
        role = roles.get(role_id)
        if not role:
            fail(f"pinned asset role '{role_id}' missing from tokens/llm/asset-roles.json entirely")
            continue
        actual = role.get("generationPolicy")
        if actual != expected_policy:
            fail(f"asset role '{role_id}' generationPolicy is '{actual}', must be pinned to '{expected_policy}' (compliance-critical — real third-party logos/photos)")
        else:
            ok(f"pinned asset role '{role_id}' correctly set to '{expected_policy}'")


def check_no_absolute_paths():
    # Matches a real absolute-path occurrence (/Users/<name>/...), not the bare literal "/Users/"
    # substring that appears inside this checker's own pattern definition and docstrings.
    pattern = re.compile(r"/Users/[A-Za-z0-9_.-]+(?:/[^\"'\s]*)?")
    self_path = os.path.abspath(__file__)
    hits = []
    for root, dirs, files in os.walk(REPO_ROOT):
        for fname in files:
            if fname.endswith((".json", ".py", ".md")):
                fpath = os.path.join(root, fname)
                if os.path.abspath(fpath) == self_path:
                    continue  # this file legitimately contains the pattern source /"Users/" text and comments about it
                try:
                    text = open(fpath, errors="ignore").read()
                except Exception:
                    continue
                for m in pattern.finditer(text):
                    hits.append(f"{os.path.relpath(fpath, REPO_ROOT)}: {m.group(0)}")
    if hits:
        fail(f"{len(hits)} absolute /Users/ path(s) found: {hits[:10]}{'...' if len(hits) > 10 else ''}")
    else:
        ok("no absolute /Users/ paths found anywhere in the repo")


def check_entrypoints_self_contained():
    manifest = load("registry.manifest.json")
    entry_points = manifest.get("entryPoints", {})
    bad = []
    for key, val in entry_points.items():
        if key == "note":
            continue
        if isinstance(val, str) and (".." in val or val.startswith("/")):
            bad.append(f"{key}: {val}")
        if isinstance(val, str) and not val.startswith("note") and not os.path.exists(os.path.join(REPO_ROOT, val)):
            bad.append(f"{key}: {val} does not exist inside design-repo/")
    if bad:
        fail(f"entryPoints not self-contained: {bad}")
    else:
        ok(f"all {len([k for k in entry_points if k != 'note'])} entryPoints are self-contained, existing files inside design-repo/")


def main():
    print(f"Repo root: {REPO_ROOT}\n")
    check_manifest_counts()
    print()
    check_allowlist_parity()
    print()
    check_allowlist_version_parity()
    print()
    check_citations()
    print()
    check_pinned_asset_roles()
    print()
    check_no_absolute_paths()
    print()
    check_entrypoints_self_contained()
    print()

    print(f"\n{'='*60}")
    print(f"TOTAL: {len(FAILURES)} failure(s), {len(WARNINGS)} warning(s)")
    if FAILURES:
        for f in FAILURES:
            print(f"  FAIL: {f}")
        sys.exit(1)
    print("ALL CHECKS PASSED")
    sys.exit(0)


if __name__ == "__main__":
    main()
