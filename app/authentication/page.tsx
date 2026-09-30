import React from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Lock, Key, AlertTriangle, ArrowRight } from "lucide-react";

export default function AuthenticationPage() {
  const curlAuth = `curl -X GET https://api.hydrilla.co/v1/user/me \\
  -H "Authorization: Bearer hyd_live_d81a9f02b37c4e91823abce"`;

  const curlApiKeyHeader = `curl -X GET https://api.hydrilla.co/v1/user/me \\
  -H "x-api-key: hyd_live_d81a9f02b37c4e91823abce"`;

  const error401 = `{
  "error": "Unauthorized",
  "message": "Invalid or revoked API key. Generate a key at https://hydrilla.co/app/api-keys"
}`;

  const error402 = `{
  "error": "Insufficient credits",
  "message": "This operation requires 2 credits, but your balance is 0.",
  "credits_available": 0,
  "credits_required": 2,
  "upgrade_url": "https://hydrilla.co/app/settings"
}`;

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          Authentication
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The Hydrilla AI API uses secure Bearer tokens to authenticate requests. Manage your keys and monitor usage through the developer dashboard.
        </p>
      </div>

      {/* Header specification */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-500" />
          <span>Authorization Headers</span>
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Pass your secret API key in the <code className="font-mono text-indigo-500 font-medium">Authorization</code> header using standard Bearer authentication:
        </p>
        <CodeBlock code={curlAuth} language="bash" filename="Bearer Header (Recommended)" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Alternatively, you can provide it via the <code className="font-mono text-indigo-500 font-medium">x-api-key</code> header:
        </p>
        <CodeBlock code={curlApiKeyHeader} language="bash" filename="x-api-key Header" />
      </section>

      {/* Security Architecture */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-500" />
          <span>Key Security & Hashing</span>
        </h2>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            <strong>One-Time Reveal:</strong> When you generate a key, the full key (<code className="font-mono text-xs text-indigo-500">hyd_live_...</code>) is displayed once. Make sure to store it securely in your environment variables.
          </p>
          <p>
            <strong>SHA-256 Hashing:</strong> Hydrilla never stores your plaintext API key in the database. Only a cryptographic SHA-256 hash is persisted.
          </p>
          <p>
            <strong>Instant Revocation:</strong> You can revoke an API key at any time in the dashboard under <a href="https://hydrilla.co/app/api-keys" target="_blank" rel="noreferrer" className="text-indigo-500 underline">API Keys</a>. Revocation is instantaneous.
          </p>
        </div>
      </section>

      {/* Common Auth Errors */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Error Codes</span>
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              401 Unauthorized
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              Returned if the key is missing, malformed, or has been revoked.
            </p>
            <CodeBlock code={error401} language="json" filename="401_UNAUTHORIZED.json" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              402 Insufficient Credits
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              Returned if your account credit balance is too low to perform the generation.
            </p>
            <CodeBlock code={error402} language="json" filename="402_INSUFFICIENT_CREDITS.json" />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/models"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm ml-auto"
        >
          <span>Explore Models & Pricing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
