import React from "react";
import { notFound } from "next/navigation";
import { API_SPECS } from "@/lib/docsData";
import { ApiEndpointView } from "@/components/ApiEndpointView";

export function generateStaticParams() {
  return Object.keys(API_SPECS).map((endpoint) => ({
    endpoint,
  }));
}

interface PageProps {
  params: Promise<{
    endpoint: string;
  }>;
}

export default async function ApiEndpointPage({ params }: PageProps) {
  const resolvedParams = await params;
  const spec = API_SPECS[resolvedParams.endpoint];

  if (!spec) {
    notFound();
  }

  return <ApiEndpointView spec={spec} />;
}
