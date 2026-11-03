import ProductsSection from "@/components/HomeComponents/ProductsSection";
import FeaturedSection from "@/components/HomeComponents/FeaturedSection";
import CustomerReviewSection from "@/components/HomeComponents/CustomerReviewSection";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Products section right after nav */}
      <ProductsSection />
      {/* Extra static section */}
      <FeaturedSection />
      {/* Customer review section */}
      <CustomerReviewSection />
    </div>
  );
}
