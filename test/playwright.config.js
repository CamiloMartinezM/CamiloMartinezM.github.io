const path = require("path");
const { devices } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "..");

// Serves the site built by `bundle exec jekyll build` (or a downloaded CI artifact unpacked to _site).
const webServer = process.env.NO_WEBSERVER
  ? undefined
  : {
      command: "python3 -m http.server 4000 --bind 127.0.0.1 --directory _site",
      cwd: repoRoot,
      url: "http://127.0.0.1:4000/",
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    };

module.exports = {
  testDir: __dirname,
  outputDir: path.join(repoRoot, "test-results"),
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: "http://127.0.0.1:4000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer,
  projects: [
    {
      name: "desktop",
      use: {
        viewport: { width: 1366, height: 900 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 12"],
        defaultBrowserType: "chromium",
      },
    },
  ],
};
