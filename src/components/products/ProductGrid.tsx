import { Product } from "@/types/AllTypes";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No products found.</p>
        <p className="text-gray-300 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div
      className={
        className ??
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

