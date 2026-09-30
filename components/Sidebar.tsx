"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_SECTIONS } from "@/lib/docsData";
import { clsx } from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const getMethodBadgeClass = (method?: "GET" | "POST" | "DELETE") => {
    if (method === "POST") {
      return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
    }
    if (method === "GET") {
      return "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800";
    }
    if (method === "DELETE") {
      return "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800";
    }
    return "";
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed top-16 bottom-0 z-40 w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto px-4 py-6",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <nav className="space-y-8">
          {DOC_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          "group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.method && (
                          <span
                            className={clsx(
                              "font-mono text-[10px] px-1.5 py-0.2 rounded font-bold uppercase",
                              getMethodBadgeClass(item.method)
                            )}
                          >
                            {item.method}
                          </span>
                        )}
                        {item.badge && !item.method && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-normal">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
