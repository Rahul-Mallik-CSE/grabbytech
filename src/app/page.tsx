import ProductsSection from "@/components/home/ProductsSection";
import FeaturedSection from "@/components/home/FeaturedSection";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Products section right after nav */}
      <ProductsSection />
      {/* Extra static section */}
      <FeaturedSection />
    </div>
  );
}
