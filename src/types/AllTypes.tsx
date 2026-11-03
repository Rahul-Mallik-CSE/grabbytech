// ============================================================
// AllTypes.tsx — Central type definitions for GrabbyTech
// ============================================================

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export type ProductCategory =
  | "Electrical Equipment & Supplies"
  | "Exercise & Gymnastic Tools"
  | "Gadget & Accessories"
  | "Health & Medial"
  | "Home Appliances"
  | "Home & Garden"
  | "Safety & Security";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number; // 0 = sold out
  badge?: "Sale" | "New" | "Hot" | "Sold Out";
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface FilterState {
  category: ProductCategory | "All";
  inStockOnly: boolean;
  brand: string | "All";
  minPrice: number | "";
  maxPrice: number | "";
  sortBy: SortOption;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  notes: string;
}

export type CheckoutStep = "cart" | "address" | "payment";

export interface NavLink {
  label: string;
  href: string;
}

//customer review type
export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}