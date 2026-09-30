"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Key, Sparkles, ExternalLink, Menu, X, Search } from "lucide-react";
import { DOC_SECTIONS } from "@/lib/docsData";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? DOC_SECTIONS.flatMap((section) => section.items).filter((item) => {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.href.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/quickstart" className="flex items-center gap-2">
            <Image
              src="/logo/light.svg"
              alt="Hydrilla AI Logo"
              width={140}
              height={28}
              priority
              className="h-7 w-auto dark:hidden"
            />
            <Image
              src="/logo/dark.svg"
              alt="Hydrilla AI Logo"
              width={140}
              height={28}
              priority
              className="h-7 w-auto hidden dark:block"
            />
          </Link>

          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            v1.0 REST API
          </span>
        </div>

        {/* Global Search and External Links */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-500 w-64 focus-within:ring-2 focus-within:ring-indigo-500">
              <Search className="w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search endpoints & guides..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  setIsSearchOpen(true);
                }}
                className="bg-transparent border-none outline-none w-full text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                {searchResults.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between px-3 py-2 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {result.title}
                    </span>
                    {result.method && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {result.method}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://hydrilla.co/app/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Studio</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>

          <a
            href="https://hydrilla.co/app/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
            <span>Get API Key</span>
          </a>
        </div>
      </div>
    </header>
  );
}
