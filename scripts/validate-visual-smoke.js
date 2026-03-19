"use strict";

const fs = require("fs");
const path = require("path");

const siteRoot = path.resolve(process.argv[2] || "_site");
const failures = [];

if (!fs.existsSync(siteRoot) || !fs.statSync(siteRoot).isDirectory()) {
  console.error(`Site directory not found: ${siteRoot}`);
  process.exit(1);
}

const pageChecks = [
  {
    label: "Home page",
    file: "index.html",
    markers: [
      "hero__grid",
      "hero-visual",
      "id=\"differentiators-title\"",
      "id=\"trust-title\"",
      "class=\"site-footer\"",
    ],
  },
  {
    label: "Architecture page",
    file: path.join("architecture", "index.html"),
    markers: [
      "id=\"page-title\"",
      "architecture-topology.svg",
      "message-flow.svg",
      "class=\"trust-table\"",
      "class=\"site-footer\"",
    ],
  },
  {
    label: "Security page",
    file: path.join("security", "index.html"),
    markers: [
      "id=\"page-title\"",
      "Status Taxonomy",
      "class=\"site-footer\"",
    ],
  },
  {
    label: "Blog index",
    file: path.join("blog", "index.html"),
    markers: [
      "id=\"blog-title\"",
      "data-post-search",
      "class=\"site-footer\"",
    ],
  },
];

for (const check of pageChecks) {
  validatePage(check);
}

validateBlogPostTemplate();

if (failures.length > 0) {
  console.error(`Visual smoke validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Visual smoke validation passed for home/architecture/security/blog and blog post rendering.");

function validatePage(check) {
  const content = readPage(check.file, check.label);
  if (!content) {
    return;
  }

  for (const marker of check.markers) {
    if (!content.includes(marker)) {
      failures.push(`${check.label}: missing marker "${marker}" in ${check.file}`);
    }
  }
}

function validateBlogPostTemplate() {
  const blogRoot = path.resolve(siteRoot, "blog");
  if (!fs.existsSync(blogRoot) || !fs.statSync(blogRoot).isDirectory()) {
    failures.push("Blog posts directory missing in generated site: blog/");
    return;
  }

  const postFile = findFirstBlogPost(blogRoot);
  if (!postFile) {
    failures.push("No generated blog post page found under blog/<slug>/index.html");
    return;
  }

  const content = fs.readFileSync(postFile, "utf8");
  const relativePath = path.relative(siteRoot, postFile);
  const markers = [
    "class=\"post-shell\"",
    "class=\"post-content\"",
    "post-nav",
  ];

  for (const marker of markers) {
    if (!content.includes(marker)) {
      failures.push(`Blog post page ${relativePath}: missing marker "${marker}"`);
    }
  }
}

function findFirstBlogPost(blogRoot) {
  const found = [];
  walk(blogRoot);
  found.sort();
  return found[0] || "";

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }
      if (!entry.isFile() || entry.name !== "index.html") {
        continue;
      }
      const rel = path.relative(siteRoot, absolutePath).replace(/\\/g, "/");
      if (/^blog\/[^/]+\/index\.html$/.test(rel) && rel !== "blog/index.html") {
        found.push(absolutePath);
      }
    }
  }
}

function readPage(relativePath, label) {
  const pagePath = path.resolve(siteRoot, relativePath);
  if (!fs.existsSync(pagePath) || !fs.statSync(pagePath).isFile()) {
    failures.push(`${label}: missing expected generated file ${relativePath}`);
    return "";
  }

  return fs.readFileSync(pagePath, "utf8");
}
