import { notFound } from "next/navigation";
import { products } from "@/data/productsdata";
import ProductDetailView from "@/components/ProductsComponents/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
