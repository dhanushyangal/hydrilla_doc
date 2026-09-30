import React from "react";
import Link from "next/link";
import { Box, Sparkles, ArrowRight } from "lucide-react";

export default function ModelsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Models & Capabilities
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Hydrilla AI orchestrates specialized neural architectures across 3D reconstruction and 2D concept rendering.
        </p>
      </div>

      {/* 3D Models Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            3D Reconstruction Models
          </h2>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                <th className="py-2.5 px-4">Model ID</th>
                <th className="py-2.5 px-4">Cascade Resolution</th>
                <th className="py-2.5 px-4">Speed</th>
                <th className="py-2.5 px-4">Cost</th>
                <th className="py-2.5 px-4">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  bluefox-1 (1024)
                </td>
                <td className="py-3 px-4 font-mono">1024 voxels</td>
                <td className="py-3 px-4">~25-35s</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  2 Credits
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  Rapid prototyping, low-poly game props, mobile games
                </td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  bluefox-1 (1536)
                </td>
                <td className="py-3 px-4 font-mono">1536 voxels</td>
                <td className="py-3 px-4">~45-60s</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  4 Credits
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  High-fidelity hero assets, film, Unreal Engine 5 production
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2D Models Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            2D Concept & Image Editing Models
          </h2>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                <th className="py-2.5 px-4">Model ID</th>
                <th className="py-2.5 px-4">Provider</th>
                <th className="py-2.5 px-4">Cost</th>
                <th className="py-2.5 px-4">Highlights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  gpt-image-2.5-flare
                </td>
                <td className="py-3 px-4 font-medium">OpenAI</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  1 Credit
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  Ultra-fast, stylized concept art, vivid lighting, ideal for rapid iterations
                </td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  gpt-image-2.5-sunburst
                </td>
                <td className="py-3 px-4 font-medium">OpenAI</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  1 Credit
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  Studio lighting, orthographic views, crisp texture details
                </td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  gemini-3.1-flash-image
                </td>
                <td className="py-3 px-4 font-medium">Google</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  1 Credit
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  Fastest turnaround time (&lt;3s), exceptional multi-angle consistency
                </td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  gemini-3-pro-image
                </td>
                <td className="py-3 px-4 font-medium">Google</td>
                <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  1 Credit
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300">
                  Complex scene comprehension, multi-part engineering equipment renders
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/api/image-to-3d"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm ml-auto"
        >
          <span>View 3D API Reference</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
