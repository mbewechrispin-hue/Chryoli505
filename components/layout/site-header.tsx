"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo/logo.png" alt="Yolic" width={160} height={64} priority className="h-auto w-40 object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-zinc-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/#quote">
            <Button>Get Quote</Button>
          </Link>
        </div>

        <button className="text-zinc-100 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div className={cn("border-t border-zinc-800 bg-zinc-950 md:hidden", open ? "block" : "hidden")}>
        <div className="container flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-zinc-200" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/#quote" onClick={() => setOpen(false)}>
            <Button className="w-full">Get Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
