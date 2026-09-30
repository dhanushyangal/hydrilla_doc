import React from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal, BookOpen, ArrowRight } from "lucide-react";

export default function PythonSdkPage() {
  const installCmd = `pip install requests`;

  const clientCode = `import requests
import time
from typing import Optional, Dict, Any

class Hydrilla:
    def __init__(self, api_key: str, base_url: str = "https://api.hydrilla.co"):
        self.base_url = base_url.rstrip("/")
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    def text_to_3d(self, prompt: str, resolution: int = 1536, image_model: Optional[Dict[str, str]] = None) -> str:
        """Trigger Text-to-3D generation and return the task ID."""
        payload = {"prompt": prompt, "resolution": resolution}
        if image_model:
            payload["image_model"] = image_model
            
        res = requests.post(f"{self.base_url}/v1/3d/text-to-3d", headers=self.headers, json=payload)
        res.raise_for_status()
        return res.json()["id"]

    def image_to_3d(self, image_url: str, resolution: int = 1536) -> str:
        """Trigger Image-to-3D generation and return the task ID."""
        payload = {"image_url": image_url, "resolution": resolution}
        res = requests.post(f"{self.base_url}/v1/3d/image-to-3d", headers=self.headers, json=payload)
        res.raise_for_status()
        return res.json()["id"]

    def poll_task(self, task_id: str, poll_interval: int = 3, timeout: int = 180) -> Dict[str, Any]:
        """Poll task until completed or failed."""
        start = time.time()
        while time.time() - start < timeout:
            res = requests.get(f"{self.base_url}/v1/3d/tasks/{task_id}", headers=self.headers)
            res.raise_for_status()
            data = res.json()
            status = data.get("status")
            
            if status == "completed":
                return data["result"]
            elif status == "failed":
                raise RuntimeError(f"Hydrilla Task Failed: {data.get('error')}")
                
            time.sleep(poll_interval)
            
        raise TimeoutError(f"Task {task_id} timed out after {timeout} seconds.")`;

  const usageCode = `from hydrilla import Hydrilla

client = Hydrilla(api_key="hyd_live_your_api_key_here")

# 1. Generate 3D directly from prompt
task_id = client.text_to_3d(
    prompt="Cyberpunk drone quadcopter, carbon fiber frame, glowing blue LED",
    resolution=1536
)
print(f"Queued 3D task: {task_id}")

# 2. Wait for GLB export
result = client.poll_task(task_id)
print(f"Success! Download GLB mesh: {result['mesh_url']}")`;

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Python 3.8+</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Python Integration Guide
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Easily integrate Hydrilla 3D and 2D generation into your Python scripts, Blender add-ons, or backend services.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-500" />
          <span>Installation</span>
        </h2>
        <CodeBlock code={installCmd} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Python Client Implementation
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Save this lightweight wrapper as <code className="font-mono text-indigo-500">hydrilla.py</code>:
        </p>
        <CodeBlock code={clientCode} language="python" filename="hydrilla.py" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Example Usage
        </h2>
        <CodeBlock code={usageCode} language="python" filename="generate.py" />
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/sdks/typescript"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm ml-auto"
        >
          <span>TypeScript Integration Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
