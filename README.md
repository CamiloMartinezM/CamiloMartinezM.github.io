# CamiloMartinezM.github.io

My personal academic website, built with [al-folio](https://github.com/alshedivat/al-folio) v1.2, a Jekyll theme for academic websites.

## Build and preview

There is no local Jekyll setup. GitHub Actions builds the site:

- Every push to a pull request into `main` builds the site without deploying it, uploads it as the `site` artifact and runs the Playwright browser tests in `test/` against it.
- To preview a build, download its artifact (`gh run download <run-id> --name site --dir _site`) and serve `_site` with any static file server. `npm test` runs the browser tests against `_site` (it needs `python3`).
- A push to `main` builds the site and deploys it to the `gh-pages` branch, which GitHub Pages serves.

The formatting check is `npx prettier . --check`.

## License

MIT, see [LICENSE](LICENSE). The code is based on al-folio v1.2 by Maruan Al-Shedivat.
