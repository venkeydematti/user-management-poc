"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPageContent from "../components/ProductsPageContent";

const queryClient = new QueryClient();

export default function ProductsQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI-assisted Product Search using Tanstack Query & Groq ( LLM - Llama 3.1-8b-instant )
          </h2>
          <ProductsPageContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}
