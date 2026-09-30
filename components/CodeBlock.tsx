"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="relative group rounded-xl border border-neutral-800 bg-[#0d1117] text-neutral-100 overflow-hidden shadow-sm my-4 font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-neutral-800 text-[11px] text-neutral-400">
        <span className="font-medium text-neutral-300">
          {filename ? filename : language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto leading-relaxed text-neutral-200">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
