import React from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal, BookOpen, ArrowRight } from "lucide-react";

export default function TypeScriptSdkPage() {
  const clientCode = `export interface HydrillaConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface TaskResult {
  mesh_url: string;
  preview_image_url: string;
  format: string;
  triangles: number;
}

export interface TaskStatusResponse {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress?: number;
  result?: TaskResult;
  error?: string;
}

export class Hydrilla {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: HydrillaConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl || "https://api.hydrilla.co").replace(/\\/+$/, "");
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(\`\${this.baseUrl}\${path}\`, {
      ...options,
      headers: {
        "Authorization": \`Bearer \${this.apiKey}\`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || \`Hydrilla API Error: \${res.status}\`);
    }

    return res.json() as Promise<T>;
  }

  async textTo3d(prompt: string, resolution: 1024 | 1536 = 1536): Promise<{ id: string }> {
    return this.request<{ id: string }>("/v1/3d/text-to-3d", {
      method: "POST",
      body: JSON.stringify({ prompt, resolution })
    });
  }

  async imageTo3d(imageUrl: string, resolution: 1024 | 1536 = 1536): Promise<{ id: string }> {
    return this.request<{ id: string }>("/v1/3d/image-to-3d", {
      method: "POST",
      body: JSON.stringify({ image_url: imageUrl, resolution })
    });
  }

  async getTask(taskId: string): Promise<TaskStatusResponse> {
    return this.request<TaskStatusResponse>(\`/v1/3d/tasks/\${taskId}\`);
  }

  async pollUntilReady(taskId: string, intervalMs = 3000, maxAttempts = 60): Promise<TaskResult> {
    const checkAttempt = async (attempt: number): Promise<TaskResult> => {
      if (attempt >= maxAttempts) {
        throw new Error(\`Polling timed out after \${maxAttempts} attempts.\`);
      }

      const task = await this.getTask(taskId);
      if (task.status === "completed" && task.result) {
        return task.result;
      }
      if (task.status === "failed") {
        throw new Error(task.error || "3D generation failed");
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      return checkAttempt(attempt + 1);
    };

    return checkAttempt(0);
  }
}`;

  const usageCode = `import { Hydrilla } from "./hydrilla";

const client = new Hydrilla({
  apiKey: process.env.HYDRILLA_API_KEY!
});

async function main() {
  // 1. Submit text prompt
  const { id } = await client.textTo3d(
    "Futuristic cyberpunk street lamp, neon fixtures, game asset",
    1536
  );
  console.log("Task submitted:", id);

  // 2. Poll until mesh is generated
  const result = await client.pollUntilReady(id);
  console.log("GLB Mesh Ready:", result.mesh_url);
}

main().catch(console.error);`;

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TypeScript & Node.js</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          TypeScript Integration Guide
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Full TypeScript definitions and helper client for Next.js, Node.js, Bun, or Cloudflare Workers.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          TypeScript Client Implementation
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Save this as <code className="font-mono text-indigo-500">hydrilla.ts</code>:
        </p>
        <CodeBlock code={clientCode} language="typescript" filename="hydrilla.ts" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Example Usage
        </h2>
        <CodeBlock code={usageCode} language="typescript" filename="generate.ts" />
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/quickstart"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm ml-auto"
        >
          <span>Return to Quickstart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
