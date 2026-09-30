import React from "react";
import Link from "next/link";
import { Box, Sparkles, Layers, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Introduction to Hydrilla AI
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Hydrilla AI provides developers, game studios, and 3D pipelines with programmatic access to our proprietary BlueFox 3D neural reconstruction engine and multi-modal 2D concept models.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            BlueFox 3D Cascade Pipeline
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Reconstruct dense 3D meshes up to 1536 resolution with watertight geometry, automated UV unwrapping, and PBR textures ready for Blender, Unreal, and Unity.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            Multi-Model 2D Generation
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Choose between OpenAI (GPT Image 2.5 Flare & Sunburst) and Google Gemini (Flash & Pro Image) for concept art generation and precise image editing.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            Automated Prompt-to-Mesh
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Single-call Text-to-3D handles prompt expansion, multi-view concept rendering, background removal, and 3D reconstruction automatically.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            Zero-Waste Refund Guarantee
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credits are checked upfront, deducted atomically, and 100% refunded if an upstream model or GPU worker encounters an error.
          </p>
        </div>
      </div>

      {/* Architecture */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>System Architecture</span>
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The Hydrilla developer platform operates across high-availability Edge API gateways and dedicated GCP GPU computing instances running the BlueFox runtime:
        </p>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-300 font-mono text-xs space-y-2 overflow-x-auto">
          <div>[Client Request] (Authorization: Bearer hyd_live_...)</div>
          <div className="pl-4">│</div>
          <div className="pl-4">▼</div>
          <div className="pl-4">[Hydrilla Gateway: api.hydrilla.co] ─── (Verify SHA-256 Key & Credits)</div>
          <div className="pl-8">├── 2D Pipeline ──► OpenAI / Google Gemini (Flare, Sunburst, Flash)</div>
          <div className="pl-8">└── 3D Pipeline ──► BlueFox 3D GPU Worker (Trellis / Sparse Voxel Latents)</div>
          <div className="pl-16">└── Async Post-Processing ──► GLB Export to Cloud Storage</div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/quickstart"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm ml-auto"
        >
          <span>Go to Quickstart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
