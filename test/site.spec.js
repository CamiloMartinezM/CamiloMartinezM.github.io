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
      ["Indra", "https://www.indragroup.com/en"],
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

const CONTACT_EMAIL = "camilo [dot] martinez [at] uni-saarland [dot] de";
const CONTACT_ADDRESS = ["Saarland University", "Campus D3 3, Room 2.10", "66123 Saarbrücken, Germany"];
const DIRECTIONS = "https://www.openstreetmap.org/directions?route=%3B49.25715%2C7.04141";

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

// The map tiles come from OpenStreetMap's servers. The tests get a blank tile instead, so they neither depend on those servers nor add load to them.
const BLANK_TILE = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
test.beforeEach(async ({ page }) => {
  await page.route("https://tile.openstreetmap.org/**", (route) => route.fulfill({ contentType: "image/png", body: BLANK_TILE }));
});

// Every page of the site, for the checks that apply to all of them.
const PAGES = [
  "/",
  "/publications/",
  "/projects/",
  "/projects/strings-to-sequences/",
  "/projects/multilingual-lm-representations/",
  "/projects/rend-a-pixel/",
  "/projects/multitape-turing-machines/",
  "/teaching/",
  "/cv/",
];

// Collects what a visitor's browser would flag as broken while a page loads, and any request that would reach Google.
function watchPage(page) {
  const problems = { consoleErrors: [], failedRequests: [], googleRequests: [] };
  page.on("request", (req) => {
    if (/(^|\.)(google|googleapis|gstatic)\.com$/.test(new URL(req.url()).hostname)) problems.googleRequests.push(req.url());
  });
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

// The email written out with [at] and [dot], each half on one line, and no address anywhere in the page for scrapers.
async function expectWrittenOutEmail(page, email) {
  expect(squash(await email.innerText())).toBe(CONTACT_EMAIL);
  const separators = email.locator(".sep");
  expect(await separators.allInnerTexts()).toEqual(["[dot]", "[at]", "[dot]"]);
  for (const separator of await separators.all()) await expect(separator).toHaveCSS("color", "rgb(130, 130, 130)");
  // Each half stays on one line, so a narrow screen breaks the address only at [at].
  for (const part of await email.locator(".part").all()) {
    expect(await part.evaluate((el) => new Set([...el.getClientRects()].map((rect) => Math.round(rect.top))).size)).toBe(1);
  }
  const html = await page.content();
  expect(html).not.toContain("mailto:");
  expect(html).not.toContain("@uni-saarland");
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

  test("lists the four Selected publications after the News", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "selected publications" })).toHaveCount(1);
    const titles = page.locator(".publications ol.bibliography > li .title");
    expect((await titles.allInnerTexts()).map(squash)).toEqual(PUBLICATIONS.map((publication) => publication.title));
    const inOrder = await page.evaluate(() => {
      const y = (selector) => document.querySelector(selector).getBoundingClientRect().top;
      return y(".news") < y(".publications");
    });
    expect(inOrder).toBe(true);
  });

  test.describe("Contact section", () => {
    const map = (page) => page.locator("#contact-map");

    test("is the last section, after the Selected publications", async ({ page }) => {
      expect((await page.locator("article h2").allInnerTexts()).at(-1)).toBe("Contact");
      const inOrder = await page.evaluate(
        () => document.querySelector(".publications").getBoundingClientRect().bottom <= document.querySelector("#contact").getBoundingClientRect().top
      );
      expect(inOrder).toBe(true);
    });

    test("writes out the email, leaving no address in the page for scrapers", async ({ page }) => {
      const item = page.locator(".contact li").first();
      await expect(item.locator("i.fa-envelope")).toBeVisible();
      await expectWrittenOutEmail(page, item.locator(".email"));
      expect(await page.locator(".contact").innerHTML()).not.toContain("@");
    });

    test("shows the office address with Saarland University linked", async ({ page }) => {
      const item = page.locator(".contact li").nth(1);
      await expect(item.locator("i.fa-location-dot")).toBeVisible();
      expect((await item.innerText()).split("\n").map(squash).filter(Boolean)).toEqual(CONTACT_ADDRESS);
      await expect(item.getByRole("link", { name: "Saarland University" })).toHaveAttribute("href", "https://www.uni-saarland.de/en/home.html");
    });

    test("maps building D3 3 at zoom 17 with the pin in the middle and the OpenStreetMap credit", async ({ page }) => {
      await map(page).scrollIntoViewIfNeeded();
      await expect(map(page)).toHaveCSS("height", "350px");
      const tile = map(page).locator("img.leaflet-tile-loaded").first();
      await expect(tile).toBeVisible();
      expect(await tile.getAttribute("src")).toMatch(/^https:\/\/tile\.openstreetmap\.org\/17\/\d+\/\d+\.png$/);
      const pin = map(page).locator("img.leaflet-marker-icon");
      await expect(pin).toHaveAttribute("alt", "Campus D3 3");
      await expect.poll(() => pin.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
      // The pin's tip marks the building, so it sits at the center of the map.
      const offset = await page.evaluate(() => {
        const box = document.querySelector("#contact-map").getBoundingClientRect();
        const pin = document.querySelector("#contact-map .leaflet-marker-icon").getBoundingClientRect();
        return [pin.left + pin.width / 2 - (box.left + box.width / 2), pin.bottom - (box.top + box.height / 2)];
      });
      for (const pixels of offset) expect(Math.abs(pixels)).toBeLessThan(2);
      const credit = map(page).locator(".leaflet-control-attribution");
      await expect(credit).toContainText("© OpenStreetMap contributors");
      await expect(credit.getByRole("link", { name: "OpenStreetMap" })).toHaveAttribute("href", "https://www.openstreetmap.org/copyright");
    });

    test("opens the pin's popup with the room and directions to the building", async ({ page }) => {
      await map(page).scrollIntoViewIfNeeded();
      await map(page).locator("img.leaflet-marker-icon").click();
      const popup = map(page).locator(".leaflet-popup-content");
      await expect(popup).toBeVisible();
      expect(squash(await popup.innerText())).toBe("Campus D3 3, Room 2.10 Directions");
      const directions = popup.getByRole("link", { name: "Directions" });
      await expect(directions).toHaveAttribute("href", DIRECTIONS);
      await expect(directions).toHaveAttribute("target", "_blank");
    });

    test("scrolls the page instead of zooming the map with the mouse wheel", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop", "phones have no mouse wheel");
      await map(page).scrollIntoViewIfNeeded();
      const box = await map(page).boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 4);
      const before = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, -200);
      await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(before);
      const zooms = await map(page)
        .locator("img.leaflet-tile")
        .evaluateAll((imgs) => [...new Set(imgs.map((img) => new URL(img.src).pathname.split("/")[1]))]);
      expect(zooms).toEqual(["17"]);
    });

    test("darkens the map tiles in dark mode, but not the pin", async ({ page }) => {
      for (const [scheme, darkened] of [
        ["light", false],
        ["dark", true],
      ]) {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto("/");
        const filter = (pane) =>
          map(page)
            .locator(pane)
            .evaluate((el) => getComputedStyle(el).filter);
        expect((await filter(".leaflet-tile-pane")) !== "none", scheme).toBe(darkened);
        expect(await filter(".leaflet-marker-pane"), scheme).toBe("none");
      }
    });

    test("keeps the popup and the map's buttons readable in dark mode", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto("/");
      await map(page).scrollIntoViewIfNeeded();
      await map(page).locator("img.leaflet-marker-icon").click();
      await expect(map(page).locator(".leaflet-popup-content")).toBeVisible();
      // The popup and buttons stay white, so their text must keep Leaflet's dark colors rather than the page's light text color.
      const pageText = await page.evaluate(() => getComputedStyle(document.body).color);
      const colors = await map(page).evaluate((el) =>
        [".leaflet-popup-content", ".leaflet-popup-close-button span", ".leaflet-control-zoom-in span", ".leaflet-control-attribution span"].map(
          (selector) => {
            const node = el.querySelector(selector);
            return [selector, getComputedStyle(node).color, getComputedStyle(node.parentElement).color];
          }
        )
      );
      for (const [selector, color, parent] of colors) {
        expect(color, selector).toBe(parent);
        expect(color, selector).not.toBe(pageText);
      }
    });
  });

  test("shows the Social links in one row under the profile photo, in order", async ({ page }) => {
    await expect(page.locator(".social")).toHaveCount(1);
    const links = page.locator(".profile .social .contact-icons a");
    expect(await links.evaluateAll((as) => as.map((a) => a.getAttribute("href")))).toEqual(SOCIAL_LINKS);
    for (const link of await links.all()) await expect(link).toBeVisible();
    const layout = await page.evaluate(() => {
      const photo = document.querySelector(".profile img").getBoundingClientRect();
      const icons = [...document.querySelectorAll(".profile .contact-icons i")].map((i) => i.getBoundingClientRect());
      return {
        belowPhoto: icons.every((icon) => icon.top >= photo.bottom),
        oneRow: icons.every((icon) => Math.abs(icon.top - icons[0].top) < 1),
        fontSize: getComputedStyle(document.querySelector(".profile .contact-icons")).fontSize,
      };
    });
    expect(layout).toEqual({ belowPhoto: true, oneRow: true, fontSize: "32px" });
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
  test("navbar shows about, publications, projects, teaching, CV and the theme toggle, without search or social icons", async ({ page }) => {
    await page.goto("/");
    const toggler = page.locator(".navbar-toggler-main");
    if (await toggler.isVisible()) await toggler.click();
    const links = await page.locator(".navbar-nav .nav-link").allInnerTexts();
    expect(links.map((text) => squash(text.replace("(current)", "")))).toEqual(["about", "publications", "projects", "teaching", "CV"]);
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

  test("renders the text in Roboto from the site's own font files", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        weights: [...document.fonts]
          .filter((face) => face.family.replace(/"/g, "") === "Roboto" && face.status === "loaded")
          .map((face) => face.weight),
        files: performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter((url) => /roboto/i.test(url)),
      };
    });
    expect(fonts.weights).toEqual(expect.arrayContaining(["300", "400", "700"]));
    expect(fonts.files.length).toBeGreaterThan(0);
    for (const file of fonts.files) expect(file.startsWith(`${ORIGIN}/assets/fonts/roboto`), file).toBe(true);
  });

  for (const path of PAGES) {
    test(`${path} has no console errors, failed internal requests, requests to Google, horizontal scroll, demo content or template base path`, async ({
      page,
    }) => {
      const problems = watchPage(page);
      await page.goto(path, { waitUntil: "networkidle" });
      expect(problems.consoleErrors).toEqual([]);
      expect(problems.failedRequests).toEqual([]);
      expect(problems.googleRequests).toEqual([]);
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
    for (const gone of ["/404.html", "/blog/", "/news/", "/repositories/", "/people/", "/books/"]) {
      expect((await request.get(gone)).status(), gone).toBe(404);
    }
  });

  test("keeps repository docs and scripts out of the built site", async ({ request }) => {
    const docs = [
      "/AGENTS.md",
      "/CONTEXT.md",
      "/README.md",
      "/LICENSE",
      "/docs/adr/0001-al-folio-v1-with-local-overrides.md",
      "/docs/agents/domain.md",
      "/docs/agents/issue-tracker.md",
      "/docs/agents/triage-labels.md",
      "/scripts/multitape_turing_machines.py",
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
  test("is the second of four cards on the projects page, with its icon, and opens its Project page", async ({ page }) => {
    await page.goto("/projects/");
    const cards = page.locator(".projects .card");
    await expect(cards).toHaveCount(4);
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
  test("is the third card on the projects page, with its icon, in the same row as the first two on wide screens, and opens its Project page", async ({
    page,
  }, testInfo) => {
    await page.goto("/projects/");
    const cards = page.locator(".projects .card");
    await expect(cards).toHaveCount(4);
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

const MNTM_PATH = "/projects/multitape-turing-machines/";
const MNTM_TITLE = "Multitape Nondeterministic Turing Machines";
const MNTM_GITHUB = "https://github.com/caleb531/automata";
const MNTM_CARD = "A multitape, nondeterministic Turing machine class contributed to automata, an open-source Python library for automata theory.";

const MNTM_SUMMARY = `${MNTM_CARD} The MNTM class defines and runs Turing machines with any number of tapes, explores every branch of a nondeterministic computation breadth-first, and can replay a run on a single tape, following the textbook proof that both models are equally powerful.`;

const MNTM_HEADINGS = [
  "Why Multiple Tapes?",
  "Using the MNTM Class",
  "How It Works",
  "One Tape vs. Many",
  "Perfect Squares",
  "Approximate String Matching",
  "Copyright & Credits",
];

// The page in reading order, one entry per paragraph, heading, list, formula, figure caption or table, as its HTML reads before MathJax typesets
// the math. Code blocks are checked on their own.
const MNTM_WRITE_UP = [
  MNTM_SUMMARY,
  "By: Camilo Martínez",
  "View on GitHub",
  "MNTM is a class for automata, a Python library for finite automata, pushdown automata and Turing machines. It was developed as the final project for the Introduction to the Theory of Computation course lectured by Prof. John Richard Goodrick at Universidad de los Andes during the second semester of 2020, and then contributed to the library together with its tests and its single-tape simulation. The class is documented in the library's API reference, and the library's paper in the Journal of Open Source Software [Evans & Robson, 2023] acknowledges the contribution.",
  "Why Multiple Tapes?",
  "A Turing machine is a finite set of states, an unbounded tape divided into cells and a head that reads and writes one cell at a time. At each step, the current state and the symbol under the head decide what the machine writes, whether the head moves left or right and which state comes next. Simple as it is, the model can carry out any algorithm, which makes it the reference for what computers can and cannot do. A multitape Turing machine has several tapes, each with its own head: it reads the symbols under all its heads at once, then writes on every tape and moves every head independently (Figure 1). The input starts on the first tape and the others start blank. A nondeterministic machine may have several possible moves in the same situation, and it accepts its input if any sequence of choices reaches an accepting state.",
  "Figure 1: A two-tape machine reading 0110, in state q1, after copying 01 onto its second tape. Each triangle marks the cell under a head, and # is the blank symbol.",
  "Formally, a \\(k\\)-tape nondeterministic Turing machine is a tuple \\((Q, \\Sigma, \\Gamma, \\delta, q_0, \\#, F)\\) of states, input symbols, tape symbols, transitions, an initial state, a blank symbol and final states. Its transition function maps a state and the \\(k\\) symbols under the heads to a set of possible moves:",
  "\\[\\delta : Q \\times \\Gamma^k \\to \\mathcal{P}\\left(Q \\times (\\Gamma \\times \\{L, R, N\\})^k\\right)\\]",
  "Each move names the next state and, for every tape, the symbol to write and where its head goes: left, right or nowhere (\\(N\\), which textbooks often write as \\(S\\), for stay). A deterministic machine has at most one move for each state and symbols, and with \\(k = 1\\) the definition is the ordinary Turing machine.",
  "Neither extension makes the machine more powerful: every multitape machine has an equivalent single-tape machine, and every nondeterministic machine has an equivalent deterministic one [Sipser, 2012]. What changes is the running time. For a machine that takes \\(t(n) \\geq n\\) steps on inputs of length \\(n\\):",
  "a single-tape machine can simulate a multitape one in \\(O\\left(t(n)^2\\right)\\) steps; a deterministic machine can simulate a nondeterministic one in \\(2^{O(t(n))}\\) steps.",
  "The quadratic bound cannot be improved in general: a two-tape machine recognizes palindromes in a linear number of steps, while any single-tape machine needs on the order of \\(n^2\\) steps [Hennie, 1965]. Whether the exponential bound can be brought down to a polynomial one is, in essence, the P versus NP problem. Multiple tapes therefore make machines easier to design, at a cost that is at most quadratic, which is why they are the standard model in complexity theory; nondeterminism is the model behind NP.",
  "Using the MNTM Class",
  "An MNTM is defined like the library's other automata, from its states, input and tape symbols, transitions, initial state, blank symbol and final states, plus the number of tapes. The transitions map each state and the tuple of symbols under the heads to a list of moves, and a list with more than one move makes the machine nondeterministic. The machine below accepts palindromes over \\(\\{0, 1\\}\\): it copies the first half of its input onto its second tape, guesses where the middle is, and then reads the second half while walking back over the copy (Figure 2).",
  "Figure 2: The palindrome machine. Each label gives, for tape 1 and then tape 2, the symbol read, the symbol written when it changes (after |) and the head's move; 0,1 stands for either symbol, and the double circle is the accepting state. From q1, the machine can push the symbol it reads, guess that the second half starts there, or guess that it is the middle symbol.",
  "The library checks the definition when the machine is created, for example that every transition reads and writes one symbol per tape, and it runs the machine with the same methods as its other automata. read_input_stepwise yields the configurations in the order a breadth-first search visits them, so every branch advances in turn and an accepting branch is found whenever one exists. On 0110, the search visits 17 configurations until the branch that guesses the middle after 01 accepts, and the final configuration prints one line per tape:",
  "How It Works",
  "Tapes are immutable: every step creates new tapes instead of changing the old ones, so each branch of the search holds its own copy and any configuration can be kept, compared or printed later. A tape grows by one blank cell whenever its head moves past either end. read_input_stepwise keeps a queue of configurations: it takes the next one, yields it and adds one successor for each applicable move. A branch with no applicable move stops there, and it accepts if its state is final; the input is rejected once the queue runs empty. Searching breadth-first rather than depth-first keeps a branch that never halts from blocking the others.",
  "read_input_as_ntm runs the same machine through the single-tape construction from the proof that both models are equivalent [Sipser, 2012]. It writes all the tapes one after another on a single tape, ends each with the separator _ and marks every head with a ^ right after the cell it is on (Figure 3).",
  "Figure 3: The configuration of Figure 1, as read_input_as_ntm writes it on a single tape. Each ^ follows the cell under a head, and each _ ends a tape.",
  "Every step of the multitape machine then takes two passes over that tape. The first collects the symbol before each ^, which selects the transition. The second, shown below, rewrites each marked cell and moves its ^ one cell to the right, to the left or not at all. When a head moves onto its tape's separator, a blank cell is inserted before the separator, which is how a tape grows; a real single-tape machine pays for it by shifting everything to the right of that cell. These passes over the whole tape are what makes the single-tape machine quadratically slower.",
  "The simulation follows every branch of a nondeterministic machine, as the multitape run does, and the library's tests check that both runs end on the same tapes. On 0110, it starts from the encoded input and ends on the tapes printed above:",
  "One Tape vs. Many",
  "To measure what the second tape buys, two deterministic machines built with the library decide the same language, palindromes over \\(\\{0, 1\\}\\) (Figure 4). The single-tape DTM crosses off the first symbol, runs to the end of the input, checks that the last symbol matches, crosses it off and walks back to start again. The two-tape MNTM copies the input onto its second tape, moves the second head back to the start and compares the input read backwards with the copy read forwards.",
  "Figure 4: The single-tape machine (top) and the two-tape machine (bottom), in the notation of Figure 2.",
  "Each was run with automata-lib 9.2.0 on a palindrome of every length from 0 to 100, counting its steps from read_input_stepwise:",
  "Table 1: Size of each machine and number of steps it takes to accept a palindrome of length n. One tape (DTM) Two tapes (MNTM) States 7 6 Transitions 16 17 Steps, n = 10 66 43 Steps, n = 20 231 83 Steps, n = 50 1,326 203 Steps, n = 100 5,151 403",
  "Figure 5: Number of steps each machine takes to accept a palindrome of length n, from 0 to 100.",
  "On a palindrome of length \\(n \\geq 1\\), the single-tape machine takes exactly \\((n+1)(n+2)/2\\) steps and the two-tape machine \\(4n + 3\\), which overtakes it at length 6. At length 100 the single-tape machine takes 5,151 steps against 403, almost 13 times as many, and the gap keeps growing with \\(n\\); by Hennie's bound, no single-tape machine can close it. The two machines are almost the same size, but the two-tape one reads like a program: copy, rewind, compare. The machines, the checks and the code behind every table and figure on this page are in a script in this site's repository.",
  "Perfect Squares",
  "A larger machine decides \\(\\{0^{n^2} \\mid n \\geq 1\\}\\), the strings of 0s whose length is a perfect square. It rests on the identity",
  "\\[n^2 = 1 + 3 + 5 + \\cdots + (2n - 1)\\]",
  "so the machine builds the sums 1, 4, 9, … one odd block at a time and compares each with the input. It has three tapes: the input, which starts with a # that marks its left end, a tape of 0s that holds the current sum, and a tape of blocks that alternate between X and Y, the last of which has the current odd length. After each block, the machine compares the tape of 0s with the input (Table 2). If both have the same length, it accepts, and if the tape of 0s is longer, it rejects. Otherwise it writes the next block, two symbols longer than the last, appends as many 0s and compares again. To write a block, it marks the symbols of the last one with S, one at a time, writing a symbol of the other letter for each, then restores the marks and writes two more (Figure 6).",
  "Table 2: The tapes each time the machine compares the tape of 0s with an input of nine 0s. With ten 0s, the fourth comparison finds sixteen and rejects. Tape of 0s Tape of blocks Outcome Comparison 1 0 X shorter: next block Comparison 2 0000 XYYY shorter: next block Comparison 3 000000000 XYYYXXXXX same length: accept",
  "Figure 6: The perfect-squares machine in its four phases, in the notation of Figure 2 with tape 3 last. While it writes the next block, heads 1 and 2 stay on a 0 and a blank, so the labels in that phase show tape 3 alone. qr rejects.",
  "The machine is defined in the library's tests, and as perfect_squares it runs like any other:",
  "Approximate String Matching",
  "Multiple tapes and nondeterminism also make some practical problems short to state as machines. Approximate string matching asks whether a string \\(y\\) can be obtained from a string \\(x\\) with at most \\(k\\) edits, each inserting, deleting or substituting one symbol; the fewest edits that do it is the edit distance between the two. Spell checkers rank their corrections by it, and sequencing tools use it to align DNA reads with a reference genome. The machine below, matcher, answers the question for DNA strings and also returns the edits.",
  "Its input is \\(k\\) in unary, \\(x\\) and \\(y\\), separated by |, such as 11|ACGTACGT|CGTACGTA. It copies the budget onto tape 3 and \\(x\\) onto tape 2, so that heads 1 and 2 can then walk along \\(y\\) and \\(x\\) independently, while tape 4 records the edits. At each step, it chooses one operation: a match (M) when the two symbols agree, which moves both heads, or, while budget is left, a substitution (S), which also moves both heads, a deletion (D) of a symbol of \\(x\\), which moves head 2 alone, or an insertion (I) of a symbol of \\(y\\), which moves head 1 alone. Each edit erases one mark from tape 3, and the machine accepts when both strings are used up (Figure 7).",
  "Figure 7: The approximate matcher, in the notation of Figure 2 with its four tapes in order: the input, the copy of x, the budget and the edits. Here a and b stand for any of A, C, G and T, and the same letter on one line is the same symbol. In qa, the machine chooses a match (M), a substitution (S), a deletion (D) or an insertion (I).",
  "In the machine's definition, this loop builds the transitions of qa:",
  "On the example, the machine accepts with its edits on tape 4: delete the first A, match the next seven symbols and insert an A at the end, which is how a read shifted by one position lines up with its reference.",
  "Running it with \\(k = 0, 1, 2, \\ldots\\) until it accepts finds the edit distance itself. A branch takes at most \\(m + n\\) steps to align strings of lengths \\(m\\) and \\(n\\), so a machine that could guess for free would align them in linear time. The library has to try the branches one after another, though (Table 3). With a budget equal to the edit distance, the search visits fewer configurations than the \\((m+1)(n+1)\\) cells that the standard dynamic program fills [Wagner & Fischer, 1974], but each extra unit of budget roughly triples it, while the dynamic program does the same work for every \\(k\\). Nondeterminism makes the problem easy to state; dynamic programming makes it cheap to solve.",
  "Table 3: Configurations the search visits for ACGTACGT and CGTACGTA, whose edit distance is 2, as the budget k grows. The dynamic program fills 81 cells for every k. Result Configurations visited k = 1 rejected 32 k = 2 accepted 61 k = 3 accepted 188 k = 4 accepted 548 k = 5 accepted 1,681",
  "Copyright & Credits",
  "© automata was written by Caleb Evans, who maintains it with Eliot W. Robson, and is released under the MIT license. The library is described in [Evans & Robson, 2023] in the Journal of Open Source Software.",
  CLOSING_LINE,
];

const MNTM_LINKS = [
  ["automata", MNTM_GITHUB],
  ["Introduction to the Theory of Computation", "https://uniandes.smartcatalogiq.com/2020/catalogo/cursos/mate/2000/mate-2181"],
  ["Prof. John Richard Goodrick", "https://matematicas.uniandes.edu.co/en/professors/john-richard-goodrick"],
  ["Universidad de los Andes", "https://www.uniandes.edu.co/en"],
  ["API reference", "https://caleb531.github.io/automata/api/tm/class-mntm/"],
  ["[Evans & Robson, 2023]", "https://doi.org/10.21105/joss.05759"],
  ["[Sipser, 2012]", "https://math.mit.edu/~sipser/book.html"],
  ["[Hennie, 1965]", "https://doi.org/10.1016/S0019-9958%2865%2990399-2"],
  ["shown below", "https://github.com/caleb531/automata/blob/v9.2.0/automata/tm/mntm.py#L397-L431"],
  ["automata-lib 9.2.0", "https://github.com/caleb531/automata/releases/tag/v9.2.0"],
  ["a script", "https://github.com/CamiloMartinezM/CamiloMartinezM.github.io/blob/main/scripts/multitape_turing_machines.py"],
  ["tests", "https://github.com/caleb531/automata/blob/v9.2.0/tests/test_tm.py#L104-L230"],
  ["[Wagner & Fischer, 1974]", "https://doi.org/10.1145/321796.321811"],
  ["Caleb Evans", "https://github.com/caleb531"],
  ["Eliot W. Robson", "https://github.com/eliotwrobson"],
];

// The first line of each Python block, in page order, and the text blocks that show their output.
const MNTM_CODE = [
  "from automata.tm.mntm import MNTM",
  'palindromes.accepts_input("0110")  # True',
  "for move in moves:",
  'run = [config for (config,) in palindromes.read_input_as_ntm("0110")]',
  "def steps(machine, word):",
  'perfect_squares.accepts_input("#" + "0" * 9)  # True: 9 = 1 + 3 + 5',
  'for budget in "1$":  # head 3 reads an unused edit, or the $ once none is left',
  '(config,) = matcher.read_input("11|ACGTACGT|CGTACGTA")',
];
const MNTM_OUTPUTS = [
  "q3:\n> Tape 1: 0110#\n              ^\n> Tape 2: $01#\n          ^",
  "q0 0^110_#^_\nq3 0110#^_$^01#_",
  "qf:\n> Tape 1: 11|ACGTACGT|CGTACGTA#\n                              ^\n> Tape 2: $ACGTACGT#\n                   ^\n> Tape 3: $###\n          ^\n> Tape 4: DMMMMMMMI#\n                   ^",
];

// The accessible name of each image in each figure, in page order. The state diagrams sit in containers that scroll on narrow screens.
const MNTM_FIGURES = [
  ["A two-tape machine"],
  ["The palindrome machine"],
  ["The same two tapes on one tape"],
  ["The single-tape palindrome machine", "The two-tape palindrome machine"],
  ["Steps to accept a palindrome of length n"],
  ["The perfect-squares machine"],
  ["The approximate matcher"],
];

test.describe(MNTM_TITLE, () => {
  test("is the fourth card on the projects page, with its icon, and opens its Project page", async ({ page }) => {
    await page.goto("/projects/");
    const cards = page.locator(".projects .card");
    await expect(cards).toHaveCount(4);
    const card = cards.nth(3);
    await expect(card.locator(".card-title")).toHaveText(MNTM_TITLE);
    await expect(card.locator(".card-text")).toHaveText(MNTM_CARD);
    const icon = card.locator("img");
    await icon.scrollIntoViewIfNeeded();
    await expect.poll(() => icon.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await icon.evaluate((img) => img.currentSrc)).toContain("/projects/multitape-turing-machines/icon");
    await card.click();
    await expect(page).toHaveURL(new RegExp(`${MNTM_PATH}$`));
    await expect(page.locator("h1.post-title")).toHaveText(MNTM_TITLE);
  });

  test.describe("page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(MNTM_PATH);
    });

    test("opens with the summary, the authors line and the GitHub link, in that order", async ({ page }) => {
      const paragraphs = page.locator("article > p");
      const blocks = await paragraphs.evaluateAll((els) => els.slice(0, 3).map((el) => el.innerText.replace(/\s+/g, " ").trim()));
      expect(blocks).toEqual([MNTM_SUMMARY, "By: Camilo Martínez", "View on GitHub"]);
      const summaryLinks = await paragraphs
        .first()
        .locator("a")
        .evaluateAll((as) => as.map((a) => [a.textContent, a.getAttribute("href")]));
      expect(summaryLinks).toEqual([["automata", MNTM_GITHUB]]);
      const author = paragraphs.nth(1).locator("a");
      await expect(author).toHaveCount(1);
      await expect(author).toHaveAttribute("href", PROJECT_AUTHORS[0][1]);
      expect(await author.evaluate((a) => getComputedStyle(a.querySelector("u") ?? a).textDecorationLine)).toBe("underline");
      await expect(paragraphs.nth(2).getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", MNTM_GITHUB);
    });

    test("shows every section heading, in order", async ({ page }) => {
      const headings = await page.locator("article h2, article h3").evaluateAll((hs) => hs.map((h) => [h.tagName, h.textContent.trim()]));
      expect(headings).toEqual(MNTM_HEADINGS.map((heading) => ["H2", heading]));
    });

    test("keeps the write-up's links, and links every mention of automata to its repository", async ({ page }) => {
      const links = await page
        .locator("article a")
        .evaluateAll((as) => as.map((a) => [a.textContent.replace(/\s+/g, " ").trim(), a.getAttribute("href")]));
      for (const link of MNTM_LINKS) expect(links).toContainEqual(link);
      // The library's name, as a word of its own, is a link wherever it appears in the text.
      const unlinked = await page.locator("article").evaluate((article) => {
        const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
        const found = [];
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (node.parentElement.closest("a, pre, figure, mjx-container")) continue;
          for (const match of node.textContent.matchAll(/\bautomata\b(?! theory)/g)) {
            const before = node.textContent.slice(0, match.index);
            if (!/(finite|pushdown|other) $/.test(before)) found.push(node.textContent.trim().slice(0, 60));
          }
        }
        return found;
      });
      expect(unlinked).toEqual([]);
      const named = await page.locator("article a", { hasText: /^automata$/ }).evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      expect(named).toEqual([MNTM_GITHUB, MNTM_GITHUB, MNTM_GITHUB]);
    });

    test("shows each code block and the exact output of those that print", async ({ page }) => {
      const python = await page.locator("article .language-python pre").evaluateAll((pres) => pres.map((pre) => pre.textContent.split("\n")[0]));
      expect(python).toEqual(MNTM_CODE);
      const outputs = await page.locator("article .language-text pre").evaluateAll((pres) => pres.map((pre) => pre.textContent.replace(/\n$/, "")));
      expect(outputs).toEqual(MNTM_OUTPUTS);
    });

    test("typesets its 37 formulas with MathJax, two of them on their own line", async ({ page }) => {
      await expect(page.locator("article mjx-container")).toHaveCount(37);
      await expect(page.locator('article mjx-container[display="true"]')).toHaveCount(2);
      // The $ on the figures' tapes is not math.
      await expect(page.locator("article svg mjx-container")).toHaveCount(0);
    });

    test("shows its seven figures as captioned, labelled inline SVG within the content column", async ({ page }) => {
      const figures = page.locator("article figure");
      await expect(figures).toHaveCount(MNTM_FIGURES.length);
      for (const [index, names] of MNTM_FIGURES.entries()) {
        const figure = figures.nth(index);
        await expect(figure.locator("svg")).toHaveCount(names.length);
        for (const name of names) await expect(figure.getByRole("img", { name })).toHaveCount(1);
        await expect(figure.locator("figcaption")).toContainText(`Figure ${index + 1}:`);
        // A state diagram may be wider than a phone screen, but then its own container scrolls, not the page.
        const boxes = await figure.locator(":scope > svg, :scope > .tm-scroll").evaluateAll((els) => {
          const column = document.querySelector("article").getBoundingClientRect().right;
          return els.map((el) => {
            const box = el.getBoundingClientRect();
            const scrolls = el.scrollWidth <= el.clientWidth + 1 || getComputedStyle(el).overflowX === "auto";
            return box.width > 0 && box.right <= column + 1 && scrolls;
          });
        });
        expect(boxes, names[0]).toEqual(names.map(() => true));
      }
    });

    test("labels the state diagrams in the course's notation, from the machines themselves", async ({ page }) => {
      const labels = (name) =>
        page
          .getByRole("img", { name })
          .locator(".edge text")
          .evaluateAll((texts) => texts.map((t) => t.textContent));
      expect(await labels("The palindrome machine")).toEqual(
        expect.arrayContaining(["0,1 → N ; # → $|R", "0 → R ; # → 0|R", "1 → R ; # → 1|R", "0,1 → N ; # → L", "0,1 → R ; # → L", "# → N ; $ → N"])
      );
      expect(await labels("The single-tape palindrome machine")).toEqual(
        expect.arrayContaining(["0 → #|R", "1 → #|R", "0,1 → R", "0,1 → L", "# → R"])
      );
      expect(await labels("The perfect-squares machine")).toEqual(expect.arrayContaining(["0 → R ; 0 → R ; # → N", "X → S|R", "# → Y|L"]));
      expect(await labels("The approximate matcher")).toEqual(
        expect.arrayContaining([
          "a → R ; a → R ; 1,$ → N ; # → M|R",
          "b → R ; a → R ; 1 → #|L ; # → S|R (a ≠ b)",
          "b,# → N ; a → R ; 1 → #|L ; # → D|R",
        ])
      );
      const accepting = page.getByRole("img", { name: "The perfect-squares machine" }).locator(".node", { hasText: "qf" }).locator("ellipse");
      await expect(accepting).toHaveCount(2);
    });

    test("draws its figures in the theme's colors, in light and dark mode", async ({ page }) => {
      const expected = {
        light: { text: "rgb(0, 0, 0)", accent: "rgb(0, 118, 223)", oneTape: "rgb(235, 104, 52)" },
        dark: { text: "rgb(232, 232, 232)", accent: "rgb(38, 152, 186)", oneTape: "rgb(217, 89, 38)" },
      };
      for (const [scheme, colors] of Object.entries(expected)) {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(MNTM_PATH);
        const actual = await page.evaluate(() => {
          const style = (selector) => getComputedStyle(document.querySelector(`article ${selector}`));
          return {
            text: style(".tm-fig .tm-state").fill,
            head: style(".tm-fig .tm-head").fill,
            twoTapes: style(".tm-fig .tm-line.tm-two").stroke,
            oneTape: style(".tm-fig .tm-line.tm-one").stroke,
            label: style(".tm-graph .edge text").fill,
            state: style(".tm-graph .node ellipse").stroke,
            edge: style(".tm-graph .edge path").stroke,
            arrow: style(".tm-graph .edge polygon").fill,
          };
        });
        expect(actual, scheme).toEqual({
          text: colors.text,
          head: colors.accent,
          twoTapes: colors.accent,
          oneTape: colors.oneTape,
          label: colors.text,
          state: colors.text,
          edge: colors.accent,
          arrow: colors.accent,
        });
      }
    });

    test("ends with the pointer to the GitHub repository", async ({ page }) => {
      const closing = page.locator("article > p").last();
      expect(squash(await closing.innerText())).toBe(CLOSING_LINE);
      await expect(closing.getByRole("link", { name: "GitHub repository" })).toHaveAttribute("href", MNTM_GITHUB);
    });

    test("fits a phone-width screen, scrolling wide code, tables and diagrams in their own containers", async ({ page }) => {
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      for (const box of await page.locator("article pre, article .table-responsive, article .tm-scroll").all()) {
        expect(await box.evaluate((el) => getComputedStyle(el).overflowX)).toMatch(/auto|scroll/);
      }
    });
  });

  test.describe("page source", () => {
    // Without JavaScript, MathJax leaves the formulas as the TeX that the page's HTML holds.
    test.use({ javaScriptEnabled: false });

    test("shows the write-up word for word, captions and table included", async ({ page }) => {
      await page.goto(MNTM_PATH);
      const blocks = await page.locator("article").evaluate((article) =>
        [...article.childNodes]
          .filter((node) => !(node instanceof Element && node.matches(".highlighter-rouge")))
          .map((node) =>
            node instanceof Element ? (node.matches("figure") ? node.querySelector("figcaption").innerText : node.innerText) : node.textContent
          )
          .map((text) => text.replace(/\s+/g, " ").trim())
          .filter(Boolean)
      );
      expect(blocks).toEqual(MNTM_WRITE_UP);
    });
  });
});

const TEACHING = [
  {
    text: "Saarland University, Germany",
    links: [["Saarland University", "https://www.uni-saarland.de/en/home.html"]],
    courses: [
      {
        text: "Elements of Machine Learning, Winter semester 2024/25, Tutor",
        bold: ["Elements of Machine Learning"],
        links: [["Elements of Machine Learning", "https://cms.sic.saarland/eml24/"]],
      },
      {
        text: "Digital Signal Processing, Summer semester 2024, Teaching Assistant",
        bold: ["Digital Signal Processing"],
        links: [["Digital Signal Processing", "https://www.lsv.uni-saarland.de/digital-signal-processing-2024/"]],
      },
    ],
  },
  {
    text: "Universidad de los Andes, Colombia",
    links: [["Universidad de los Andes", "https://www.uniandes.edu.co/en"]],
    courses: [
      {
        text: "Introduction to Programming (Python), Semesters 2020-1 and 2020-2, Tutor",
        bold: ["Introduction to Programming (Python)"],
        links: [],
      },
    ],
  },
];

test.describe("teaching page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/teaching/");
  });

  test("lists the courses under their universities, newest first, with bold names and exact links", async ({ page }) => {
    const groups = await page.locator("article h2").evaluateAll((headings) => {
      const text = (el) => el.textContent.replace(/\s+/g, " ").trim();
      const links = (el) => [...el.querySelectorAll("a")].map((a) => [text(a), a.getAttribute("href")]);
      return headings.map((h) => ({
        text: text(h),
        links: links(h),
        courses: [...h.nextElementSibling.querySelectorAll(":scope > li")].map((li) => ({
          text: text(li),
          bold: [...li.querySelectorAll("strong")].map(text),
          links: links(li),
        })),
      }));
    });
    expect(groups).toEqual(TEACHING);
  });

  test("has no intro text", async ({ page }) => {
    for (const text of await page.locator(".post-description").allInnerTexts()) expect(text.trim()).toBe("");
    expect(await page.locator("article > *").evaluateAll((els) => els.map((el) => el.tagName))).toEqual(["H2", "UL", "H2", "UL"]);
  });
});

const CV_HEADINGS = ["Personal Details", "Professional Experience", "Stays Abroad", "Education", "Certificates", "Languages", "Interests"];

const CV_PERSONAL_DETAILS = [
  ["Name", OWNER],
  ["Nationality", "Colombian"],
  ["Email", CONTACT_EMAIL],
  ["LinkedIn", "camilo-martinez-m"],
  ["GitHub", "CamiloMartinezM"],
];

const SAARLAND = ["Saarland University", "https://www.uni-saarland.de/en/home.html"];
const UNIANDES = ["Universidad de los Andes", "https://www.uniandes.edu.co/en"];
const INDRA = ["Indra Sistemas", "https://www.indragroup.com/en"];

// Each entry as the CV page shows it: its date badge, its place, the lines beside them, its bullets and every link in it.
const CV_ENTRIES = {
  "Professional Experience": [
    {
      dates: "2026.08 - Present",
      place: "Saarbrücken, Germany",
      lines: ["Research Assistant", "Data-Driven Design of Materials (d3M), Saarland University"],
      bullets: [
        "Development of reliable Machine Learning methods for microstructure analysis in low-data regimes, working with small, heterogeneous datasets while reducing manual annotation effort.",
        "Research on active and semi-supervised learning, synthetic data generation, self-supervised pretraining of domain-specific encoders, and adaptation of foundation models such as SAM.",
        "Collaboration with university and industry partners in the CircularSaar consortium on materials data science projects, from exploratory data analysis to training and evaluating models.",
      ],
      links: [["Data-Driven Design of Materials (d3M)", "https://martinmueller1104.github.io/d3m.github.io/"], SAARLAND],
    },
    {
      dates: "2025.01 - 2026.07",
      place: "Saarbrücken, Germany",
      lines: ["Research Assistant", "Material Engineering Center Saarland"],
      bullets: [
        "Development of Machine Learning models for analysis and characterization tasks in Materials Science and Engineering (MES), leveraging both traditional ML and modern DL approaches.",
        "Research and application of state-of-the-art architectures, including Visual Transformers (ViTs), semi-supervised, and self-supervised learning methods, optimized for low-data regimes for enhancing microstructure classification and segmentation.",
      ],
      links: [["Material Engineering Center Saarland", "https://www.mec-s.de/en/welcome/"]],
    },
    {
      dates: "2024.04 - 2025.03",
      place: "Saarbrücken, Germany",
      lines: ["Teaching Assistant", "Saarland University"],
      bullets: [
        "Organization of weekly face-to-face tutorials for the courses “Elements of Machine Learning” (approx. 40 students) and “Digital Signal Processing” (approx. 30 students) in order to deepen the concepts covered in the lectures and to clarify questions from students.",
      ],
      links: [SAARLAND],
    },
    {
      dates: "2024.03 - 2024.12",
      place: "Saarbrücken, Germany",
      lines: ["Research Assistant", "Deutsches Forschungszentrum für Künstliche Intelligenz (DFKI)"],
      bullets: [
        "(Pre-)processing of EEG signals and eye tracking data, for use in Machine Learning models, using Python.",
        "Training of Machine Learning models (particularly, sequence-to-label routines with LSTMs and Transformers, using TensorFlow and PyTorch's implementations), focused on predicting target- and non-target eye fixations.",
      ],
      links: [["Deutsches Forschungszentrum für Künstliche Intelligenz (DFKI)", "https://www.dfki.de/en/web"]],
    },
    {
      dates: "2021.07 - 2023.09",
      place: "Barranquilla, Colombia",
      lines: ["Functional Consultant", "Indra Sistemas"],
      bullets: [
        "Led a team expanding the capabilities of utility companies AFINIA (Colombia), Agua de Puebla (Mexico) and Sedapal (Lima, Peru), supporting their Industry 4.0 transition with Business Intelligence.",
        "Gathered requirements from clients and stakeholders, remotely and on site, and relayed them to technical teams, using SharePoint, Teams, and Agile methods with Jira and Confluence.",
        "Designed, created, and analyzed PowerBI and Excel dashboards/reports for improved operational analysis and KPI assessment.",
      ],
      links: [
        INDRA,
        ["AFINIA", "https://afinia.com.co/"],
        ["Agua de Puebla", "https://www.aguapuebla.mx/"],
        ["Sedapal", "https://www.sedapal.com.pe/"],
      ],
    },
    {
      dates: "2021.03 - 2021.04",
      place: "Remote, Colombia",
      lines: ["Research Assistant in Data Analysis with MATLAB", "Universidad de los Andes"],
      bullets: [
        "Carried out the optimization and execution of pre-written MATLAB code, adapted it to different portions of the A.C. Nielsen Kilts database and reduced the total execution time by 99,8% vectorizing operations.",
      ],
      links: [UNIANDES],
    },
    {
      dates: "2020.01 - 2020.12",
      place: "Bogotá D.C., Colombia",
      lines: ["Teaching Assistant", "Universidad de los Andes"],
      bullets: [],
      links: [UNIANDES],
    },
  ],
  "Stays Abroad": [
    {
      dates: "2023.03 - 2023.08",
      place: "Lima, Peru",
      lines: ["Requirements analysis and blueprint sign-off with Sedapal", "Indra Sistemas", "4 stays, 9 weeks in total"],
      bullets: [],
      links: [["Sedapal", "https://www.sedapal.com.pe/"], INDRA],
    },
    {
      dates: "2022.07 - 2022.09",
      place: "Puebla, Mexico",
      lines: ["Training of Agua de Puebla staff in Onesait Utilities Customers", "Indra Sistemas", "2 stays, 3 weeks in total"],
      bullets: [],
      links: [["Agua de Puebla", "https://www.aguapuebla.mx/"], INDRA],
    },
  ],
  Education: [
    {
      dates: "2023.10 - 2026.10",
      place: "Saarbrücken, Germany",
      lines: ["M.Sc. Data Science and Artificial Intelligence", "Saarland University"],
      bullets: [
        "Master's thesis: Brain2Face: Reconstructing Dynamic 3D Facial Expressions from EEG Signals, written at the Max Planck Institute for Informatics",
      ],
      links: [
        [
          "M.Sc. Data Science and Artificial Intelligence",
          "https://saarland-informatics-campus.de/en/studium-studies/data-science-and-artificial-intelligence-master/",
        ],
        SAARLAND,
        ["Max Planck Institute for Informatics", "https://www.mpi-inf.mpg.de/home"],
      ],
    },
    {
      dates: "2017.01 - 2021.04",
      place: "Bogotá D.C., Colombia",
      lines: ["B.Sc. Mechanical Engineering, Minor in Computational Mathematics", "Universidad de los Andes"],
      bullets: [
        "Bachelor's thesis: Application of Computer Vision in the Analysis of Microstructures and Obtaining Structure-Property Relationships",
        "GPA: 4,41/5,00 (equivalent to 1,8 in the German grading system)",
        "Awarded the national “Ser Pilo Paga 3” scholarship by the Colombian government for academic excellence, funding 100% of my tuition and living expenses throughout my bachelor’s studies.",
      ],
      links: [
        UNIANDES,
        [
          "Application of Computer Vision in the Analysis of Microstructures and Obtaining Structure-Property Relationships",
          "/publications/#Martinez_2021",
        ],
      ],
    },
  ],
};

const CV_CERTIFICATES = ["DeepLearning.AI Deep Learning (2022)", "DeepLearning.AI TensorFlow Developer (2020)", "Django for Everybody (2023)"];

// Each language and interest: its name, then its keywords.
const CV_GROUPS = {
  Languages: [
    ["Spanish", "Native"],
    ["English", "Full Professional Proficiency", "TOEFL C1 (2023)"],
    ["German", "Professional Working Proficiency", "Goethe Zertifikat B2 (2016)"],
    ["French", "Limited Working Proficiency", "DELF B2 (2016)"],
  ],
  Interests: [
    [
      "Topics",
      "Computer Vision for Materials Microstructure Analysis",
      "Data-Frugal Learning",
      "Vision and Language Foundation Models",
      "Multimodal Learning with EEG",
    ],
    ["Hobbies", "Running/biking", "Dancing (salsa & bachata)", "Reading", "Coding"],
  ],
};

test.describe("CV page", () => {
  const section = (page, heading) => page.locator(".cv .card", { has: page.locator("h3", { hasText: heading }) });

  test.beforeEach(async ({ page }) => {
    await page.goto("/cv/");
  });

  test("shows its CV heading and its sections in order, each listed in the sidebar's table of contents", async ({ page }) => {
    await expect(page.locator("h1.post-title")).toHaveText("CV");
    expect((await page.locator(".cv h3").allInnerTexts()).map(squash)).toEqual(CV_HEADINGS);
    await expect(page.locator("#toc-sidebar a")).toHaveText(CV_HEADINGS);
  });

  test("shows the Personal details with the profile links, each label on one line and clear of its value", async ({ page }) => {
    const details = section(page, "Personal Details");
    const rows = await details
      .locator("tr")
      .evaluateAll((trs) => trs.map((tr) => [...tr.cells].map((td) => td.innerText.replace(/\s+/g, " ").trim())));
    expect(rows).toEqual(CV_PERSONAL_DETAILS);
    await expect(details.getByRole("link", { name: "camilo-martinez-m" })).toHaveAttribute("href", SOCIAL_LINKS[0]);
    await expect(details.getByRole("link", { name: "CamiloMartinezM" })).toHaveAttribute("href", SOCIAL_LINKS[2]);
    for (const label of await details.locator("td:first-child").all()) {
      await expect(label).toHaveCSS("padding-right", "16px");
      await expect(label).toHaveCSS("white-space", "nowrap");
    }
  });

  test("writes out the email, leaving no address in the page for scrapers", async ({ page }) => {
    await expectWrittenOutEmail(page, section(page, "Personal Details").locator(".email"));
  });

  test("leaves out the phone number, the Portfolio link and the Publications", async ({ page }) => {
    const text = await page.locator("article").innerText();
    expect(text).not.toMatch(/phone|\+49|portfolio/i);
    for (const publication of PUBLICATIONS.filter((p) => p.id !== "Martinez_2021")) expect(text).not.toContain(publication.title);
  });

  for (const [heading, entries] of Object.entries(CV_ENTRIES)) {
    test(`lists the ${heading} entries newest first, word for word, with their links`, async ({ page }) => {
      const shown = await section(page, heading)
        .locator(".list-group-item")
        .evaluateAll((items) => {
          const text = (el) => el.textContent.replace(/\s+/g, " ").trim();
          return items.map((item) => ({
            dates: text(item.querySelector(".badge")),
            place: text(item.querySelector(".location")),
            lines: [...item.querySelectorAll("h6")].map(text),
            bullets: [...item.querySelectorAll(".items .item")].map(text),
            links: [...item.querySelectorAll("a")].map((a) => [text(a), a.getAttribute("href")]),
          }));
        });
      expect(shown).toEqual(entries);
    });
  }

  test("lists the Certificates word for word", async ({ page }) => {
    expect((await section(page, "Certificates").locator(".list-group-item").allInnerTexts()).map(squash)).toEqual(CV_CERTIFICATES);
  });

  for (const [heading, groups] of Object.entries(CV_GROUPS)) {
    test(`shows the ${heading} as names in the accent color with their keywords small and bold below, two to a row on wide screens`, async ({
      page,
    }) => {
      const card = section(page, heading);
      const shown = await card
        .locator(".list-group")
        .evaluateAll((divs) =>
          divs.map((div) => [...div.querySelectorAll(".list-group-category, .list-group-name b")].map((el) => el.textContent.trim()))
        );
      expect(shown).toEqual(groups);
      const accent = await section(page, "Personal Details")
        .getByRole("link", { name: "CamiloMartinezM" })
        .evaluate((a) => getComputedStyle(a).color);
      for (const name of await card.locator(".list-group-category").all()) await expect(name).toHaveCSS("color", accent);
      for (const keyword of await card.locator(".list-group-name").all()) {
        await expect(keyword).toHaveCSS("font-size", "12.8px");
        await expect(keyword.locator("b")).toHaveCSS("font-weight", "700");
      }
      const tops = await card.locator(".list-group").evaluateAll((divs) => divs.map((div) => Math.round(div.getBoundingClientRect().top)));
      expect(tops[0] === tops[1]).toBe(page.viewportSize().width >= 768);
    });
  }

  test("shows its entries without list bullets, divided by lines, with no line above the date badges", async ({ page }) => {
    const lists = await page.locator(".cv ul.list-group").evaluateAll((uls) =>
      uls.map((ul) => ({
        bullets: getComputedStyle(ul).listStyleType,
        dividers: [...ul.children].map((li) => getComputedStyle(li).borderBottomStyle),
      }))
    );
    expect(lists).toHaveLength(4);
    for (const list of lists) {
      expect(list.bullets).toBe("none");
      expect(list.dividers).toEqual([...Array(list.dividers.length - 1).fill("solid"), "none"]);
    }
    const lines = await page.locator(".cv .date-column td").evaluateAll((tds) => tds.map((td) => getComputedStyle(td).borderTopStyle));
    expect(new Set(lines)).toEqual(new Set(["none"]));
  });

  test("shows the table of contents without a scrollbar", async ({ page }) => {
    await expect(page.locator("#toc-sidebar")).toHaveCSS("overflow-y", "visible");
  });

  test("has no intro text, PDF download or photo", async ({ page }) => {
    await expect(page.locator(".post-description")).toHaveCount(0);
    await expect(page.locator(".fa-file-pdf")).toHaveCount(0);
    await expect(page.locator("article img")).toHaveCount(0);
  });
});
