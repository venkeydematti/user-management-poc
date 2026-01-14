"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AIFilterBar from "../components/AIFilterBar";
import ProductsList from "../components/ProductsList";
import { fetchProducts } from "../lib/api/fetchProducts";

export default function ProductsPageContent() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

  const [filters, setFilters] = useState(null);
  const [aiUnderstood, setAiUnderstood] = useState(true);

  const filteredProducts = useMemo(() => {
    if (!filters) return products;

    const query = filters.query?.toLowerCase();

    return products.filter((product) => {
      const title = product.title.toLowerCase();
      const category = product.category.toLowerCase();
      const price = Number(product.price);

      const matchQuery =
        !query || title.includes(query) || category.includes(query);

      const matchPrice =
        filters.maxPrice == null || price <= filters.maxPrice;

      return matchQuery && matchPrice;
    });
  }, [products, filters]);

  const applyAIFilter = async (text) => {
    if (!text.trim() || text.trim().length < 3) {
      setFilters(null);
      setAiUnderstood(true);
      return;
    }

    try {
      const res = await fetch("/api/ai-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!data.filters) {
        setAiUnderstood(false);
        setFilters(null);
        return;
      }

      setAiUnderstood(true);
      setFilters(data.filters);
    } catch (err) {
      console.error(err);
      setAiUnderstood(false);
      setFilters(null);
    }
  };

  if (isLoading) return <p>Loading products…</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <>
      <AIFilterBar onApply={applyAIFilter} />

      {!aiUnderstood && (
        <p className="text-sm mt-4 rounded-md text-black-500">
          We couldn’t understand your search. Try something like
          "furniture under 3000".
        </p>
      )}

      {filters && filteredProducts.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">
          No products match your search.
        </p>
      )}

      <ProductsList products={filteredProducts} />
    </>
  );
}
