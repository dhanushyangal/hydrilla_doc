export interface DocNavItem {
  id: string;
  title: string;
  href: string;
  badge?: string;
  method?: "GET" | "POST" | "DELETE";
}

export interface DocSection {
  title: string;
  items: DocNavItem[];
}

export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ApiEndpointSpec {
  method: "GET" | "POST" | "DELETE";
  path: string;
  title: string;
  description: string;
  creditCost: string;
  authHeader: string;
  contentType?: string;
  headers?: ApiParam[];
  bodyParams?: ApiParam[];
  queryParams?: ApiParam[];
  curlExample: string;
  pythonExample: string;
  tsExample: string;
  response200: string;
  response402?: string;
}

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", title: "Introduction", href: "/introduction" },
      { id: "quickstart", title: "Quickstart", href: "/quickstart", badge: "Start Here" },
      { id: "authentication", title: "Authentication", href: "/authentication" },
      { id: "models", title: "Models & Engines", href: "/models" },
    ],
  },
  {
    title: "3D Generation API",
    items: [
      { id: "image-to-3d", title: "Image to 3D", href: "/api/image-to-3d", method: "POST" },
      { id: "text-to-3d", title: "Text to 3D", href: "/api/text-to-3d", method: "POST" },
      { id: "tasks", title: "Tasks & Polling", href: "/api/tasks", method: "GET" },
    ],
  },
  {
    title: "2D Image API",
    items: [
      { id: "images-generate", title: "Generate Concept Image", href: "/api/images-generate", method: "POST" },
      { id: "images-edit", title: "Edit Concept Image", href: "/api/images-edit", method: "POST" },
    ],
  },
  {
    title: "Models & Account",
    items: [
      { id: "models-list", title: "List Models", href: "/api/models-list", method: "GET" },
      { id: "user-me", title: "Account & Credits", href: "/api/user-me", method: "GET" },
    ],
  },
  {
    title: "SDKs & Examples",
    items: [
      { id: "python-sdk", title: "Python SDK Guide", href: "/sdks/python" },
      { id: "typescript-sdk", title: "TypeScript SDK Guide", href: "/sdks/typescript" },
    ],
  },
];

export const API_SPECS: Record<string, ApiEndpointSpec> = {
  "image-to-3d": {
    method: "POST",
    path: "/v1/3d/image-to-3d",
    title: "Image to 3D Reconstruction",
    description: "Reconstruct a production-ready 3D mesh (.glb) from a single concept image. Supports either JSON image URL or multipart file upload.",
    creditCost: "2 credits (1024) / 4 credits (1536)",
    authHeader: "Authorization: Bearer hyd_live_...",
    contentType: "application/json or multipart/form-data",
    bodyParams: [
      {
        name: "image_url",
        type: "string",
        required: false,
        description: "Public HTTPS URL of the reference concept image (optional if uploading a file via multipart).",
      },
      {
        name: "image",
        type: "file",
        required: false,
        description: "Direct binary upload of PNG, JPEG, or WebP image via multipart/form-data.",
      },
      {
        name: "resolution",
        type: "number",
        required: false,
        default: "1536",
        description: "Cascade mesh resolution: 1024 (fast draft) or 1536 (ultra high resolution).",
      },
      {
        name: "webhook_url",
        type: "string",
        required: false,
        description: "Optional HTTPS webhook endpoint to notify when reconstruction finishes.",
      },
    ],
    curlExample: `curl -X POST https://api.hydrilla.co/v1/3d/image-to-3d \\
  -H "Authorization: Bearer hyd_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://storage.googleapis.com/assets/concept-drone.png",
    "resolution": 1536
  }'`,
    pythonExample: `import requests

url = "https://api.hydrilla.co/v1/3d/image-to-3d"
headers = {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
}
payload = {
    "image_url": "https://storage.googleapis.com/assets/concept-drone.png",
    "resolution": 1536
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print("Task queued:", data["id"])`,
    tsExample: `const response = await fetch("https://api.hydrilla.co/v1/3d/image-to-3d", {
  method: "POST",
  headers: {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    image_url: "https://storage.googleapis.com/assets/concept-drone.png",
    resolution: 1536
  })
});

const data = await response.json();
console.log("Task ID:", data.id);`,
    response200: `{
  "id": "job_9b1deb4d3b7d4e8b82",
  "status": "queued",
  "resolution": 1536,
  "created_at": "2026-09-30T10:00:00.000Z",
  "eta_seconds": 45,
  "links": {
    "poll": "https://api.hydrilla.co/v1/3d/tasks/job_9b1deb4d3b7d4e8b82"
  }
}`,
    response402: `{
  "error": "Insufficient credits",
  "credits_required": 2,
  "credits_available": 0,
  "upgrade_url": "https://hydrilla.co/app/settings"
}`,
  },
  "text-to-3d": {
    method: "POST",
    path: "/v1/3d/text-to-3d",
    title: "Text to 3D Generation",
    description: "Automated end-to-end pipeline: optimizes your text prompt, generates a multi-view 2D concept render via OpenAI or Gemini, and reconstructs into a 3D mesh via BlueFox 3D.",
    creditCost: "3 credits (1024) / 5 credits (1536)",
    authHeader: "Authorization: Bearer hyd_live_...",
    contentType: "application/json",
    bodyParams: [
      {
        name: "prompt",
        type: "string",
        required: true,
        description: "Text description of the 3D model (e.g. 'A futuristic cyberpunk cybernetic samurai helmet, matte titanium, emissive neon cyan visor').",
      },
      {
        name: "image_model",
        type: "object",
        required: false,
        description: "Optional provider settings: { provider: 'openai' | 'gemini', quality: 'standard' | 'high', aspect: '1:1' }",
      },
      {
        name: "resolution",
        type: "number",
        required: false,
        default: "1536",
        description: "Mesh cascade resolution: 1024 or 1536.",
      },
    ],
    curlExample: `curl -X POST https://api.hydrilla.co/v1/3d/text-to-3d \\
  -H "Authorization: Bearer hyd_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Futuristic cyberpunk vehicle, high details, game ready prop",
    "image_model": {
      "provider": "openai",
      "quality": "high"
    },
    "resolution": 1536
  }'`,
    pythonExample: `import requests

url = "https://api.hydrilla.co/v1/3d/text-to-3d"
headers = {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Futuristic cyberpunk vehicle, high details, game ready prop",
    "image_model": {
        "provider": "openai",
        "quality": "high"
    },
    "resolution": 1536
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print("Task ID:", data["id"])`,
    tsExample: `const response = await fetch("https://api.hydrilla.co/v1/3d/text-to-3d", {
  method: "POST",
  headers: {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "Futuristic cyberpunk vehicle, high details, game ready prop",
    image_model: {
      provider: "openai",
      quality: "high"
    },
    resolution: 1536
  })
});

const data = await response.json();
console.log("Task ID:", data.id);`,
    response200: `{
  "id": "job_c18ab44d03e192a40",
  "status": "queued",
  "prompt": "Futuristic cyberpunk vehicle, high details, game ready prop",
  "resolution": 1536,
  "concept_image_url": "https://hydrilla-assets.s3.amazonaws.com/generated/concept_c18ab.png",
  "created_at": "2026-09-30T10:00:00.000Z",
  "eta_seconds": 60,
  "links": {
    "poll": "https://api.hydrilla.co/v1/3d/tasks/job_c18ab44d03e192a40"
  }
}`,
  },
  "tasks": {
    method: "GET",
    path: "/v1/3d/tasks/:taskId",
    title: "Tasks & Polling",
    description: "Poll the current progress and download URLs of an asynchronous 3D reconstruction or image generation job.",
    creditCost: "Free (0 credits)",
    authHeader: "Authorization: Bearer hyd_live_...",
    queryParams: [
      {
        name: "taskId",
        type: "string",
        required: true,
        description: "The job identifier returned by /v1/3d/text-to-3d or /v1/3d/image-to-3d.",
      },
    ],
    curlExample: `curl -X GET https://api.hydrilla.co/v1/3d/tasks/job_9b1deb4d3b7d4e8b82 \\
  -H "Authorization: Bearer hyd_live_your_api_key_here"`,
    pythonExample: `import requests
import time

taskId = "job_9b1deb4d3b7d4e8b82"
headers = {"Authorization": "Bearer hyd_live_your_api_key_here"}

while True:
    res = requests.get(f"https://api.hydrilla.co/v1/3d/tasks/{taskId}", headers=headers).json()
    status = res.get("status")
    print(f"Status: {status} ({res.get('progress', 0)}%)")
    if status == "completed":
        print("Download GLB:", res["result"]["mesh_url"])
        break
    elif status == "failed":
        print("Job failed:", res.get("error"))
        break
    time.sleep(3)`,
    tsExample: `const taskId = "job_9b1deb4d3b7d4e8b82";
const headers = { "Authorization": "Bearer hyd_live_your_api_key_here" };

const pollTask = async () => {
  const res = await fetch(\`https://api.hydrilla.co/v1/3d/tasks/\${taskId}\`, { headers });
  const data = await res.json();
  if (data.status === "completed") {
    console.log("3D Mesh ready:", data.result.mesh_url);
    return data.result;
  }
  if (data.status === "failed") {
    throw new Error(data.error);
  }
  await new Promise((r) => setTimeout(r, 3000));
  return pollTask();
};`,
    response200: `{
  "id": "job_9b1deb4d3b7d4e8b82",
  "status": "completed",
  "progress": 100,
  "result": {
    "mesh_url": "https://storage.googleapis.com/hydrilla-meshes/job_9b1deb4d3b7d4e8b82.glb",
    "preview_image_url": "https://storage.googleapis.com/hydrilla-meshes/job_9b1deb4d3b7d4e8b82_thumb.png",
    "format": "glb",
    "triangles": 128450,
    "vertices": 64230
  },
  "created_at": "2026-09-30T10:00:00.000Z",
  "completed_at": "2026-09-30T10:00:42.000Z"
}`,
  },
  "images-generate": {
    method: "POST",
    path: "/v1/images/generate",
    title: "Generate Concept Image",
    description: "Render high-fidelity 2D concept art and orthographic visual references using leading vision models (OpenAI Flare / Sunburst or Google Gemini Flash / Pro Image).",
    creditCost: "1 credit",
    authHeader: "Authorization: Bearer hyd_live_...",
    contentType: "application/json",
    bodyParams: [
      {
        name: "prompt",
        type: "string",
        required: true,
        description: "Detailed description of the asset to illustrate.",
      },
      {
        name: "model",
        type: "string",
        required: false,
        default: "gpt-image-2.5-flare",
        description: "Target model: gpt-image-2.5-flare, gpt-image-2.5-sunburst, gemini-3.1-flash-image, or gemini-3-pro-image.",
      },
      {
        name: "aspect_ratio",
        type: "string",
        required: false,
        default: "1:1",
        description: "Image aspect ratio: '1:1', '3:2', or '2:3'.",
      },
    ],
    curlExample: `curl -X POST https://api.hydrilla.co/v1/images/generate \\
  -H "Authorization: Bearer hyd_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Sci-fi tactical rover with solar panels, clean studio render",
    "model": "gpt-image-2.5-flare",
    "aspect_ratio": "1:1"
  }'`,
    pythonExample: `import requests

url = "https://api.hydrilla.co/v1/images/generate"
headers = {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Sci-fi tactical rover with solar panels, clean studio render",
    "model": "gpt-image-2.5-flare"
}

response = requests.post(url, headers=headers, json=payload)
print("Image URL:", response.json()["image_url"])`,
    tsExample: `const response = await fetch("https://api.hydrilla.co/v1/images/generate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "Sci-fi tactical rover with solar panels, clean studio render",
    model: "gpt-image-2.5-flare"
  })
});

const data = await response.json();
console.log("Rendered Image:", data.image_url);`,
    response200: `{
  "image_url": "https://hydrilla-assets.s3.amazonaws.com/generated/img_20260930_rover.png",
  "model": "gpt-image-2.5-flare",
  "prompt": "Sci-fi tactical rover with solar panels, clean studio render",
  "width": 1024,
  "height": 1024
}`,
  },
  "images-edit": {
    method: "POST",
    path: "/v1/images/edit",
    title: "Edit Concept Image",
    description: "Modify an existing concept render using natural language prompts and optional masks.",
    creditCost: "1 credit",
    authHeader: "Authorization: Bearer hyd_live_...",
    contentType: "application/json",
    bodyParams: [
      {
        name: "image_url",
        type: "string",
        required: true,
        description: "Public HTTPS URL of the base image to modify.",
      },
      {
        name: "prompt",
        type: "string",
        required: true,
        description: "Description of the modifications (e.g. 'Add glowing orange lights and weathered rust scratches').",
      },
      {
        name: "model",
        type: "string",
        required: false,
        default: "gpt-image-2.5-flare",
        description: "Model to use for editing.",
      },
    ],
    curlExample: `curl -X POST https://api.hydrilla.co/v1/images/edit \\
  -H "Authorization: Bearer hyd_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://hydrilla-assets.s3.amazonaws.com/generated/img_20260930_rover.png",
    "prompt": "Add heavy battle damage and glowing warning lights",
    "model": "gpt-image-2.5-flare"
  }'`,
    pythonExample: `import requests

url = "https://api.hydrilla.co/v1/images/edit"
headers = {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
}
payload = {
    "image_url": "https://hydrilla-assets.s3.amazonaws.com/generated/img_20260930_rover.png",
    "prompt": "Add heavy battle damage and glowing warning lights"
}

response = requests.post(url, headers=headers, json=payload)
print("Edited Image:", response.json()["image_url"])`,
    tsExample: `const response = await fetch("https://api.hydrilla.co/v1/images/edit", {
  method: "POST",
  headers: {
    "Authorization": "Bearer hyd_live_your_api_key_here",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    image_url: "https://hydrilla-assets.s3.amazonaws.com/generated/img_20260930_rover.png",
    prompt: "Add heavy battle damage and glowing warning lights"
  })
});

const data = await response.json();
console.log("Edited Image:", data.image_url);`,
    response200: `{
  "image_url": "https://hydrilla-assets.s3.amazonaws.com/generated/img_20260930_rover_edited.png",
  "model": "gpt-image-2.5-flare",
  "prompt": "Add heavy battle damage and glowing warning lights"
}`,
  },
  "models-list": {
    method: "GET",
    path: "/v1/models",
    title: "List Models & Capabilities",
    description: "Returns all currently available 3D reconstruction and 2D concept generation models, active versions, and credit costs.",
    creditCost: "Free (0 credits)",
    authHeader: "Authorization: Bearer hyd_live_...",
    curlExample: `curl -X GET https://api.hydrilla.co/v1/models \\
  -H "Authorization: Bearer hyd_live_your_api_key_here"`,
    pythonExample: `import requests

res = requests.get("https://api.hydrilla.co/v1/models", headers={"Authorization": "Bearer hyd_live_..."})
for model in res.json()["models"]:
    print(model["id"], model["type"], model["credits"])`,
    tsExample: `const res = await fetch("https://api.hydrilla.co/v1/models", {
  headers: { "Authorization": "Bearer hyd_live_..." }
});
const { models } = await res.json();
console.table(models);`,
    response200: `{
  "models": [
    {
      "id": "bluefox-1",
      "type": "3d",
      "provider": "hydrilla",
      "name": "BlueFox 3D v1",
      "credits": 2,
      "max_resolution": 1536
    },
    {
      "id": "gpt-image-2.5-flare",
      "type": "image",
      "provider": "openai",
      "name": "GPT Image 2.5 Flare",
      "credits": 1
    },
    {
      "id": "gemini-3.1-flash-image",
      "type": "image",
      "provider": "gemini",
      "name": "Gemini 3.1 Flash Image",
      "credits": 1
    }
  ]
}`,
  },
  "user-me": {
    method: "GET",
    path: "/v1/user/me",
    title: "Account & Credits",
    description: "Inspect your developer account credentials, active tier, and remaining credit balance.",
    creditCost: "Free (0 credits)",
    authHeader: "Authorization: Bearer hyd_live_...",
    curlExample: `curl -X GET https://api.hydrilla.co/v1/user/me \\
  -H "Authorization: Bearer hyd_live_your_api_key_here"`,
    pythonExample: `import requests

res = requests.get("https://api.hydrilla.co/v1/user/me", headers={"Authorization": "Bearer hyd_live_..."})
print("Remaining credits:", res.json()["credits"])`,
    tsExample: `const res = await fetch("https://api.hydrilla.co/v1/user/me", {
  headers: { "Authorization": "Bearer hyd_live_..." }
});
const me = await res.json();
console.log(\`Credits remaining: \${me.credits}\`);`,
    response200: `{
  "user_id": "usr_94f8a120cb9e",
  "email": "developer@studio.com",
  "credits": 250,
  "plan": "pro",
  "key_prefix": "hyd_live_d81a..."
}`,
  },
};
