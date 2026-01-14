import Link from "next/link";

export default function ProductsList({ products }) {
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
