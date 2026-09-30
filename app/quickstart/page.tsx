import React from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Key, Terminal, Download, ArrowRight, Sparkles } from "lucide-react";

export default function QuickstartPage() {
  const curlStep2 = `curl -X POST https://api.hydrilla.co/v1/3d/text-to-3d \\
  -H "Authorization: Bearer hyd_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Futuristic cyberpunk vehicle, high details, game ready prop",
    "image_model": {
      "provider": "openai",
      "quality": "high"
    },
    "resolution": 1536
  }'`;

  const curlStep3 = `curl -X GET https://api.hydrilla.co/v1/3d/tasks/job_c18ab44d03e192a40 \\
  -H "Authorization: Bearer hyd_live_your_api_key_here"`;

  const pythonQuickstart = `import requests
import time

API_KEY = "hyd_live_your_api_key_here"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# 1. Trigger Text-to-3D
res = requests.post("https://api.hydrilla.co/v1/3d/text-to-3d", headers=HEADERS, json={
    "prompt": "Futuristic cyberpunk vehicle, high details, game ready prop",
    "resolution": 1536
})
task_id = res.json()["id"]
print(f"Task submitted: {task_id}")

# 2. Poll until complete
while True:
    task = requests.get(f"https://api.hydrilla.co/v1/3d/tasks/{task_id}", headers=HEADERS).json()
    status = task.get("status")
    print(f"Status: {status} ({task.get('progress', 0)}%)")
    
    if status == "completed":
        glb_url = task["result"]["mesh_url"]
        print(f"3D Model Ready! Download at: {glb_url}")
        break
    elif status == "failed":
        print("Failed:", task.get("error"))
        break
        
    time.sleep(3)`;

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>5-Minute Guide</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Quickstart Guide
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Get up and running with the Hydrilla AI API in 3 simple steps: authenticate, submit a 3D reconstruction task, and poll for the downloadable GLB mesh.
        </p>
      </div>

      {/* Step 1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Create your API Key
          </h2>
        </div>
        <div className="pl-11 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
          <p>
            API requests require a secret key starting with <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-indigo-500 font-medium">hyd_live_...</code>.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Log in to the{" "}
              <a
                href="https://hydrilla.co/app/studio"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                Hydrilla Studio
              </a>
              .
            </li>
            <li>
              Navigate to{" "}
              <a
                href="https://hydrilla.co/app/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                API Keys
              </a>{" "}
              in your dashboard sidebar.
            </li>
            <li>
              Click <strong>Create Secret Key</strong>, give it a name (e.g., <em>Production-Backend</em>), and copy the revealed token.
            </li>
          </ol>
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Trigger 3D Reconstruction
          </h2>
        </div>
        <div className="pl-11 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
          <p>
            Submit a prompt to the <code className="font-mono text-indigo-500 font-medium">POST /v1/3d/text-to-3d</code> endpoint. Hydrilla will compile the prompt, render reference views, and dispatch the job to our BlueFox GPU cluster.
          </p>
          <CodeBlock code={curlStep2} language="bash" filename="cURL Request" />
          <p className="text-xs text-neutral-500">
            The endpoint returns an asynchronous task ID:
          </p>
          <CodeBlock
            code={`{
  "id": "job_c18ab44d03e192a40",
  "status": "queued",
  "resolution": 1536,
  "links": {
    "poll": "https://api.hydrilla.co/v1/3d/tasks/job_c18ab44d03e192a40"
  }
}`}
            language="json"
            filename="Response 200 OK"
          />
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Poll for Completion & Download Mesh
          </h2>
        </div>
        <div className="pl-11 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
          <p>
            Poll <code className="font-mono text-indigo-500 font-medium">GET /v1/3d/tasks/:taskId</code> every 2–3 seconds until the status reaches <code className="font-mono text-emerald-500">completed</code>.
          </p>
          <CodeBlock code={curlStep3} language="bash" filename="Poll Task" />
          <CodeBlock
            code={`{
  "id": "job_c18ab44d03e192a40",
  "status": "completed",
  "progress": 100,
  "result": {
    "mesh_url": "https://storage.googleapis.com/hydrilla-meshes/job_c18ab.glb",
    "preview_image_url": "https://storage.googleapis.com/hydrilla-meshes/job_c18ab_thumb.png",
    "format": "glb",
    "triangles": 128450
  }
}`}
            language="json"
            filename="Completed Response"
          />
        </div>
      </section>

      {/* Full Script */}
      <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Complete Python Example
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Copy and run this self-contained script to test end-to-end 3D generation:
        </p>
        <CodeBlock code={pythonQuickstart} language="python" filename="quickstart.py" />
      </section>

      {/* Next Steps CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-neutral-900 border border-indigo-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Next: Explore Authentication</h3>
          <p className="text-xs text-neutral-300">
            Learn about API key lifecycle, headers, rate limits, and error handling.
          </p>
        </div>
        <Link
          href="/authentication"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm shrink-0"
        >
          <span>Authentication Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
