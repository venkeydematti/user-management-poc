"use client";

import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchProducts } from "../lib/api/fetchProducts";

// Lazy loading the components
const AIFilterBar = dynamic(
  () => import("../components/AIFilterBar"),
  { ssr: false }
);
const ProductsList = dynamic(
  () => import("../components/ProductsList"),
  { ssr: false }
);


export default function ProductsPageContent() {
  const { 
    data: products = [], 
    isLoading, 
    error, 
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

  // AI filter state (UI state)
  const [filters, setFilters] = useState(null);
  const [aiUnderstood, setAiUnderstood] = useState(true);

  // Debounce the AI filter input
  const debounceRef = useRef(null);
  const lastQueryRef = useRef("");


  //For filtering the products based on the filters
  const filteredProducts = useMemo(() => {
    if (!filters) return products;

    //Get the query and the max price from the filters ( AI filter response )
    const query = filters.query?.toLowerCase();

    //Filter the products based on the query and the max price
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



  //For applying the AI filter API call
  const applyAIFilter = async (text) => {
    const cleanedText = text.trim();
    if (!cleanedText || cleanedText.length < 3) {
      setFilters(null);
      setAiUnderstood(true);
      lastQueryRef.current = "";
      console.log("Cleaned text is too short");
      return;
    }


    // Prevent same query API calls
    if (cleanedText === lastQueryRef.current) return;
    lastQueryRef.current = cleanedText;

    try {
      const res = await fetch("/api/ai-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanedText }),
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

  // Debounce wrapper
  const debouncedApplyAIFilter = (text) => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      applyAIFilter(text);
    }, 400);
  };


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );

  if (error) 
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load products</p>
      </div>
    );

  return (
    <>
      <AIFilterBar onApply={debouncedApplyAIFilter} />

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
