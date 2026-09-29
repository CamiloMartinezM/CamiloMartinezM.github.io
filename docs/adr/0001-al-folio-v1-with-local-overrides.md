# al-folio v1.2 with local theme overrides

The site is built on al-folio v1.2, whose theme ships as pinned gems. The alternative was v0.16, the last release that kept all theme code in the repository. v1.2 was chosen because it keeps the same classic look, is still maintained and leaves far less theme code in this repository. The few customizations, starting with the accent colors in `_sass/_themes.scss`, are local override files. al-folio's integration-test workflow (`unit-tests.yml`, the "style contract") fails whenever `_includes/`, `_layouts/` or `_sass/` exist or its demo posts are deleted, so that workflow was removed on purpose.

## Consequences

- Do not restore `unit-tests.yml`. It checks the al-folio template itself, not a personal site built from it.
- When bumping the gem pins in `Gemfile`, compare each override against the new gem's copy of the same file. `bundle exec al-folio upgrade audit` lists them.
