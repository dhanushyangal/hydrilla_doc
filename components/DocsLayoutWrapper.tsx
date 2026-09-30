"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export function DocsLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      <Navbar
        onToggleSidebar={() => {
          setSidebarOpen((prev) => !prev);
        }}
      />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false);
          }}
        />
        <main className="flex-1 md:pl-64 min-w-0">
          <div className="py-8 px-4 sm:px-8 max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
