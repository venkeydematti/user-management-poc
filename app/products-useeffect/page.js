"use client";
import { useState, useEffect } from "react";

export default function TestPage() {

    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const url = "https://dummyjson.com/products";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url)
                const data = await res.json();
                setProducts(data.products);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
         };
        fetchData();
    }, []);

    if(isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    if(error) {
        return <div className="flex justify-center items-center h-screen">
            <p className="text-red-500">{error}</p>
        </div>;
    }


    const handleSearch = (e) => {
      e.preventDefault();
      const searchTerm = e.target.value;
      console.log(searchTerm);
      const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setProducts(filteredProducts);
    }
    return (
        <div className="bg-white">
         
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <input type="text" placeholder="Search" className="w-full p-2 border border-gray-300 rounded-md mb-4" onChange={handleSearch} />
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <img
                alt={product.title}
                src={product.thumbnail}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="flex flex-wrap text-center justify-between">
                <div className="text-center justify-center">
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">Rs.{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}   