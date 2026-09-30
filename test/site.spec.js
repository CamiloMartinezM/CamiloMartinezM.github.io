const { test, expect } = require("@playwright/test");

const ORIGIN = "http://127.0.0.1:4000";

const SUBTITLE = "Research Assistant @Saarland University";

const BIO = [
  {
    text: "Hello there! I'm a full-time research assistant in the Data-Driven Design of Materials (d3M) research group at the Chair of Experimental Methods in Materials Science of Saarland University, Germany. I work on Machine Learning for microstructure analysis in low-data regimes, developing reliable methods for small, heterogeneous datasets while reducing manual annotation effort. To this end, I explore active, semi- and self-supervised learning, synthetic data and the adaptation of foundation models.",
    links: [
      ["Data-Driven Design of Materials (d3M)", "https://martinmueller1104.github.io/d3m.github.io/"],
      ["Chair of Experimental Methods in Materials Science", "https://www.uni-saarland.de/en/chair/motz.html"],
    ],
  },
  {
    text: "I hold a master's degree in Data Science and Artificial Intelligence from Saarland University and a bachelor's degree in Mechanical Engineering with a Minor in Computational Mathematics from Universidad de los Andes, Colombia. Previously, I applied Computer Vision to materials microstructure analysis at the Material Engineering Center Saarland (MECS), worked on multimodal EEG and eye tracking for intent prediction at the German Research Center for Artificial Intelligence (DFKI) and driving photorealistic 3D Gaussian Avatars with EEG signals at the Max Planck Institute for Informatics (MPI).",
    links: [
      [
        "Data Science and Artificial Intelligence",
        "https://saarland-informatics-campus.de/en/studium-studies/data-science-and-artificial-intelligence-master/",
      ],
      ["Universidad de los Andes", "https://www.uniandes.edu.co/en"],
      ["Material Engineering Center Saarland (MECS)", "https://www.mec-s.de/en/welcome/"],
      ["German Research Center for Artificial Intelligence (DFKI)", "https://www.dfki.de/en/web"],
      ["Max Planck Institute for Informatics (MPI)", "https://www.mpi-inf.mpg.de/home"],
    ],
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

const INTERESTS = [
  "Computer Vision for Materials Microstructure Analysis",
  "Data-Frugal Learning: Active, Semi- and Self-Supervised Learning",
  "Vision and Language Foundation Models",
  "Multimodal Learning with EEG",
];

const SOCIAL_LINKS = [
  "https://www.linkedin.com/in/camilo-martinez-m",
  "https://scholar.google.com/citations?user=cD4PXB8AAAAJ",
  "https://github.com/CamiloMartinezM",
  "https://stackoverflow.com/users/13223456",
];

const NEWS = [
  {
    date: "Sep 25, 2026",
    text: "The article A Systematically Designed Open-Access Dataset for Cross-Microscope Machine Learning Benchmarking in Complex Steel Microstructure Classification was published in Scientific Reports (Nature Portfolio).",
    href: "https://www.nature.com/articles/s41598-026-73141-2",
  },
  {
    date: "Jan 08, 2026",
    text: "The article Numerical Study of Regenerative Pump Characteristics Operating under Different Fluid Viscosities and Multistage Arrangement was published in Discover Mechanical Engineering (Springer Nature).",
    href: "https://link.springer.com/article/10.1007/s44245-025-00170-y",
  },
  {
    date: "Nov 04, 2024",
    text: "The paper Distinguishing Target and Non-Target Fixations with EEG and Eye Tracking in Realistic Visual Scenes was published in the proceedings of ICMI 2024.",
    href: "https://dl.acm.org/doi/10.1145/3678957.3685728",
  },
];

const OWNER = "Camilo Martínez";

const PUBLICATIONS = [
  {
    id: "Bachmann_2026",
    year: "2026",
    badge: "Sci. Rep.",
    title:
      "A Systematically Designed Open-Access Dataset for Cross-Microscope Machine Learning Benchmarking in Complex Steel Microstructure Classification",
    authors: ["Björn-Ivo Bachmann", "Marie Stiefel", "Martin Müller", OWNER, "Dominik Britz", "Frank Mücklich"],
    venue: "Scientific Reports (Nature Portfolio), Sep 2026",
    thumbnail: "scientific-reports",
    abstract: "The establishment of robust machine learning workflows for microstructure analysis",
    links: [
      ["Abs", null],
      ["DOI", "https://doi.org/10.1038/s41598-026-73141-2"],
      ["Bib", null],
      ["HTML", "https://www.nature.com/articles/s41598-026-73141-2"],
      ["PDF", "https://www.nature.com/articles/s41598-026-73141-2.pdf"],
    ],
    bibtex: [/month\s*=\s*\{?sep\b/, /pages\s*=\s*\{29853\}/, /volume\s*=\s*\{16\}/],
    notBibtex: [/Sept/, /\bnumber\s*=/, /imprint/, /Nature Portfolio/],
  },
  {
    id: "Pena_2026",
    year: "2026",
    badge: "Discov. Mech. Eng.",
    title: "Numerical Study of Regenerative Pump Characteristics Operating under Different Fluid Viscosities and Multistage Arrangement",
    authors: ["Laura Peña", "Flor Calderon", OWNER, "Jennifer Páez", "Miguel Asuaje", "Omar Lopez", "Nicolas Ratkovich"],
    venue: "Discover Mechanical Engineering (Springer Nature), Jan 2026",
    thumbnail: "discover-mechanical-engineering",
    abstract: "Regenerative (peripheral) pumps offer compact, high-head solutions",
    links: [
      ["Abs", null],
      ["DOI", "https://doi.org/10.1007/s44245-025-00170-y"],
      ["Bib", null],
      ["HTML", "https://link.springer.com/article/10.1007/s44245-025-00170-y"],
      ["PDF", "https://link.springer.com/content/pdf/10.1007/s44245-025-00170-y.pdf"],
    ],
    bibtex: [/month\s*=\s*\{?jan\b/, /pages\s*=\s*\{4\}/, /volume\s*=\s*\{5\}/],
    notBibtex: [/\bnumber\s*=/, /imprint/, /Springer Nature/],
  },
  {
    id: "Sharma_2024",
    year: "2024",
    badge: "ICMI",
    title: "Distinguishing Target and Non-Target Fixations with EEG and Eye Tracking in Realistic Visual Scenes",
    authors: ["Mansi Sharma", OWNER, "Benedikt Emanuel Wirth", "Antonio Krüger", "Philipp Müller"],
    venue: "In Proceedings of the 26th International Conference on Multimodal Interaction",
    thumbnail: "icmi-2024",
    abstract: "Distinguishing target from non-target fixations during visual search",
    links: [
      ["Abs", null],
      ["DOI", "https://doi.org/10.1145/3678957.3685728"],
      ["Bib", null],
      ["HTML", "https://dl.acm.org/doi/10.1145/3678957.3685728"],
      ["PDF", "https://arxiv.org/pdf/2508.01853v1"],
    ],
    bibtex: [
      /booktitle\s*=\s*\{Proceedings of the 26th International Conference on Multimodal Interaction\}/,
      /pages\s*=\s*\{459--468\}/,
      /isbn\s*=\s*\{979-8-4007-0462-8\}/,
      /address\s*=\s*\{New York, NY, USA\}/,
    ],
    notBibtex: [/Multimodel/],
  },
  {
    id: "Martinez_2021",
    year: "2021",
    badge: "B.Sc. Thesis",
    title: "Application of Computer Vision in the Analysis of Microstructures and Obtaining Structure-Property Relationships",
    authors: [OWNER],
    venue: "Universidad de los Andes",
    note: "Bachelor's thesis",
    thumbnail: "bsc-thesis",
    abstract: "Manual identification, classification, and segmentation of micrographs",
    links: [
      ["Abs", null],
      ["Bib", null],
      ["HTML", "http://hdl.handle.net/1992/51616"],
      ["PDF", "https://repositorio.uniandes.edu.co/bitstreams/d18cb27e-10e3-4ae5-bedb-ba84213e67ec/download"],
      ["Code", "https://github.com/CamiloMartinezM/supervised-micrograph-segmentation"],
    ],
    bibtex: [/@mastersthesis/, /note\s*=\s*\{Bachelor's thesis\}/, /month\s*=\s*\{?feb\b/],
    notBibtex: [/\btype\s*=/],
  },
];

const squash = (text) => text.replace(/\s+/g, " ").trim();

// Every page of the site, for the checks that apply to all of them.
const PAGES = [
  "/",
  "/publications/",
  "/projects/",
  "/projects/strings-to-sequences/",
  "/projects/multilingual-lm-representations/",
  "/projects/rend-a-pixel/",
];

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

  test("lists the four Selected publications between the News and the social links", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "selected publications" })).toHaveCount(1);
    const titles = page.locator(".publications ol.bibliography > li .title");
    expect((await titles.allInnerTexts()).map(squash)).toEqual(PUBLICATIONS.map((publication) => publication.title));
    const inOrder = await page.evaluate(() => {
      const y = (selector) => document.querySelector(selector).getBoundingClientRect().top;
      return y(".news") < y(".publications") && y(".publications") < y(".social");
    });
    expect(inOrder).toBe(true);
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

test.describe("publications page", () => {
  const entry = (page, id) => page.locator(`li:has(#${id})`);

  test.beforeEach(async ({ page }) => {
    await page.goto("/publications/");
  });

  test("groups the four Publications by year, newest first", async ({ page }) => {
    const groups = await page.locator(".publications h2.bibliography").evaluateAll((headings) =>
      headings.map((h) => ({
        year: h.textContent.trim(),
        ids: [...h.nextElementSibling.querySelectorAll(":scope > li .title")].map((title) => title.parentElement.id),
      }))
    );
    const expected = [];
    for (const { id, year } of PUBLICATIONS) {
      if (expected.at(-1)?.year === year) expected.at(-1).ids.push(id);
      else expected.push({ year, ids: [id] });
    }
    expect(groups).toEqual(expected);
  });

  test("has no intro text, search, badges, award labels or topic filter", async ({ page }) => {
    for (const text of await page.locator(".post-description").allInnerTexts()) expect(text.trim()).toBe("");
    await expect(page.locator("article > *:not(.publications)").filter({ hasText: /\S/ })).toHaveCount(0);
    for (const gone of [".badges", ".altmetric-embed", "a.award", "input", "[data-toggle=popover]", "sup"]) {
      await expect(page.locator(`.publications ${gone}`), gone).toHaveCount(0);
    }
  });

  for (const publication of PUBLICATIONS) {
    test.describe(publication.badge, () => {
      test("shows its title, venue and venue badge in the accent color", async ({ page }) => {
        const li = entry(page, publication.id);
        await expect(li.locator(".title")).toHaveText(publication.title);
        const periodical = squash((await li.locator(".periodical").allInnerTexts()).join(" "));
        expect(periodical).toContain(publication.venue);
        if (publication.note) expect(periodical.replaceAll("’", "'")).toContain(publication.note);
        const badge = li.locator("abbr.badge");
        expect(squash(await badge.textContent())).toBe(publication.badge);
        await expect(badge).toHaveCSS("background-color", "rgb(0, 118, 223)");
      });

      test("shows its authors in the original order with the owner underlined", async ({ page }) => {
        const author = entry(page, publication.id).locator(".author");
        const text = squash(await author.innerText());
        let from = 0;
        for (const name of publication.authors) {
          const at = text.indexOf(name, from);
          expect(at, `${name} in "${text}"`).toBeGreaterThanOrEqual(from);
          from = at + name.length;
        }
        expect(text).not.toMatch(/more author/);
        const self = author.locator("em");
        await expect(self).toHaveCount(1);
        expect(squash(await self.innerText())).toBe(OWNER);
        expect(await self.evaluate((el) => getComputedStyle(el).textDecorationLine)).toContain("underline");
      });

      test("shows a loaded, unaltered thumbnail", async ({ page }) => {
        const image = entry(page, publication.id).locator(".abbr img");
        await expect(image).toHaveCount(1);
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
        expect(await image.evaluate((img) => img.currentSrc)).toContain(publication.thumbnail);
        const shape = await image.evaluate((img) => ({
          fit: getComputedStyle(img).objectFit,
          natural: img.naturalWidth / img.naturalHeight,
          shown: img.clientWidth / img.clientHeight,
        }));
        expect(shape.fit).not.toBe("cover");
        expect(Math.abs(shape.shown / shape.natural - 1)).toBeLessThan(0.02);
      });

      test("has its buttons, with the expected link targets", async ({ page }) => {
        const buttons = entry(page, publication.id).locator(".links a.btn");
        const actual = await buttons.evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
        expect(actual).toEqual(publication.links);
      });

      test("expands its abstract in place", async ({ page }) => {
        const li = entry(page, publication.id);
        const panel = li.locator(".abstract.hidden");
        const height = () => panel.evaluate((el) => el.getBoundingClientRect().height);
        expect(await height()).toBeLessThan(5);
        await li.locator("a.abstract").click();
        await expect.poll(height).toBeGreaterThan(50);
        const abstract = squash(await panel.innerText());
        expect(abstract).toContain(publication.abstract);
        expect(abstract).not.toMatch(/&\w+;/);
      });

      test("reveals its BibTeX with the corrected fields", async ({ page }) => {
        const li = entry(page, publication.id);
        const panel = li.locator(".bibtex.hidden");
        await expect(panel).toBeHidden();
        await li.locator("a.bibtex").click();
        await expect(panel).toBeVisible();
        const text = await panel.innerText();
        // The owner is one whole name in the author list, spelled exactly so.
        expect(text).toMatch(/author\s*=\s*\{(?:[^}]* and )?Martínez, Camilo(?: and [^}]*)?\}/);
        for (const pattern of publication.bibtex) expect(text).toMatch(pattern);
        for (const pattern of publication.notBibtex) expect(text).not.toMatch(pattern);
      });
    });
  }
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
  test("navbar shows about, publications, projects and the theme toggle, without search or social icons", async ({ page }) => {
    await page.goto("/");
    const toggler = page.locator(".navbar-toggler-main");
    if (await toggler.isVisible()) await toggler.click();
    const links = await page.locator(".navbar-nav .nav-link").allInnerTexts();
    expect(links.map((text) => squash(text.replace("(current)", "")))).toEqual(["about", "publications", "projects"]);
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

  for (const path of PAGES) {
    test(`${path} has no console errors, failed internal requests, horizontal scroll, demo content or template base path`, async ({ page }) => {
      const problems = watchPage(page);
      await page.goto(path, { waitUntil: "networkidle" });
      expect(problems.consoleErrors).toEqual([]);
      expect(problems.failedRequests).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      const html = await page.content();
      expect(html).not.toMatch(/(?:href|src|content)="[^"]*\/al-folio\//);
      expect(html).not.toMatch(/alshedivat\.github\.io/);
      for (const demo of ["Einstein", "Albert", "You R. Name", "your address", "555 your office", "Lorem ipsum"]) {
        expect(html).not.toContain(demo);
      }
    });
  }

  test("has none of the other starter pages", async ({ request }) => {
    for (const gone of ["/404.html", "/blog/", "/news/", "/cv/", "/repositories/", "/teaching/", "/people/", "/books/"]) {
      expect((await request.get(gone)).status(), gone).toBe(404);
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

const PROJECT_PATH = "/projects/strings-to-sequences/";
const PROJECT_TITLE = "Acoustic Guitar Chords Recognition";
const PROJECT_GITHUB = "https://github.com/dhimitriosduka1/hlcv";
const IMAGE_DIR = "/assets/img/projects/strings-to-sequences/";
const CLOSING_LINE = "For more details, please refer to the project's GitHub repository.";

const PROJECT_SUMMARY =
  "An innovative automated system for recognizing guitar chords in acoustic guitar videos. Our approach combines YOLO [Redmon et al., 2016] for fretboard detection and DINOv2 [Oquab et al.] with a ViT backbone [Dosovitskiy et al., 2020] for chord classification. We investigate hand pose estimation using MediaPipe and extend the work of [Kristian et al., 2024] by integrating modern deep learning techniques and proposing an audio generation component.";

const PROJECT_SUMMARY_LINKS = [
  ["[Redmon et al., 2016]", "https://arxiv.org/abs/1506.02640"],
  ["[Oquab et al.]", "https://arxiv.org/abs/2304.07193"],
  ["[Dosovitskiy et al., 2020]", "https://arxiv.org/abs/2010.11929"],
  ["MediaPipe", "https://github.com/google-ai-edge/mediapipe"],
  ["[Kristian et al., 2024]", "https://ph01.tci-thaijo.org/index.php/ecticit/article/view/254624"],
];

const PROJECT_AUTHORS = [
  ["Camilo Martínez", "https://www.linkedin.com/in/camilo-martinez-m/"],
  ["Dhimitrios Duka", "https://www.linkedin.com/in/dhimitriosduka/"],
  ["Honglu Ma", "https://github.com/Kanakanajm"],
];

const PROJECT_HEADINGS = [
  ["H2", "Fretboard Detection"],
  ["H3", "Qualitative Results"],
  ["H2", "Guitar Chord Classification"],
  ["H3", "Hand Pose Estimation + Classifier"],
  ["H3", "Classifier only approach"],
];

// The write-up in reading order. The captions of figures 2 to 4 name the layout that fits the screen, so they differ by viewport.
const writeUp = (wide) => {
  const [first, second] = wide ? ["Left", "right"] : ["Top", "bottom"];
  return [
    "This system automates chord recognition from acoustic guitar videos by detecting and classifying chords based on video input. It leverages YOLO [Redmon et al., 2016] and Faster R-CNN [Ren et al., 2016] for fretboard detection, allowing the system to identify the position of the hand and fingers on the guitar neck. For chord classification, it utilizes Vision Transformers [Dosovitskiy et al., 2020] and DINOv2 [Oquab et al.], which process visual cues to distinguish between different chords. Additionally, hand pose estimation with MediaPipe was explored as a potential method to perform chord recognition. Finally, we extend the work from [Kristian et al., 2024] by exploring the potential of using state-of-the-art deep learning models and techniques with an additional proposal for an audio generation module.",
    "This system was created Dhimitrios Duka, Honglu Ma and myself, as the final project for the High-Level Computer Vision course lectured by Prof. Dr. Bernt Schiele at Saarland University during the Sommer Semester 2024.",
    "Fretboard Detection",
    "The table below shows the performance metrics of the different models tested on the finetuning dataset (Guitar necks detector), and the figure below shows the Recall vs. mAP@50 for the models tested and finetuned on the fretboard class, while showcasing the number of parameters. Naturally, the models finetuned with a Frozen Backbone (FB) performed slightly worse than the models finetuned without a Frozen Backbone; this was expected since the latter had the advantage of being able to learn the new task from scratch, using all layers, while the former only trained a smaller classifier head. Since we wanted to retain the ability to recognize the other 80 valuable classes from the COCO dataset, we chose a model from the (FB) list, the YOLOv9 (FB) model, as the best model for our task. This model obtained the highest precision and, after re-evaluating on the COCO dataset + fretboard class, it delivered better results in terms of confusion matrix and Precision-Recall curve.",
    "Table 1: Performance metrics of different models on the evaluation dataset, shown in percentages. Each column represents a specific metric: Precision, Recall, mAP50-95, and mAP50. (FB) denotes models fine-tuned with a Frozen Backbone.",
    "Model P R mAP50-95 mAP50",
    "YOLOv8 (m) 98.9% 93.0% 88.7% 98.2%",
    "YOLOv9 (c) 96.4% 96.8% 85.3% 97.8%",
    "YOLOv10 (l) 94.2% 87.0% 80.0% 94.4%",
    "Faster-RCNN-Resnet50 80.8% 82.4% 77.5% 94.0%",
    "Faster-RCNN-MobileNetv3 79.4% 81.6% 75.7% 94.9%",
    "YOLOv8 (FB) 76.7% 85.1% 53.4% 87.8%",
    "YOLOv9 (FB) 82.4% 74.7% 54.7% 87.0%",
    "YOLOv10 (FB) 81.4% 84.0% 71.2% 89.9%",
    "Faster-RCNN-Resnet50 (FB) 62.9% 66.3% 59.0% 93.4%",
    "Faster-RCNN-MobileNetv3 (FB) 71.7% 73.6% 68.3% 93.0%",
    "Figure 1: Recall vs. mAP@50 for the models tested and finetuned on the fretboard class.",
    "Qualitative Results",
    "Some qualitative results are shown below, comparing the original YOLOv9 (c) prediction with the finetuned model and the model with a frozen backbone + classifier layer.",
    `Figure 2: Comparison of YOLOv9 (c) predictions with different training approaches. From ${wide ? "left to right" : "top to bottom"}: original prediction, with full-finetuning, and with a frozen backbone + classifier layer.`,
    `Figure 3: Comparison of full-finetuning vs. frozen backbone with classifier layer. ${first}: with full-finetuning, ${second}: with frozen backbone + classifier layer.`,
    `Figure 4: Model predictions on different datasets. ${first}: prediction on an image from the COCO dataset, ${second}: from the Penn-Fudan dataset.`,
    "Guitar Chord Classification",
    "Hand Pose Estimation + Classifier",
    "To evaluate our approach against those in our reference paper by [Kristian et al., 2024], we implemented the InceptionResNetv2 model as described by the authors. After training the model using the hyperparameters provided by [Kristian et al., 2024] on our dataset, we obtained the results shown in the table below, which provided us with a baseline to compare our models against. Surprisingly, this approach performed well, achieving good accuracy during validation and testing on two datasets. However, the model struggled to generalize to the third dataset, which was created by us. This outcome was anticipated, as the samples in our dataset were out of the training distribution, and the model lacked the complexity needed to generalize to such data.",
    "Table 2: Accuracy of the Hand Pose Estimation + Classifier in the test set of different datasets. Datasets used: GC: Guitar_Chords, GCT: Guitar_Chords_Tiny, GCO: Guitar_Chords_Ours.",
    "Model GC GCT GCO",
    "InceptionResNetv2 83.56% 68.63% 15.57%",
    "SVM (C = 300) 95.27% 85.71% 18.61%",
    "Random Forest (n_estimators = 200) 93.35% 52.41% 16.16%",
    "MLP (hidden_layer_sizes = (100, 256, 100)) 89.44% 78.57% 14.39%",
    "Classifier only approach",
    "To address this limitation of the previous approach, we decided to explore more complex models, such as Vision Transformers and DINOv2, which is also available on Hugging Face. The results of our experiments are summarized below:",
    "Table 3: Accuracy of the Classifier-only approach on the test set of different datasets.",
    "Model GC GCT GCO",
    "InceptionResNetv2 83.56% 68.63% 15.57%",
    "ViT-B/16 98.96% 85.29% 96.24%",
    "ViT-B/32 93.07% 81.37% 95.83%",
    "ViT-L/16 95.84% 81.37% 12.29%",
    "ViT-L/32 77.03% 43.14% 13.43%",
    "DINOv2-S 96.24% 88.24% 98.18%",
    "DINOv2-L 96.44% 91.18% 97.92%",
    "ViT models show varying performance across different datasets. The base models perform exceptionally well, with high accuracy on all datasets. However, the larger models do not exhibit the same performance. We argue that this is happening because the available data is not sufficient to train the large version of the models effectively. Additionally, we can also observe that the patch 16 versions of the ViT models perform better than the patch 32 versions. This is likely due to the fact that the patch 16 versions have a higher resolution, which is important for accurately distinguishing between different hand positions.",
    "Moreover, both DINOv2 variants demonstrated strong and consistent performance across all datasets. The DINOv2-L model, in particular, achieved the highest accuracy on the Guitar_Chords_Ours dataset, slightly outperforming the small variant. The superior performance of DINOv2 can be attributed to its self-supervised learning approach. Unlike models pre-trained on ImageNet, which does not contain a specific class for hands, DINOv2's self-supervised learning enables it to learn more generic and transferable representations, leading to better generalization in our task. This enhanced generalization is further supported by attention visualizations of the model when applied to images from Guitar_Chords_Ours dataset, where the model correctly focuses on the hand performing the fretting, as evidenced by the following figures.",
    "Figure 5: Occlusion-based attribution [Kokhlikyan et al., 2020] for model interpretability on a 74×389 input image using a stride of 8 and a sliding window of 30×30, using Captum. Top: Untrained DINOv2 model. Bottom: Our DINOv2 model.",
    "Figure 6: Our DINOv2 model on a 360×640 input image using a stride of 20 and a sliding window of 60×60.",
    "Overall, our proposed models outperformed the InceptionResNetv2 model, achieving higher accuracy across all datasets. This demonstrates the potential of using more advanced models for chord classification tasks.",
  ];
};

const WRITE_UP_LINKS = [
  ["[Ren et al., 2016]", "https://arxiv.org/abs/1506.01497"],
  ["Dhimitrios Duka", "https://dhimitriosduka1.github.io/"],
  ["Honglu Ma", "https://github.com/Kanakanajm"],
  [
    "High-Level Computer Vision",
    "https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/teaching/courses-1/ss-2024-high-level-computer-vision",
  ],
  ["Prof. Dr. Bernt Schiele", "https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/people/bernt-schiele"],
  ["Saarland University", "https://www.uni-saarland.de/"],
  ["Guitar necks detector", "https://universe.roboflow.com/hubert-drapeau-qt6ae/guitar-necks-detector/dataset/1"],
  ["COCO dataset", "https://cocodataset.org/#home"],
  ["YOLOv8 (m)", "https://github.com/autogyro/yolo-V8"],
  ["YOLOv9 (c)", "https://github.com/WongKinYiu/yolov9"],
  ["YOLOv10 (l)", "https://github.com/THU-MIG/yolov10"],
  ["Penn-Fudan dataset", "https://www.cis.upenn.edu/~jshi/ped_html/"],
  ["InceptionResNetv2", "https://arxiv.org/abs/1602.07261"],
  ["Hugging Face", "https://huggingface.co/docs/transformers/model_doc/dinov2"],
  ["ImageNet", "https://www.image-net.org/"],
  ["[Kokhlikyan et al., 2020]", "https://arxiv.org/abs/2009.07896"],
  ["Captum", "https://captum.ai/tutorials/TorchVision_Interpret#3--Occlusion-based-attribution"],
];

const FIGURES = [
  ["recall_vs_map50.jpg", "Recall vs mAP@50"],
  ["other-image-original.jpg", "Original YOLOv9 prediction"],
  ["other-image-non-frozen.jpg", "Full-finetuning"],
  ["other-image-finetuned.jpg", "Frozen backbone + Classifier layer"],
  ["dhimitrios-non-frozen.jpg", "With full-finetuning"],
  ["dhimitrios.jpg", "Frozen backbone + Classifier layer"],
  ["output_normal_image.jpg", "Prediction on an image from the COCO dataset"],
  ["other-image-2-finetuned.jpg", "From the Penn-Fudan dataset"],
  ["occlusion_untrained.jpg", "Occlusion in untrained model"],
  ["occlusion_trained.jpg", "Occlusion in trained model"],
  ["occlusion_trained_full.jpg", "Occlusion in trained model - full picture"],
];

test.describe("projects page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects/");
  });

  test("shows the Acoustic Guitar Chords Recognition card first, with its icon, and opens its Project page", async ({ page }) => {
    const card = page.locator(".projects .card").first();
    await expect(card.locator(".card-title")).toHaveText(PROJECT_TITLE);
    await expect(card.locator(".card-text")).toHaveText("An innovative automated system for recognizing guitar chords in acoustic guitar videos.");
    const icon = card.locator("img");
    await icon.scrollIntoViewIfNeeded();
    await expect.poll(() => icon.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await icon.evaluate((img) => img.currentSrc)).toContain("/projects/strings-to-sequences/icon");
    await card.click();
    await expect(page).toHaveURL(new RegExp(`${PROJECT_PATH}$`));
    await expect(page.locator("h1.post-title")).toHaveText(PROJECT_TITLE);
  });

  test("has no placeholder text", async ({ page }) => {
    await expect(page.locator("article")).not.toContainText("cool projects");
    for (const text of await page.locator(".post-description").allInnerTexts()) expect(text.trim()).toBe("");
  });
});

test.describe("Acoustic Guitar Chords Recognition page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROJECT_PATH);
  });

  test("opens with the summary, the authors line and the GitHub link, in that order", async ({ page }) => {
    const article = page.locator("article");
    const blocks = await article.locator(":scope > *").evaluateAll((els) => els.slice(0, 3).map((el) => el.innerText.replace(/\s+/g, " ").trim()));
    expect(blocks).toEqual([PROJECT_SUMMARY, "By: Camilo Martínez, Dhimitrios Duka, Honglu Ma", "View on GitHub"]);
    const summary = article.locator(":scope > p").first();
    for (const [text, href] of PROJECT_SUMMARY_LINKS) {
      await expect(summary.getByRole("link", { name: text, exact: true })).toHaveAttribute("href", href);
    }
    await expect(page.locator("h1.post-title")).toHaveText(PROJECT_TITLE);
  });

  test("links the authors to their exact profiles and underlines the owner", async ({ page }) => {
    const authors = page.locator("article > p").nth(1);
    const actual = await authors.locator("a").evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
    expect(actual).toEqual(PROJECT_AUTHORS);
    const decoration = await authors
      .locator("a")
      .first()
      .evaluate((a) => getComputedStyle(a.querySelector("u") ?? a).textDecorationLine);
    expect(decoration).toBe("underline");
  });

  test("links to the GitHub repository", async ({ page }) => {
    await expect(page.locator("article > p").nth(2).getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", PROJECT_GITHUB);
  });

  test("shows every section heading, in order", async ({ page }) => {
    const headings = await page.locator("article h2, article h3").evaluateAll((hs) => hs.map((h) => [h.tagName, h.textContent.trim()]));
    expect(headings).toEqual(PROJECT_HEADINGS);
  });

  test("shows the write-up word for word, tables and captions included", async ({ page }, testInfo) => {
    const blocks = writeUp(testInfo.project.name === "desktop");
    const text = squash(await page.locator("article").innerText());
    for (const block of blocks) expect(text, block.slice(0, 40)).toContain(block);
    const start = text.indexOf(blocks[0]);
    const end = text.indexOf(CLOSING_LINE);
    expect(text.slice(start, end).trim()).toBe(blocks.join(" "));
  });

  test("keeps the write-up's links", async ({ page }) => {
    const links = await page
      .locator("article a")
      .evaluateAll((as) => as.map((a) => [a.textContent.replace(/\s+/g, " ").trim(), a.getAttribute("href")]));
    for (const link of WRITE_UP_LINKS) expect(links).toContainEqual(link);
  });

  test("shows its three captioned tables", async ({ page }) => {
    const tables = page.locator("article table");
    await expect(tables).toHaveCount(3);
    for (const [index, label] of ["Table 1:", "Table 2:", "Table 3:"].entries()) {
      await expect(tables.nth(index).locator("caption")).toContainText(label);
    }
  });

  test("shows its figures, loaded and captioned", async ({ page }) => {
    const images = page.locator("article figure img");
    await expect(images).toHaveCount(FIGURES.length);
    const actual = await images.evaluateAll((imgs) => imgs.map((img) => [new URL(img.src).pathname, img.alt]));
    expect(actual).toEqual(FIGURES.map(([file, alt]) => [IMAGE_DIR + file, alt]));
    await expect(page.locator("article figure figcaption")).toHaveCount(6);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
  });

  test("ends with the pointer to the GitHub repository", async ({ page }) => {
    const closing = page.locator("article > p").last();
    expect(squash(await closing.innerText())).toBe(CLOSING_LINE);
    await expect(closing.getByRole("link", { name: "GitHub repository" })).toHaveAttribute("href", PROJECT_GITHUB);
  });

  test("fits a phone-width screen, scrolls wide tables in their own container and loads without errors", async ({ page }) => {
    const problems = watchPage(page);
    await page.goto(PROJECT_PATH, { waitUntil: "networkidle" });
    expect(problems.consoleErrors).toEqual([]);
    expect(problems.failedRequests).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    for (const table of await page.locator("article table").all()) {
      expect(await table.evaluate((t) => getComputedStyle(t.parentElement).overflowX)).toBe("auto");
    }
  });

  test("keeps table text readable in dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(PROJECT_PATH);
    const colors = await page
      .locator("article table")
      .first()
      .evaluate((t) => [getComputedStyle(t).color, getComputedStyle(document.body).color]);
    expect(colors[0]).toBe(colors[1]);
  });
});

const MULTILINGUAL_PATH = "/projects/multilingual-lm-representations/";
const MULTILINGUAL_TITLE = "Multilingual Language Models Representations and Fine-Tuning";
const MULTILINGUAL_GITHUB = "https://github.com/Kanakanajm/nnti/tree/main";
const MULTILINGUAL_IMAGE_DIR = "/assets/img/projects/multilingual-lm-representations/";

const MULTILINGUAL_SUMMARY =
  "This study evaluates multilingual representation spaces using XGLM-564M and GPT-2 on the FLORES-200 dataset, focusing on English, Spanish, German, Arabic, Tamil, and Quechua. We analyze hidden representations using PCA with scikit-learn and t-SNE with openTSNE to visualize and interpret these high-dimensional spaces. We then fine-tune XGLM-564M on the Monolingual-Quechua-IIC corpus, comparing four approaches: full fine-tuning, BitFit [Zaken et al., 2022], LoRA [Hu et al., 2021], and IA³ [Liu et al., 2022]. Our analysis examines both performance improvements on Quechua and cross-lingual transfer effects.";

const MULTILINGUAL_SUMMARY_LINKS = [
  ["XGLM-564M", "https://huggingface.co/facebook/xglm-564M"],
  ["GPT-2", "https://huggingface.co/openai-community/gpt2"],
  ["FLORES-200", "https://huggingface.co/datasets/facebook/flores"],
  ["scikit-learn", "https://scikit-learn.org/dev/modules/generated/sklearn.decomposition.PCA.html"],
  ["openTSNE", "https://opentsne.readthedocs.io/en/stable/"],
  ["Monolingual-Quechua-IIC", "https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic"],
  ["[Zaken et al., 2022]", "https://arxiv.org/abs/2106.10199"],
  ["[Hu et al., 2021]", "https://arxiv.org/abs/2106.09685"],
  ["[Liu et al., 2022]", "https://arxiv.org/abs/2205.05638"],
];

const MULTILINGUAL_WRITE_UP = [
  "We evaluated the models: XGLM-564M, a multilingual autoregressive language model (with 564 million parameters) trained on a balanced corpus of a diverse set of 30 languages totaling 500 billion sub-tokens, and GPT-2, a transformers model pretrained on a very large corpus of English data in a self-supervised fashion. As evaluation dataset, we used the famous FLORES-200 dataset, available on HuggingFace, specifically on six languages: English, Spanish, German, Arabic, Tamil, and Quechua.",
  "We analyzed the multilingual embeddings (both sentence-level and token-level) from both pre-trained language models using dimensionality reduction techniques: PCA with scikit-learn and t-SNE with openTSNE.",
  "Finally, we finetuned the XGLM-564M model on a specific language: Quechua with a dataset the model hadn't seen before, Monolingual-Quechua-IIC, a monolingual corpus of Southern Quechua, consisting of nearly 450K segments [Zevallos et al., 2022]. We used different fine-tuning methods: full fine-tuning, BitFit [Zaken et al., 2022], LoRA [Hu et al., 2021], and IA³ [Liu et al., 2022] and analyzed their performance and evaluation loss on the six languages mentioned above to see how much the performance on the Quechua language improved, and whether it decreased for the rest.",
  "Experiments and Analyses",
  "We first compared the performance of the XGLM-564M model with GPT-2, in terms of Mean Language Modeling Loss.",
  "Figure 1: Loss of the XGLM-564M model compared to GPT-2, on the original languages. Both struggle with quy_Latn (Quechua).",
  "Afterwards, we visualized the hidden representations of both the XGLM-564M model using PCA and t-SNE for both sentence-level and token-level embeddings across all layers of the model. Below are visualizations from our experiments, which clearly show the progression of how the model learns to better separate the languages as we move to deeper layers:",
  "Figure 2: t-SNE Visualization of Sentences for Layer 0.",
  "Figure 3: t-SNE Visualization of Sentences for Layer 24.",
  "Figure 4: t-SNE Visualization of Tokens for Layer 0.",
  "Figure 5: t-SNE Visualization of Tokens for Layer 24.",
  "Finally, the results for the finetuning of the XGLM-564M model on the Monolingual-Quechua-IIC dataset were the following:",
  "Figure 6: Loss of the XGLM-564M model compared to its finetuned versions (FFT meaning Full Fine-Tuning).",
  "Figure 7: Performance metrics comparison of finetuning methods in training and validation.",
  "Conclusion",
  "This project provides insights into multilingual representation spaces (in sentence and token-level) for the XGLM-564M model on an underrepresented language, e.g., Quechua, and demonstrates the effectiveness of several fine-tuning techniques. While full fine-tuning offers the best performance, methods such as LoRA, BitFit and IA³ offer practical alternatives under computational constraints, such as our case.",
];

const MULTILINGUAL_WRITE_UP_LINKS = [
  ["HuggingFace", "https://huggingface.co/"],
  ["Quechua", "https://en.wikipedia.org/wiki/Quechuan_languages"],
  ["[Zevallos et al., 2022]", "https://aclanthology.org/2022.deeplo-1.1.pdf"],
];

const MULTILINGUAL_FIGURES = [
  ["xglm_vs_gpt2_mean_losses.jpg", "Loss of XGLM-564M compared to GPT-2"],
  ["sentence_xglm-564M_layer_0_t-SNE.png", "t-SNE Visualization of Sentences in Layer 24"],
  ["sentence_xglm-564M_layer_24_t-SNE.png", "PCA Visualization of Sentences in Layer 24"],
  ["token_xglm-564M_layer_0_t-SNE.png", "t-SNE Visualization of Tokens in Layer 24"],
  ["token_xglm-564M_layer_24_t-SNE.png", "PCA Visualization of Tokens in Layer 24"],
  ["xglm_vs_all_finetuning_methods.jpg", "Loss of XGLM-564M vs Fine-tuned Versions"],
  ["train_eval_metrics_finetuning.jpg", "Performance metrics comparison of finetuning methods in training and validation"],
];

test.describe("Multilingual Language Models Representations and Fine-Tuning", () => {
  test("is the second of three cards on the projects page, with its icon, and opens its Project page", async ({ page }) => {
    await page.goto("/projects/");
    const cards = page.locator(".projects .card");
    await expect(cards).toHaveCount(3);
    const card = cards.nth(1);
    await expect(card.locator(".card-title")).toHaveText(MULTILINGUAL_TITLE);
    await expect(card.locator(".card-text")).toHaveText(
      "This study evaluates multilingual representation spaces using XGLM-564M and GPT-2 on the FLORES-200 dataset, focusing on English, Spanish, German, Arabic, Tamil, and Quechua."
    );
    const icon = card.locator("img");
    await icon.scrollIntoViewIfNeeded();
    await expect.poll(() => icon.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await icon.evaluate((img) => img.currentSrc)).toContain("/projects/multilingual-lm-representations/icon");
    await card.click();
    await expect(page).toHaveURL(new RegExp(`${MULTILINGUAL_PATH}$`));
    await expect(page.locator("h1.post-title")).toHaveText(MULTILINGUAL_TITLE);
  });

  test.describe("page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(MULTILINGUAL_PATH);
    });

    test("opens with the summary, the authors line and the GitHub link, in that order", async ({ page }) => {
      const article = page.locator("article");
      const blocks = await article.locator(":scope > *").evaluateAll((els) => els.slice(0, 3).map((el) => el.innerText.replace(/\s+/g, " ").trim()));
      expect(blocks).toEqual([MULTILINGUAL_SUMMARY, "By: Camilo Martínez, Honglu Ma", "View on GitHub"]);
      const summary = article.locator(":scope > p").first();
      const links = await summary.locator("a").evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
      expect(links).toEqual(MULTILINGUAL_SUMMARY_LINKS);
    });

    test("links the authors and the GitHub repository exactly, and underlines the owner", async ({ page }) => {
      const authors = page.locator("article > p").nth(1).locator("a");
      const actual = await authors.evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
      expect(actual).toEqual([PROJECT_AUTHORS[0], PROJECT_AUTHORS[2]]);
      expect(await authors.first().evaluate((a) => getComputedStyle(a.querySelector("u") ?? a).textDecorationLine)).toBe("underline");
      await expect(page.locator("article > p").nth(2).getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", MULTILINGUAL_GITHUB);
    });

    test("shows every section heading, in order", async ({ page }) => {
      const headings = await page.locator("article h2, article h3").evaluateAll((hs) => hs.map((h) => [h.tagName, h.textContent.trim()]));
      expect(headings).toEqual([
        ["H2", "Experiments and Analyses"],
        ["H3", "Conclusion"],
      ]);
    });

    test("shows the write-up word for word, captions included, and keeps its links", async ({ page }) => {
      const text = squash(await page.locator("article").innerText());
      const start = text.indexOf(MULTILINGUAL_WRITE_UP[0]);
      const end = text.indexOf(CLOSING_LINE);
      expect(start).toBeGreaterThan(-1);
      expect(text.slice(start, end).trim()).toBe(MULTILINGUAL_WRITE_UP.join(" "));
      const links = await page
        .locator("article a")
        .evaluateAll((as) => as.map((a) => [a.textContent.replace(/\s+/g, " ").trim(), a.getAttribute("href")]));
      for (const link of MULTILINGUAL_WRITE_UP_LINKS) expect(links).toContainEqual(link);
    });

    test("shows its seven figures, loaded and captioned, with the pairs side by side only on wide screens", async ({ page }, testInfo) => {
      const images = page.locator("article figure img");
      await expect(images).toHaveCount(MULTILINGUAL_FIGURES.length);
      const actual = await images.evaluateAll((imgs) => imgs.map((img) => [new URL(img.src).pathname, img.alt]));
      expect(actual).toEqual(MULTILINGUAL_FIGURES.map(([file, alt]) => [MULTILINGUAL_IMAGE_DIR + file, alt]));
      await expect(page.locator("article figure figcaption")).toHaveCount(7);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
      const tops = await images.evaluateAll((imgs) => imgs.map((img) => Math.round(img.getBoundingClientRect().top + scrollY)));
      const wide = testInfo.project.name === "desktop";
      expect(tops[1] === tops[2]).toBe(wide);
      expect(tops[3] === tops[4]).toBe(wide);
    });

    test("ends with the pointer to the GitHub repository", async ({ page }) => {
      const closing = page.locator("article > p").last();
      expect(squash(await closing.innerText())).toBe(CLOSING_LINE);
      await expect(closing.getByRole("link", { name: "GitHub repository" })).toHaveAttribute("href", MULTILINGUAL_GITHUB);
    });
  });
});

const RAP_PATH = "/projects/rend-a-pixel/";
const RAP_TITLE = "Rend-a-Pixel Raytracer";
const RAP_GITHUB = "https://github.com/CamiloMartinezM/rend-a-pixel";

const RAP_SUMMARY =
  "A physically-based renderer implementing various ray tracing techniques. Features include image denoising, normal mapping, multiple importance sampling, support for various material, texture types and lighting conditions, and many more.";

const HALTON_LABELS = ["Independent sampling", "Normal Halton sampling", "Digit-permutated Halton sampling", "Owen-scrambled Halton sampling"];

// The comparisons in page order: the section heading above each one and the labels of its images.
const COMPARISONS = [
  ["Area Lights", ["No area lights", "Uniform sphere sampling", "Cosine-weighted sampling", "Subtended-cone sampling"]],
  ["Shading Normals", ["No normal mapping", "Normal mapping"]],
  ["A Thinlens Camera Model", ["Perspective", "Perspective with Thinlens"]],
  ["Alpha Masking", ["No alpha masking", "Alpha masking"]],
  ["Image Denoising", ["Noisy", "Denoised"]],
  ["Halton Sampler", HALTON_LABELS],
  ["Halton Sampler", HALTON_LABELS],
  ["Multiple Importance Sampling (MIS)", ["BSDF sampling", "Next Event Estimation (NEE)", "Multiple Importance Sampling (MIS)"]],
];

const RAP_HEADINGS = [
  "Area Lights",
  "Shading Normals",
  "A Thinlens Camera Model",
  "Alpha Masking",
  "Image Denoising",
  "Halton Sampler",
  "Multiple Importance Sampling (MIS)",
  "Summary of Features",
  "Copyright & Credits",
];

// The write-up in reading order, from the introduction to the last credit. Each comparison's labels are part of its text.
const RAP_WRITE_UP = [
  "Rend-a-Pixel is a raytracing rendering engine developed on top of the Lightwave Framework as the final project for the Computer Graphics course at Saarland University lectured by Prof. Dr.-Ing. Philipp Slusallek during the Winter Semester 2023/2024. Some of the implemented features are showcased below:",
  "Area Lights",
  ...COMPARISONS[0][1],
  "Shading Normals",
  ...COMPARISONS[1][1],
  "A Thinlens Camera Model",
  ...COMPARISONS[2][1],
  "Alpha Masking",
  ...COMPARISONS[3][1],
  "Image Denoising",
  ...COMPARISONS[4][1],
  "Halton Sampler",
  ...HALTON_LABELS,
  ...HALTON_LABELS,
  "Multiple Importance Sampling (MIS)",
  ...COMPARISONS[7][1],
  "Every single image rendered with 128spp. The further improvement on the noise is not because of having done 128spp (all three images were rendered with the same spp's), but because of the Subtended-Cone Sampling.",
  "Summary of Features",
  "✓ Camera Models",
  "✓ Basic Perspective Camera",
  "✓ Thinlens Camera",
  "✓ Basic Primitives",
  "✓ Sphere",
  "✓ Rectangles",
  "✓ Triangle/Generic Meshes",
  "✓ Integrators",
  "✓ Albedo",
  "✓ Normals",
  "✓ Direct Lighting",
  "✓ Path Tracing",
  "✓ BSDFs & Lighting Models:",
  "✓ Materials:",
  "✓ Diffuse",
  "✓ Conductor",
  "✓ Rough Conductor",
  "✓ Dielectric",
  "✓ Principled",
  "✓ Lambertian Emission",
  "✓ Textures:",
  "✓ Checkerboard Texture",
  "✓ Image Texture",
  "✓ Lights:",
  "✓ Environment Map",
  "✓ Area Lights",
  "✓ Uniform Sphere Sampling",
  "✓ Cosine-Weighted Sampling",
  "✓ Subtended-Cone Sampling",
  "✓ Point Light",
  "✓ Directional Light",
  "✓ Sampling:",
  "✓ BSDF Sampling",
  "✓ Next Event Estimation (NEE)",
  "✓ Multiple Importance Sampling (MIS)",
  "✓ Image denoising using Intel® Open Image Denoise",
  "✓ Acceleration Structures:",
  "✓ SAH Bounding Volume Hierarchy",
  "✓ Shading Normals",
  "✓ Alpha Masking",
  "✓ Custom Bokeh Shapes",
  "Copyright & Credits",
  "© The Lightwave Framework was written by Alexander Rath, with contributions from Ömercan Yazici and Philippe Weier. Their support was invaluable in the coding of these features. The scenes showcasing the features were provided by their team, and should be used under permission. Many textures and models were taken from Poly Haven's extensive library. Many thanks to the team behind Tev used extensively throughout this project as an EXR viewer.",
];

const RAP_WRITE_UP_LINKS = [
  ["Computer Graphics course at Saarland University", "https://graphics.cg.uni-saarland.de/"],
  ["Prof. Dr.-Ing. Philipp Slusallek", "https://graphics.cg.uni-saarland.de/people/slusallek.html"],
  ["Intel® Open Image Denoise", "https://www.openimagedenoise.org/"],
  ["Alexander Rath", "https://graphics.cg.uni-saarland.de/people/rath.html"],
  ["Ömercan Yazici", "https://graphics.cg.uni-saarland.de/people/yazici.html"],
  ["Philippe Weier", "https://graphics.cg.uni-saarland.de/people/weier.html"],
  ["Poly Haven", "https://polyhaven.com"],
  ["Tev", "https://github.com/Tom94/tev"],
];

// Where each region of a comparison should lie, then its vertical and horizontal divider lines, in fractions of its width and height,
// for a split at (x, y): [left, top, right, bottom].
const expectedLayout = (count, x, y) =>
  ({
    2: [
      [0, 0, x, 1],
      [x, 0, 1, 1],
      [x, 0, x, 1],
    ],
    3: [
      [0, 0, x, y],
      [x, 0, 1, y],
      [0, y, 1, 1],
      [x, 0, x, y],
      [0, y, 1, y],
    ],
    4: [
      [0, 0, x, y],
      [x, 0, 1, y],
      [0, y, x, 1],
      [x, y, 1, 1],
      [x, 0, x, 1],
      [0, y, 1, y],
    ],
  })[count];

// Measures a comparison's regions and divider lines relative to its own box, as fractions.
const measureLayout = (compare) =>
  compare.evaluate((el) => {
    const box = el.getBoundingClientRect();
    return [...el.querySelectorAll(".compare-region, .compare-line")].map((part) => {
      const r = part.getBoundingClientRect();
      return [(r.left - box.left) / box.width, (r.top - box.top) / box.height, (r.right - box.left) / box.width, (r.bottom - box.top) / box.height];
    });
  });

const expectLayout = async (compare, count, x, y) => {
  await expect
    .poll(async () => {
      const actual = (await measureLayout(compare)).flat();
      const wanted = expectedLayout(count, x, y).flat();
      return actual.length === wanted.length && actual.every((v, i) => Math.abs(v - wanted[i]) < 0.01);
    })
    .toBe(true);
};

test.describe("Rend-a-Pixel Raytracer", () => {
  test("is the third card on the projects page, with its icon, in the same row as the others on wide screens, and opens its Project page", async ({
    page,
  }, testInfo) => {
    await page.goto("/projects/");
    const cards = page.locator(".projects .card");
    await expect(cards).toHaveCount(3);
    const tops = await cards.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top + scrollY)));
    expect(tops[0] === tops[1] && tops[1] === tops[2]).toBe(testInfo.project.name === "desktop");
    const card = cards.nth(2);
    await expect(card.locator(".card-title")).toHaveText(RAP_TITLE);
    await expect(card.locator(".card-text")).toHaveText("A physically-based renderer implementing various ray tracing techniques.");
    expect(await card.locator(".card-title").evaluate((el) => el.children.length)).toBe(0);
    const icon = card.locator("img");
    await icon.scrollIntoViewIfNeeded();
    await expect.poll(() => icon.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await icon.evaluate((img) => img.currentSrc)).toContain("/projects/rend-a-pixel/icon");
    await card.click();
    await expect(page).toHaveURL(new RegExp(`${RAP_PATH}$`));
    await expect(page.locator("h1.post-title")).toHaveText(RAP_TITLE);
  });

  test.describe("page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(RAP_PATH);
    });

    test("opens with the summary, the authors line and the GitHub link, in that order", async ({ page }) => {
      const paragraphs = page.locator("article > p");
      const blocks = await paragraphs.evaluateAll((els) => els.slice(0, 3).map((el) => el.innerText.replace(/\s+/g, " ").trim()));
      expect(blocks).toEqual([RAP_SUMMARY, "By: Camilo Martínez", "View on GitHub"]);
      await expect(paragraphs.first().locator("a")).toHaveCount(0);
      const author = paragraphs.nth(1).locator("a");
      await expect(author).toHaveCount(1);
      await expect(author).toHaveAttribute("href", PROJECT_AUTHORS[0][1]);
      expect(await author.evaluate((a) => getComputedStyle(a.querySelector("u") ?? a).textDecorationLine)).toBe("underline");
      await expect(paragraphs.nth(2).getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", RAP_GITHUB);
    });

    test("shows every section heading, in order", async ({ page }) => {
      const headings = await page.locator("article h2, article h3").evaluateAll((hs) => hs.map((h) => [h.tagName, h.textContent.trim()]));
      expect(headings).toEqual(RAP_HEADINGS.map((heading) => ["H2", heading]));
    });

    test("shows the write-up word for word and keeps its links", async ({ page }) => {
      const text = squash(await page.locator("article").innerText());
      const start = text.indexOf(RAP_WRITE_UP[0]);
      const end = text.indexOf(CLOSING_LINE);
      expect(start).toBeGreaterThan(-1);
      expect(text.slice(start, end).trim()).toBe(RAP_WRITE_UP.join(" "));
      const links = await page
        .locator("article a")
        .evaluateAll((as) => as.map((a) => [a.textContent.replace(/\s+/g, " ").trim(), a.getAttribute("href")]));
      for (const link of RAP_WRITE_UP_LINKS) expect(links).toContainEqual(link);
    });

    test("lists the Summary of Features in two columns on wide screens and stacks them on phones", async ({ page }, testInfo) => {
      const columns = page.locator("article .column");
      await expect(columns).toHaveCount(2);
      const tops = await columns.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
      expect(tops[0] === tops[1]).toBe(testInfo.project.name === "desktop");
    });

    test("ends with the pointer to the GitHub repository", async ({ page }) => {
      const closing = page.locator("article > p").last();
      expect(squash(await closing.innerText())).toBe(CLOSING_LINE);
      await expect(closing.getByRole("link", { name: "GitHub repository" })).toHaveAttribute("href", RAP_GITHUB);
    });

    test("shows all eight comparisons with the right images and labels, each under its heading", async ({ page }) => {
      const compares = page.locator("article .compare");
      await expect(compares).toHaveCount(COMPARISONS.length);
      for (const [index, [heading, labels]] of COMPARISONS.entries()) {
        const compare = compares.nth(index);
        await compare.scrollIntoViewIfNeeded();
        const images = compare.locator("img");
        await expect(images).toHaveCount(labels.length);
        expect(await images.evaluateAll((imgs) => imgs.map((img) => img.alt))).toEqual(labels);
        await expect(compare.locator(".compare-label")).toHaveText(labels);
        for (const image of await images.all()) {
          await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
        }
        const above = await compare.evaluate((el) => {
          let node = el;
          while (node && node.tagName !== "H2") node = node.previousElementSibling;
          return node && node.textContent.trim();
        });
        expect(above, `comparison ${index + 1}`).toBe(heading);
      }
    });

    test("starts with the split at the center, follows a mouse and keeps the image aspect ratio", async ({ page }) => {
      const compares = page.locator("article .compare");
      for (const [index, [, labels]] of COMPARISONS.entries()) {
        const compare = compares.nth(index);
        // Centered, so the fixed navbar and footer never cover the pointer.
        await compare.evaluate((el) => el.scrollIntoView({ block: "center" }));
        await expectLayout(compare, labels.length, 0.5, 0.5);
        const box = await compare.boundingBox();
        const natural = await compare
          .locator("img")
          .first()
          .evaluate((img) => img.naturalWidth / img.naturalHeight);
        expect(box.width / box.height, `comparison ${index + 1}`).toBeCloseTo(natural, 1);
        // Two images split horizontally only, so the pointer's height must not matter for them.
        for (const [x, y] of [
          [0.25, 0.75],
          [0.8, 0.2],
        ]) {
          await page.mouse.move(box.x + box.width * x, box.y + box.height * y);
          await expectLayout(compare, labels.length, x, labels.length === 2 ? 0.5 : y);
        }
      }
    });

    test("follows a finger", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile", "needs a touch screen");
      // Playwright's touchscreen can only tap, so the drag is sent as raw touch events.
      const touch = await page.context().newCDPSession(page);
      const compares = page.locator("article .compare");
      for (const [index, [, labels]] of COMPARISONS.entries()) {
        const compare = compares.nth(index);
        // Centered, so the fixed navbar and footer never cover the pointer.
        await compare.evaluate((el) => el.scrollIntoView({ block: "center" }));
        const box = await compare.boundingBox();
        const at = (x, y) => [{ x: box.x + box.width * x, y: box.y + box.height * y }];
        // Two images split horizontally only, so the finger moves sideways there; a vertical move scrolls the page.
        const [x, y] = [0.3, labels.length === 2 ? 0.5 : 0.7];
        await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(0.5, 0.5) });
        // In small steps, like a real finger, so a comparison that let the page scroll would lose the drag.
        for (let step = 1; step <= 10; step++) {
          const t = step / 10;
          await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(0.5 + (x - 0.5) * t, 0.5 + (y - 0.5) * t) });
        }
        await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await expectLayout(compare, labels.length, x, y);
      }
    });

    test("fits the content column at every width and loads without errors", async ({ page }) => {
      const problems = watchPage(page);
      await page.goto(RAP_PATH, { waitUntil: "networkidle" });
      expect(problems.consoleErrors).toEqual([]);
      expect(problems.failedRequests).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      const widths = await page.locator("article .compare").evaluateAll((els) => {
        const column = document.querySelector("article").getBoundingClientRect().right;
        return els.map((el) => el.getBoundingClientRect().right <= column + 1);
      });
      expect(widths.every(Boolean)).toBe(true);
    });
  });
});
