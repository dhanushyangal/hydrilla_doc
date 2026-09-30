"use client";

import React, { useState } from "react";
import { ApiEndpointSpec } from "@/lib/docsData";
import { CodeBlock } from "@/components/CodeBlock";
import { Coins, Lock, Globe, Server } from "lucide-react";
import { clsx } from "clsx";

interface ApiEndpointViewProps {
  spec: ApiEndpointSpec;
}

export function ApiEndpointView({ spec }: ApiEndpointViewProps) {
  const [selectedLang, setSelectedLang] = useState<"curl" | "python" | "ts">("curl");
  const [selectedResponse, setSelectedResponse] = useState<"200" | "402">("200");

  const getCodeSnippet = () => {
    if (selectedLang === "python") {
      return spec.pythonExample;
    }
    if (selectedLang === "ts") {
      return spec.tsExample;
    }
    return spec.curlExample;
  };

  const getMethodBadgeClass = (method: "GET" | "POST" | "DELETE") => {
    if (method === "POST") {
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    }
    if (method === "GET") {
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
    }
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Endpoint Header */}
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={clsx(
              "px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase border",
              getMethodBadgeClass(spec.method)
            )}
          >
            {spec.method}
          </span>
          <code className="text-sm md:text-base font-mono font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-md">
            {spec.path}
          </code>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>{spec.creditCost}</span>
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {spec.title}
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {spec.description}
        </p>
      </div>

      {/* Meta Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200">
              Authentication
            </div>
            <div className="font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
              {spec.authHeader}
            </div>
          </div>
        </div>
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-start gap-2.5">
          <Server className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200">
              Base URL
            </div>
            <div className="font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
              https://api.hydrilla.co
            </div>
          </div>
        </div>
      </div>

      {/* Body Parameters */}
      {spec.bodyParams && spec.bodyParams.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>Request Body</span>
            {spec.contentType && (
              <span className="text-xs font-mono font-normal text-neutral-400">
                ({spec.contentType})
              </span>
            )}
          </h2>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                  <th className="py-2.5 px-4">Parameter</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {spec.bodyParams.map((param) => (
                  <tr key={param.name} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                    <td className="py-3 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      <div className="flex items-center gap-1.5">
                        <span>{param.name}</span>
                        {param.required ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-sans font-semibold">
                            required
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-400 font-sans">
                            optional
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      {param.type}
                    </td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                      {param.description}
                      {param.default && (
                        <span className="block text-[11px] text-neutral-400 font-mono mt-0.5">
                          default: {param.default}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Query Parameters */}
      {spec.queryParams && spec.queryParams.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Path & Query Parameters
          </h2>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {spec.queryParams.map((param) => (
                  <tr key={param.name} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                    <td className="py-3 px-4 font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      {param.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      {param.type}
                    </td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                      {param.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Example */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Request Example
          </h2>
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs">
            <button
              onClick={() => {
                setSelectedLang("curl");
              }}
              className={clsx(
                "px-3 py-1 rounded-md font-medium transition-colors",
                selectedLang === "curl"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              cURL
            </button>
            <button
              onClick={() => {
                setSelectedLang("python");
              }}
              className={clsx(
                "px-3 py-1 rounded-md font-medium transition-colors",
                selectedLang === "python"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              Python
            </button>
            <button
              onClick={() => {
                setSelectedLang("ts");
              }}
              className={clsx(
                "px-3 py-1 rounded-md font-medium transition-colors",
                selectedLang === "ts"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              TypeScript
            </button>
          </div>
        </div>
        <CodeBlock
          code={getCodeSnippet()}
          language={selectedLang === "curl" ? "bash" : selectedLang}
        />
      </div>

      {/* Response Example */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Response
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedResponse("200");
              }}
              className={clsx(
                "px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors",
                selectedResponse === "200"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              200 OK
            </button>
            {spec.response402 && (
              <button
                onClick={() => {
                  setSelectedResponse("402");
                }}
                className={clsx(
                  "px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors",
                  selectedResponse === "402"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                )}
              >
                402 Payment Required
              </button>
            )}
          </div>
        </div>
        <CodeBlock
          code={selectedResponse === "200" ? spec.response200 : spec.response402 || ""}
          language="json"
          filename={selectedResponse === "200" ? "200_SUCCESS.json" : "402_INSUFFICIENT_CREDITS.json"}
        />
      </div>
    </div>
  );
}
