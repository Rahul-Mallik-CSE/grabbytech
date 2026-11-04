"use client";

import { useGetProductQuery } from "@/redux/features/products/productsAPI";
import ProductDetailView from "@/components/ProductsComponents/ProductDetailView";

export default function ProductDetailClient({ id }: { id: string }) {
  const { data: product, isLoading, isError } = useGetProductQuery(id);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  if (isError || !product) return <div className="min-h-screen flex items-center justify-center text-red-500">Unable to load this product.</div>;
  return <ProductDetailView product={product} />;
}
