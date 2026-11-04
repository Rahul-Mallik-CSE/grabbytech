import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug: id } = await params;
  return <ProductDetailClient id={id} />;
}
