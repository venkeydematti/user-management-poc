"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Link from 'next/link';

const queryClient = new QueryClient();

const url = "https://dummyjson.com/products";

const fetchProducts = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

// Child component that uses the query (must be inside QueryClientProvider)
function ProductsList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000, // 1 minute
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <div key={product.id}>
          <img
            alt={product.title}
            src={product.thumbnail}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <div className="flex flex-wrap text-center justify-between">
            <div className="text-center justify-center">
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" />
                <Link href={"/products/product-details"}>
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">Rs.{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Parent component that provides the QueryClient
export default function ProductsQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Fetching data using Tanstack Query (React Query)
          </h2>
          <ProductsList />
        </div>
      </div>
    </QueryClientProvider>
  );
}