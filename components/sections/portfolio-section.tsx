import { promises as fs } from "node:fs";
import path from "node:path";
import { PortfolioGalleryClient, type PortfolioItem } from "./portfolio-gallery-client";

const PRINTING_DIR = path.join(process.cwd(), "public", "images", "printing");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function titleFromFileName(fileName: string) {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function categoryFromDirectory(segment: string) {
  return segment
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function walkPrintingImages(dir: string): Promise<PortfolioItem[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: PortfolioItem[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await walkPrintingImages(absolutePath);
      results.push(...nested);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) {
      continue;
    }

    const relativePath = path.relative(PRINTING_DIR, absolutePath);
    const normalized = relativePath.split(path.sep);
    const topFolder = normalized[0] ?? "Printing";
    const category = categoryFromDirectory(topFolder);
    const publicPath = `/images/printing/${normalized.join("/")}`;

    results.push({
      title: titleFromFileName(entry.name),
      image: encodeURI(publicPath),
      category,
      sortPath: publicPath.toLowerCase()
    });
  }

  return results;
}

export async function PortfolioSection() {
  let items: PortfolioItem[] = [];

  try {
    const discovered = await walkPrintingImages(PRINTING_DIR);
    items = discovered.sort((a, b) => a.sortPath.localeCompare(b.sortPath));
  } catch {
    items = [];
  }

  if (items.length === 0) {
    items = [
      {
        title: "Portfolio preview",
        image: "/images/printing/placeholder.svg",
        category: "Preview",
        sortPath: "preview"
      }
    ];
  }

  return <PortfolioGalleryClient items={items} />;
}
