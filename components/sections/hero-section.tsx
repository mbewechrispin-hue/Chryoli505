"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

const INTERVAL = 5000; // ms per slide

const slides = [
  { src: "/images/logo/NEW COVER.png",                     label: "Our Brand Story",       sub: "Where every great business begins" },
  { src: "/images/logo/profile.png",                        label: "About Yolic",            sub: "One partner for all your business needs" },
  { src: "/images/printer/print up.JPG",                    label: "Print Solutions",        sub: "Precision printing at scale" },
  { src: "/images/printing/3D,2D Signage and stickers.png", label: "Signage & Stickers",     sub: "Make your brand impossible to miss" },
  { src: "/images/printing/CNC CUTTING.png",                label: "CNC Cutting",            sub: "Engineered to the millimeter" },
  { src: "/images/printing/LARGE PRINT & BRANDING.png",     label: "Large Print & Branding", sub: "Bold visuals that command attention" },
  { src: "/images/printing/PAPER PRINTING.png",             label: "Paper Printing",         sub: "Quality you can feel" },
  { src: "/images/printing/T-SHIRT PRINTING.png",           label: "T-Shirt Printing",       sub: "Wear your brand with pride" },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 });

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + slides.length) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // Progress bar tick
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        go(current + 1, 1);
      }
    }, 30);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, go]);

  return (
    <section className="relative overflow-hidden section-gradient pb-24 pt-20 md:pt-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container grid items-center gap-12 lg:grid-cols-2">

        {/* ── Left: copy ── */}
        <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.14 }}>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex rounded-full border border-zinc-300 bg-white px-4 py-1 text-xs uppercase tracking-[0.2em] text-zinc-600"
          >
            Professional Business Solutions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl"
          >
            <span className="relative inline-block">
              Building Brands. Powering Businesses.
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.85)_50%,rgba(255,255,255,0.18)_65%,transparent_100%)] bg-[length:220%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["120% 50%", "-20% 50%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              >
                Building Brands. Powering Businesses.
              </motion.span>
            </span>
          </motion.h1>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-[3px] w-28 rounded-full bg-gradient-to-r from-primary via-amber-300 to-transparent"
          />
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg text-zinc-600"
          >
            From branding and printing to marketing and technology solutions, Yolic helps businesses grow through innovative and reliable services.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="#quote"><Button size="lg">Get Free Quote</Button></Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="#services"><Button size="lg" variant="outline">View Services</Button></Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right: slider ── */}
        <motion.div
          className="relative mx-auto w-full max-w-xl select-none"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            pointerX.set(px);
            pointerY.set(py);
          }}
          onMouseLeave={() => {
            pointerX.set(0);
            pointerY.set(0);
          }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 z-0 rounded-[40px] bg-[conic-gradient(from_0deg,rgba(244,196,0,0.25),rgba(59,130,246,0.2),rgba(244,196,0,0.25))] blur-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />

          {/* ── frame ── */}
          <div
            className="relative z-10 overflow-hidden rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/20"
            style={{ aspectRatio: "4/3" }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? "100%" : "-100%",
                    scale: 1.08,
                    opacity: 0,
                  }),
                  center: { x: 0, scale: 1, opacity: 1 },
                  exit: (d: number) => ({
                    x: d > 0 ? "-30%" : "30%",
                    scale: 0.92,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                {/* Ken Burns zoom on the image */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.07 }}
                  transition={{ duration: INTERVAL / 1000 + 0.7, ease: "linear" }}
                >
                  <Image
                    src={slides[current].src}
                    alt={slides[current].label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={current === 0}
                  />
                </motion.div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Animated caption */}
                <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                  <motion.p
                    key={`sub-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45 }}
                    className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 mb-1"
                  >
                    {slides[current].sub}
                  </motion.p>
                  <motion.h3
                    key={`label-${current}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="text-lg font-bold text-white"
                  >
                    {slides[current].label}
                  </motion.h3>
                </div>

                {/* Slide counter top-right */}
                <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold tabular-nums text-white/80 backdrop-blur-sm">
                  {current + 1} / {slides.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Progress bar ── */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20 z-10">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* ── Prev / Next arrows ── */}
          <button
            onClick={() => go(current - 1, -1)}
            aria-label="Previous slide"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-zinc-200 transition hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <ChevronLeft className="size-5 text-zinc-700" />
          </button>
          <button
            onClick={() => go(current + 1, 1)}
            aria-label="Next slide"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-zinc-200 transition hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <ChevronRight className="size-5 text-zinc-700" />
          </button>

          {/* ── Dot indicators ── */}
          <div className="mt-5 flex justify-center items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-7 h-2.5 bg-zinc-800"
                      : "w-2.5 h-2.5 bg-zinc-300 group-hover:bg-zinc-500"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
