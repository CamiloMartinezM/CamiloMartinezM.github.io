const { test, expect } = require("@playwright/test");

const ORIGIN = "http://127.0.0.1:4000";

const SUBTITLE = "M.Sc. Student @Saarland University";

const BIO = [
  {
    text: "Hello there! I'm a Master's student of Data Science and Artificial Intelligence at Saarland University, Germany. I am also a Mechanical Engineer with a Minor in Computational Mathematics from Universidad de los Andes, Colombia.",
    links: [
      [
        "Data Science and Artificial Intelligence",
        "https://saarland-informatics-campus.de/en/studium-studies/data-science-and-artificial-intelligence-master/",
      ],
      ["Universidad de los Andes", "https://en.wikipedia.org/wiki/University_of_the_Andes_(Colombia)"],
    ],
  },
  {
    text: "Currently, I am a Research Assistant at the Material Engineering Center Saarland (MECS), developing Machine Learning models for analysis and characterization tasks in Materials Science and Engineering (MES), leveraging both traditional ML and modern DL approaches. We apply state-of-the-art architectures, e.g., Visual Transformers (ViTs), semi-supervised, and self-supervised learning methods, optimized for low-data regimes for enhancing microstructure classification and segmentation.",
    links: [["Material Engineering Center Saarland (MECS)", "https://www.mec-s.de/en/welcome/"]],
  },
  {
    text: "Before that, I was a Functional Consultant at Indra, where I oversaw a team to enhance utility companies' operational abilities to align with the Industry 4.0, namely, AFINIA in Colombia, Agua de Puebla in Mexico and Sedapal in Peru.",
    links: [
      ["Indra", "https://www.linkedin.com/company/indra/posts/?feedView=all"],
      ["AFINIA", "https://afinia.com.co/"],
      ["Agua de Puebla", "https://www.aguapuebla.mx/"],
      ["Sedapal", "https://www.sedapal.com.pe/"],
    ],
  },
];

const INTERESTS = ["Computer Vision (Robotics & Autonomous Driving)", "Large Vision and Language Models", "Model-based Machine Learning"];

const SOCIAL_LINKS = [
  "https://www.linkedin.com/in/camilo-martinez-m",
  "https://scholar.google.com/citations?user=cD4PXB8AAAAJ",
  "https://github.com/CamiloMartinezM",
  "https://stackoverflow.com/users/13223456",
];

const NEWS = [
  {
    date: "Sep 25, 2026",
    text: "The article A Systematically Designed Open-Access Dataset for Cross-Microscope Machine Learning Benchmarking in Complex Steel Microstructure Classification was published in Scientific Reports.",
    href: "https://www.nature.com/articles/s41598-026-73141-2",
  },
  {
    date: "Jan 08, 2026",
    text: "The article Numerical Study of Regenerative Pump Characteristics Operating under Different Fluid Viscosities and Multistage Arrangement was published in Discover Mechanical Engineering.",
    href: "https://link.springer.com/article/10.1007/s44245-025-00170-y",
  },
  {
    date: "Nov 04, 2024",
    text: "The paper Distinguishing Target and Non-Target Fixations with EEG and Eye Tracking in Realistic Visual Scenes was published in the proceedings of ICMI 2024.",
    href: "https://dl.acm.org/doi/10.1145/3678957.3685728",
  },
];

const squash = (text) => text.replace(/\s+/g, " ").trim();

// Collects what a visitor's browser would flag as broken while a page loads.
function watchPage(page) {
  const problems = { consoleErrors: [], failedRequests: [] };
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => problems.consoleErrors.push(err.message));
  page.on("requestfailed", (req) => {
    if (req.url().startsWith(ORIGIN)) problems.failedRequests.push(`${req.url()} ${req.failure().errorText}`);
  });
  page.on("response", (res) => {
    if (res.url().startsWith(ORIGIN) && res.status() >= 400) problems.failedRequests.push(`${res.url()} ${res.status()}`);
  });
  return problems;
}

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the name heading with a bold first name and a light last name", async ({ page }) => {
    const heading = page.locator("h1.post-title");
    await expect(heading).toHaveText(/^\s*Camilo\s+Martínez\s*$/);
    await expect(heading.locator("span")).toHaveText("Camilo");
    const weights = await heading.evaluate((h) => ({
      first: Number(getComputedStyle(h.querySelector("span")).fontWeight),
      last: Number(getComputedStyle(h).fontWeight),
    }));
    expect(weights.first).toBeGreaterThanOrEqual(700);
    expect(weights.last).toBeLessThanOrEqual(300);
  });

  test("shows the subtitle with Saarland University linked", async ({ page }) => {
    const subtitle = page.locator(".post-header .desc");
    expect(squash(await subtitle.innerText())).toBe(SUBTITLE);
    await expect(subtitle.getByRole("link", { name: "Saarland University" })).toHaveAttribute("href", "https://www.uni-saarland.de/en/home.html");
  });

  test("shows the profile photo floated right and not circular", async ({ page }) => {
    const profile = page.locator(".profile");
    const photo = profile.locator("img");
    await expect(photo).toBeVisible();
    expect(await photo.evaluate((img) => img.currentSrc)).toContain("profile-picture");
    expect(await photo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await profile.evaluate((el) => getComputedStyle(el).float)).toBe("right");
    expect(await photo.evaluate((img) => parseFloat(getComputedStyle(img).borderRadius) < img.clientWidth / 4)).toBe(true);
    await expect(profile.locator(".more-info")).toHaveCount(0);
  });

  test("shows the bio word for word with its links", async ({ page }) => {
    const paragraphs = page.locator(".clearfix > p");
    await expect(paragraphs).toHaveCount(BIO.length);
    for (const [i, expected] of BIO.entries()) {
      const paragraph = paragraphs.nth(i);
      expect(squash(await paragraph.innerText())).toBe(expected.text);
      const links = await paragraph.locator("a").evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
      expect(links).toEqual(expected.links);
    }
  });

  test("shows the Research Interests list word for word", async ({ page }) => {
    await expect(page.locator(".clearfix h2", { hasText: "Research Interests" })).toHaveCount(1);
    const items = page.locator(".clearfix > ul > li");
    expect((await items.allInnerTexts()).map(squash)).toEqual(INTERESTS);
    await expect(items.first().locator("em")).toHaveText(["Robotics", "Autonomous Driving"]);
  });

  test("shows the three latest News items, newest first, without scrolling", async ({ page }) => {
    await expect(page.locator(".clearfix h2", { hasText: "News" })).toHaveCount(1);
    const rows = page.locator(".news tr");
    await expect(rows).toHaveCount(NEWS.length);
    for (const [i, expected] of NEWS.entries()) {
      const row = rows.nth(i);
      expect(squash(await row.locator("th").innerText())).toBe(expected.date);
      expect(squash(await row.locator("td").innerText())).toBe(expected.text);
      await expect(row.locator("td a")).toHaveAttribute("href", expected.href);
    }
    const box = await page.locator(".news .table-responsive").evaluate((el) => ({
      scrolls: el.scrollHeight > el.clientHeight + 1,
      limited: getComputedStyle(el).maxHeight !== "none",
    }));
    expect(box).toEqual({ scrolls: false, limited: false });
  });

  test("shows the social links at the bottom, in order", async ({ page }) => {
    const links = page.locator(".social .contact-icons a");
    expect(await links.evaluateAll((as) => as.map((a) => a.getAttribute("href")))).toEqual(SOCIAL_LINKS);
    for (const link of await links.all()) await expect(link).toBeVisible();
    const below = await page.evaluate(() => {
      const y = (selector) => document.querySelector(selector).getBoundingClientRect().top;
      return y(".social") > y(".news");
    });
    expect(below).toBe(true);
  });

  test("has no construction banner", async ({ page }) => {
    await expect(page.getByText(/under construction/i)).toHaveCount(0);
  });

  test("credits the owner and al-folio in the footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toContainText(`© Copyright ${new Date().getFullYear()} Camilo Martínez`);
    await expect(footer.getByRole("link", { name: "al-folio" })).toHaveAttribute("href", "https://github.com/alshedivat/al-folio");
  });
});

test.describe("accent colors", () => {
  const cases = [
    { scheme: "light", link: "rgb(0, 118, 223)", background: "rgb(255, 255, 255)" },
    { scheme: "dark", link: "rgb(38, 152, 186)", background: "rgb(28, 28, 29)" },
  ];
  for (const { scheme, link, background } of cases) {
    test(`links are ${link} on ${background} in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", scheme);
      await expect(page.locator(".clearfix > p a").first()).toHaveCSS("color", link);
      await expect(page.locator("body")).toHaveCSS("background-color", background);
    });
  }
});

test.describe("site chrome", () => {
  test("navbar shows about and the theme toggle, without search or social icons", async ({ page }) => {
    await page.goto("/");
    const toggler = page.locator(".navbar-toggler-main");
    if (await toggler.isVisible()) await toggler.click();
    const links = await page.locator(".navbar-nav .nav-link").allInnerTexts();
    expect(links.map((text) => squash(text.replace("(current)", "")))).toEqual(["about"]);
    await expect(page.locator("#light-toggle")).toBeVisible();
    await expect(page.locator("#search-toggle")).toHaveCount(0);
    await expect(page.locator("nav .social")).toHaveCount(0);
  });

  test("uses the profile icon as favicon", async ({ page }) => {
    await page.goto("/");
    const href = await page.locator('link[rel="shortcut icon"]').getAttribute("href");
    expect(href).toMatch(/^\/assets\/img\/profile-picture\.ico/);
    expect((await page.request.get(href)).status()).toBe(200);
  });

  test("loads without console errors or failed internal requests", async ({ page }) => {
    const problems = watchPage(page);
    await page.goto("/", { waitUntil: "networkidle" });
    expect(problems.consoleErrors).toEqual([]);
    expect(problems.failedRequests).toEqual([]);
  });

  test("contains no demo content or template base path", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).not.toMatch(/(?:href|src|content)="[^"]*\/al-folio\//);
    expect(html).not.toMatch(/alshedivat\.github\.io/);
    for (const demo of ["Einstein", "Albert", "You R. Name", "your address", "555 your office", "Lorem ipsum"]) {
      expect(html).not.toContain(demo);
    }
    for (const gone of ["/blog/", "/news/", "/cv/", "/repositories/", "/teaching/", "/people/", "/books/", "/publications/", "/projects/"]) {
      expect((await page.request.get(gone)).status(), gone).toBe(404);
    }
  });

  test("keeps repository docs out of the built site", async ({ request }) => {
    const docs = [
      "/AGENTS.md",
      "/CONTEXT.md",
      "/README.md",
      "/LICENSE",
      "/docs/adr/0001-al-folio-v1-with-local-overrides.md",
      "/docs/agents/domain.md",
      "/docs/agents/issue-tracker.md",
      "/docs/agents/triage-labels.md",
    ];
    for (const doc of docs) {
      expect((await request.get(doc)).status(), doc).toBe(404);
    }
  });
});
