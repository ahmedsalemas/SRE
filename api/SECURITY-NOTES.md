# Trivy Scan Findings — accepted/deferred

- alpine 3.23.4 base: 4 OS-level findings as of 2026-09-12, no fixed
  version available upstream yet. Monitored, not blocking — will be
  resolved automatically on next `docker pull node:20-alpine` once
  Alpine ships a patch. Re-scan weekly.
- npm CLI's bundled dependencies (previously flagged under
  node_modules/npm/node_modules/*) removed from the runtime image via
  `npm uninstall -g npm` in the final Docker stage — npm is never
  invoked at container runtime, so this eliminated a real but
  non-reachable finding rather than just suppressing it.