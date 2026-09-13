import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";

async function render(pathname = "/") {
  const file = new URL(`../dist/client${pathname === "/" ? "" : pathname}/index.html`, import.meta.url);
  try {
    return new Response(await readFile(file, "utf8"), {
      headers: { "content-type": "text/html" },
    });
  } catch (error) {
    if (error.code === "ENOENT") return new Response("Not found", { status: 404 });
    throw error;
  }
}

test("server-renders the portfolio and primary links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Victor Sorgi Pedroso \| Robotics Portfolio/);
  assert.doesNotMatch(html, /State estimation and safety-critical control for autonomous systems/);
  assert.match(html, /background in physics and astronomy from Emory/);
  assert.doesNotMatch(html, /I build filters and controllers/);
  assert.match(html, /Control Experiments in Python and AirSim/);
  assert.match(html, /Autonomous Mobile Robot/);
  assert.match(html, /Ballistic Reentry Filtering/);
  assert.match(html, /TurtleBot3 Autonomy/);
  assert.match(html, /PDE-Based Optical Flow/);
  assert.match(html, /Experience/);
  assert.match(html, /href="\/VictorSorgiPedroso_Resume\.pdf"/);
  assert.match(html, /Download resume/);
  assert.match(html, /href="https:\/\/github\.com\/victor-p28"/);
  assert.doesNotMatch(html, /résumé/i);
  assert.doesNotMatch(html, /github\.com\/V3c70r/);
});

test("uses the simple layout with no theme toggle or ornate hero panel", async () => {
  const html = await (await render()).text();

  assert.doesNotMatch(html, /theme-toggle/);
  assert.doesNotMatch(html, /Use dark theme/);
  assert.doesNotMatch(html, /verification-panel/);
  assert.doesNotMatch(html, /control-agent/);
  assert.doesNotMatch(html, /data-theme/);
});

test("states availability and graduation timing above the fold", async () => {
  const html = await (await render()).text();

  assert.match(html, /Graduating May 2027/);
  assert.match(html, /Looking for full-time roles in autonomous vehicles and robotics starting mid-2027/);
  assert.doesNotMatch(html, /Currently an Autonomous Vehicles Intern/);
  assert.match(html, /May–August 2026/);
  assert.match(html, /open to relocation/);
});

test("links each project to its own repository", async () => {
  const html = await (await render()).text();

  assert.match(html, /href="https:\/\/github\.com\/victor-p28\/Autonomous-Mobile-Robot"/);
  assert.match(html, /href="https:\/\/github\.com\/victor-p28\/Intro-To-Robotics-Research"/);
  assert.match(html, /href="https:\/\/github\.com\/victor-p28\/Ballistic-Reentry-Filter-Comparison"/);
});

test("orders selected work ahead of background, with the thesis demoted", async () => {
  const html = await (await render()).text();

  assert.ok(html.indexOf('id="work"') < html.indexOf('id="background"'));
  assert.match(html, /href="\/work\/galaxy-effective-radius-thesis"/);
  assert.doesNotMatch(html, /href="\/work\/autonomous-vehicle-curriculum"/);
  assert.doesNotMatch(html, /Currently building/);

  const workSection = html.slice(html.indexOf('id="work"'), html.indexOf('id="experience"'));
  assert.doesNotMatch(workSection, /galaxy-effective-radius-thesis/);
  assert.doesNotMatch(workSection, /autonomous-vehicle-curriculum/);
});

test("shows a card figure on the projects that have one", async () => {
  const html = await (await render()).text();

  assert.match(html, /src="\/media\/nonlinear-filtering-ballistic-reentry\/ekf-beta\.png"/);
  assert.match(html, /src="\/media\/pde-optical-flow\/horn-schunck-standard\.png"/);
});

test("surfaces the expanded Volvo scope", async () => {
  const html = await (await render()).text();

  assert.match(html, /logs from autonomous trucks/);
  assert.match(html, /I managed release notes/);
  assert.match(html, /field issues were reported, prioritized, and assigned/);
  assert.match(html, /I also worked on an AI search agent/);
});

test("renders extracted figures on the ballistic reentry case study", async () => {
  const response = await render("/work/nonlinear-filtering-ballistic-reentry");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /AE 6505 Kalman Filtering/);
  assert.match(html, /src="\/media\/nonlinear-filtering-ballistic-reentry\/ekf-beta\.png"/);
  assert.match(html, /src="\/media\/nonlinear-filtering-ballistic-reentry\/ukf-position-error\.png"/);
  assert.match(html, /Kalman gain for β collapses early/);
  assert.match(html, /href="https:\/\/github\.com\/victor-p28\/Ballistic-Reentry-Filter-Comparison"/);
  assert.match(html, /href="\/Victor_Pedroso_Ballistic_Reentry_Filtering\.pdf"/);
});

test("server-renders the TurtleBot3 case study", async () => {
  const response = await render("/work/turtlebot3-autonomy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Intro to Robotics Research/);
  assert.match(html, /Fall 2025/);
  assert.match(html, /Ella Lawrence/);
  assert.match(html, /Vision-guided maze navigation/);
});

test("server-renders the PDE optical flow case study with figures", async () => {
  const response = await render("/work/pde-optical-flow");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /PDEs in Image Processing and Vision/);
  assert.match(html, /13 parameter settings/);
  assert.match(html, /src="\/media\/pde-optical-flow\/horn-schunck-augmented\.png"/);
  assert.match(html, /href="\/Victor_Pedroso_PDE_Optical_Flow\.pdf"/);
});

test("calls out the cross-implementation validation on the mobile robot", async () => {
  const html = await (await render("/work/autonomous-mobile-robot")).text();

  assert.match(html, /Cross-Implementation Validation/);
  assert.match(html, /C\+\+ with Eigen and CMake/);
  assert.match(html, /internally consistent, produces plausible-looking output, and is still wrong/);
});

test("no longer serves a second copy of the site", async () => {
  const response = await render("/simple");
  assert.equal(response.status, 404);
});

test("distinguishes concluded experiments from planned capstone research", async () => {
  const research = await render("/work/multi-drone-collision-avoidance");
  assert.equal(research.status, 200);
  const researchHtml = await research.text();
  assert.match(researchHtml, /Concluded/);
  assert.doesNotMatch(researchHtml, /In progress|Crazyflie|Vicon|auction-based|I validated/);

  const capstone = await render("/work/interpretable-vehicle-coordination");
  assert.equal(capstone.status, 200);
  const capstoneHtml = await capstone.text();
  assert.match(capstoneHtml, /In progress/);
  assert.match(capstoneHtml, /planning stage/);
  assert.match(capstoneHtml, /two cooperative vehicles/);
  assert.doesNotMatch(capstoneHtml, /aria-label="Key result"/);
});

test("exports every linked page and local asset for GitHub Pages", async () => {
  const home = await (await render()).text();
  const slugs = [...new Set([...home.matchAll(/href="(\/work\/[^"#]+)"/g)].map((match) => match[1]))];
  assert.equal(slugs.length, 7);
  for (const pathname of ["/", ...slugs]) {
    const response = await render(pathname.replace(/\/$/, "") || "/");
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)(?:[^" ]*)"/g)) {
      const asset = match[1];
      if (asset === "/" || asset.startsWith("/work/")) continue;
      await access(new URL(`../dist/client${asset}`, import.meta.url));
    }
  }
  assert.match(home, /https:\/\/victor-p28\.github\.io/);
  await access(new URL("../dist/client/404.html", import.meta.url));
});
