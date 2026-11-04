"use client";

import { useGetProductQuery } from "@/redux/features/products/productsAPI";
import ProductDetailView from "@/components/ProductsComponents/ProductDetailView";
import ProductDetailSkeleton from "@/components/ProductsComponents/ProductDetailSkeleton";

export default function ProductDetailClient({ id }: { id: string }) {
  const { data: product, isLoading, isError } = useGetProductQuery(id);

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product) return <div className="min-h-screen flex items-center justify-center text-red-500">Unable to load this product.</div>;
  return <ProductDetailView product={product} />;
}
