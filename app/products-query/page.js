"use client";

import { useState, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import AIFilterBar from "../components/AIFilterBar";

const queryClient = new QueryClient();

const url = "https://dummyjson.com/products";

const fetchProducts = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};

function ProductsList({ products }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <div key={product.id} className="relative group">
          <img
            alt={product.title}
            src={product.thumbnail}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:h-80"
          />
          <div className="flex justify-between mt-2">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link href="/products/product-details">
                  {product.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              Rs.{product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsPageContent() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
  });

  const [filters, setFilters] = useState(null);
  console.log("Filters:", filters);
  console.log("Products:", products);


  // Filter the products based on the filters
  const filteredProducts = useMemo(() => {
    if (!filters) return products;
    // Get the query from the filters
    const query = filters.query?.toLowerCase();
    
    // Filter the products based on the query
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

  // Function to apply the AI filter  
  const applyAIFilter = async (text) => {
    try {
        // Fetch the AI filter from the API
        const res = await fetch("/api/ai-filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        const data = await res.json();
        // Set the filters in the state
        setFilters(data.filters);
    } catch (error) {
        console.error("Error applying AI filter:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <AIFilterBar onApply={applyAIFilter} />
      <ProductsList products={filteredProducts} />
    </>
  );
}

export default function ProductsQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI-Powered Product Filtering
          </h2>
          <ProductsPageContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}
