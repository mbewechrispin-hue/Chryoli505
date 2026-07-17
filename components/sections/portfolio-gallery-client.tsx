"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export type PortfolioItem = {
  title: string;
  image: string;
  category: string;
  sortPath: string;
};

type Props = {
  items: PortfolioItem[];
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ─── Category folder card with auto-advancing soft slider ──────────────── */
function FolderCard({
  category,
  images,
  count,
  popupId,
}: {
  category: string;
  images: PortfolioItem[];
  count: number;
  popupId: string;
}) {
  const preview = useMemo(() => images.slice(0, 6), [images]);
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    if (preview.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % preview.length;
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, [preview.length]);

  const current = preview[index] ?? preview[0];
  const previous = preview[previousIndex] ?? preview[0];

  return (
    <a
      href={`#${popupId}`}
      aria-label={`Open ${category} gallery`}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      style={{
        clipPath: "inset(0 round 22px)",
      }}
    >
      {/* previous frame with 2s blur-out */}
      {previous && (
        <Image
          key={`${previous.image}-previous-${index}`}
          src={previous.image}
          alt={category}
          fill
          className="object-cover opacity-0 blur-lg scale-105 transition-all duration-[2000ms] ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={65}
        />
      )}

      {/* current frame with 2s blur-in */}
      {current && (
        <Image
          key={`${current.image}-current-${index}`}
          src={current.image}
          alt={category}
          fill
          className="object-cover opacity-100 blur-0 scale-100 transition-all duration-[2000ms] ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={65}
        />
      )}

      {/* soft edge vignette */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />

      {/* persistent dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* hover overlay – slightly lighter tint */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

      {/* label block */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 pb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Portfolio
          </p>
          <h3 className="mt-0.5 text-xl font-bold text-white drop-shadow">{category}</h3>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {count} photos
        </span>
      </div>

      {/* dot progress */}
      <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
        {preview.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* view arrow – visible on hover */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/95 group-hover:opacity-100">
        <svg className="h-4 w-4 text-zinc-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </a>
  );
}

function GalleryPopup({
  popupId,
  category,
  images,
}: {
  popupId: string;
  category: string;
  images: PortfolioItem[];
}) {
  return (
    <div
      id={popupId}
      className="portfolio-popup pointer-events-none fixed inset-0 z-[80] hidden flex-col bg-zinc-950 opacity-0 transition-opacity duration-300 target:pointer-events-auto target:flex target:opacity-100"
      role="dialog"
      aria-modal="true"
      aria-label={`${category} gallery`}
    >
      {/* header bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Portfolio
          </p>
          <h2 className="text-xl font-bold text-white">{category}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-zinc-400 sm:block">{images.length} images</span>
          <a
            href="#portfolio"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </a>
        </div>
      </div>

      {/* scrollable grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {images.map((img, idx) => (
            <a
              key={`${category}-${idx}`}
              href={`#${popupId}-img-${idx}`}
              aria-label={`View image ${idx + 1}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image
                src={img.image}
                alt={category}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
                quality={65}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  id,
  src,
  backHref,
}: {
  id: string;
  images: PortfolioItem[];
  src: string;
  backHref: string;
}) {
  return (
    <div
      id={id}
      className="portfolio-lightbox pointer-events-none fixed inset-0 z-[90] hidden flex-col bg-black/97 opacity-0 transition-opacity duration-300 target:pointer-events-auto target:flex target:opacity-100"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between px-5 py-3">
        <span className="text-sm text-white/50">Image preview</span>
        <a
          href={backHref}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </a>
      </div>

      {/* image area */}
      <div className="relative flex flex-1 items-center justify-center px-6 md:px-14">
        <div className="relative h-full max-h-[80vh] w-full">
          <Image
            src={src}
            alt="Portfolio image"
            fill
            className="object-contain"
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Section root ─────────────────────────────────────────────────────── */
export function PortfolioGalleryClient({ items }: Props) {
  const categoryCards = useMemo(() => {
    const grouped = new Map<string, PortfolioItem[]>();
    for (const item of items) {
      const arr = grouped.get(item.category) ?? [];
      arr.push(item);
      grouped.set(item.category, arr);
    }
    return Array.from(grouped.entries())
      .map(([category, imgs]) => ({
        category,
        images: imgs.sort((a, b) => a.sortPath.localeCompare(b.sortPath)),
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }, [items]);

  return (
    <section id="portfolio" className="bg-zinc-950 py-20">
      <div className="container">
        {/* section header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Our Work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Portfolio
          </h2>
          <p className="mt-4 text-sm text-zinc-400 md:text-base">
            Browse by category and open any card to explore the full gallery.
          </p>
        </div>

        {/* category cards grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categoryCards.map((entry) => (
            <FolderCard
              key={entry.category}
              category={entry.category}
              images={entry.images}
              count={entry.images.length}
              popupId={`portfolio-${slugify(entry.category)}`}
            />
          ))}
        </div>
      </div>

      {categoryCards.map((entry) => {
        const popupId = `portfolio-${slugify(entry.category)}`;

        return (
          <GalleryPopup
            key={popupId}
            popupId={popupId}
            category={entry.category}
            images={entry.images}
          />
        );
      })}

      {categoryCards.flatMap((entry) => {
        const popupId = `portfolio-${slugify(entry.category)}`;

        return entry.images.map((img, idx) => (
          <Lightbox
            key={`${popupId}-img-${idx}`}
            id={`${popupId}-img-${idx}`}
            src={img.image}
            images={entry.images}
            backHref={`#${popupId}`}
          />
        ));
      })}
    </section>
  );
}
