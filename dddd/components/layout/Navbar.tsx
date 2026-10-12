"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Businesses", href: "/#businesses" },
  { label: "About Us", href: "/about" },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "Presentations", href: "/#investor-relations" },
  { label: "Projects", href: "/projects" },
  { label: "Media", href: "/#news" },
  // { label: "Contact", href: "/contact" },
];

function isItemActive(href: string, currentPath: string): boolean {
  if (href === "/") {
    return currentPath === "/";
  }
  if (href === "/about") {
    return currentPath === "/about" || currentPath.startsWith("/about/");
  }
  if (href === "/projects") {
    return currentPath === "/projects" || currentPath.startsWith("/projects/");
  }
  if (href === "/#businesses" || href === "/companies") {
    return currentPath === "/companies" || currentPath.startsWith("/companies/");
  }
  const base = href.split("#")[0];
  if (base && base !== "/") {
    return currentPath === base || currentPath.startsWith(base + "/");
  }
  return false;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-[#0b132b] font-extrabold text-xl shadow-md border border-amber-300">
            N+
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#110c5b] block leading-none">
              Neweraplus
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-500 block mt-1 font-bold">
              Group of Companies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isItemActive(item.href, pathname);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group text-[13px] font-bold tracking-wide transition-colors py-2 relative ${
                  active
                    ? "text-amber-600"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-[#0b132b] text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-lg shadow-md shadow-amber-500/25 transition-all"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="xl:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-800 hover:text-amber-600 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4 shadow-xl">
          {navItems.map((item) => {
            const active = isItemActive(item.href, pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-bold py-2 border-b border-gray-50 flex items-center justify-between transition-colors ${
                  active
                    ? "text-amber-600"
                    : "text-gray-800 hover:text-amber-600"
                }`}
              >
                <span>{item.label}</span>
                {active && <span className="w-2 h-2 rounded-full bg-amber-500" />}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0b132b] text-xs font-bold uppercase tracking-wider py-3.5 rounded-lg shadow"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
