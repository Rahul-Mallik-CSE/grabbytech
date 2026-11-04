import { baseApi } from "@/redux/api/baseAPI";
import { Product, ProductApiVariant, ProductColor } from "@/types/AllTypes";
import { toAbsoluteMediaUrl } from "@/lib/utils";

interface ApiImage {
  id?: number;
  image?: string | null;
  alt_text?: string;
  is_primary?: boolean;
  order?: number;
}

interface ApiColor {
  id: number;
  name: string;
  hex_code: string;
  image: string | null;
  price_adjustment: string;
  final_price: number;
  quantity: number;
  is_active: boolean;
  order: number;
}

export interface ApiProduct {
  id: string;
  sku: string | null;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  category_slug?: string | null;
  subcategory: number | null;
  subcategory_name: string | null;
  subcategory_slug?: string | null;
  brand: number | null;
  brand_name: string | null;
  brand_slug?: string | null;
  short_description: string;
  description?: string;
  base_price: string;
  sale_price: string | null;
  current_price: number;
  discount_percentage: number;
  delivery_mode: string;
  delivery_fee: number | null;
  dhaka_fee: number | null;
  delivery_summary?: Product["deliverySummary"];
  quantity: number;
  low_stock_threshold?: number;
  is_in_stock: boolean;
  is_low_stock?: boolean;
  status: string;
  is_featured: boolean;
  is_active?: boolean;
  warranty?: string;
  weight?: string;
  primary_image?: string | null;
  feature_image?: string | null;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  images?: ApiImage[];
  videos?: unknown[];
  colors?: ApiColor[];
  variants?: ProductApiVariant[];
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at?: string;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProduct[];
  total_pages: number;
  current_page: number;
}

export interface ProductListParams {
  page?: number;
  page_size?: number;
  search?: string;
  category_slug?: string;
  subcategory_slug?: string;
  brand_slug?: string;
  min_price?: number | string;
  max_price?: number | string;
  in_stock?: boolean;
  ordering?: string;
}

function mediaUrl(url?: string | null): string {
  return toAbsoluteMediaUrl(url) ?? "/grabbytechLogo.jpg";
}

export function normalizeProduct(product: ApiProduct): Product {
  const images = (product.images ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((image) => ({
      url: mediaUrl(image.image),
      alt: image.alt_text || product.name,
    }));
  const primaryImage = mediaUrl(product.feature_image ?? product.primary_image);

  if (!images.length) {
    images.push({ url: primaryImage, alt: product.name });
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category_name as Product["category"],
    brand: product.brand_name ?? "",
    description: product.description ?? product.short_description,
    descriptionHtml: product.description,
    shortDescription: product.short_description,
    images,
    price: product.current_price,
    originalPrice: Number(product.base_price),
    rating: product.average_rating,
    reviewCount: product.review_count,
    stock: product.quantity,
    badge: product.discount_percentage > 0 ? "Sale" : undefined,
    features: [],
    categorySlug: product.category_slug,
    subcategory: product.subcategory_name,
    subcategoryName: product.subcategory_name,
    subcategorySlug: product.subcategory_slug,
    brandSlug: product.brand_slug,
    deliveryMode: product.delivery_mode,
    deliveryFee: product.delivery_fee,
    dhakaFee: product.dhaka_fee,
    deliverySummary: product.delivery_summary,
    lowStockThreshold: product.low_stock_threshold,
    isLowStock: product.is_low_stock,
    isActive: product.is_active,
    warranty: product.warranty,
    weight: product.weight,
    tags: product.tags,
    colors: (product.colors ?? []).map(
      (color): ProductColor => ({
        id: color.id,
        name: color.name,
        hexCode: color.hex_code,
        image: color.image ? mediaUrl(color.image) : null,
        priceAdjustment: color.price_adjustment,
        finalPrice: color.final_price,
        quantity: color.quantity,
        isActive: color.is_active,
        order: color.order,
      })
    ),
    variants: product.variants,
    updatedAt: product.updated_at,
  };
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; count: number; totalPages: number; currentPage: number },
      ProductListParams | void
    >({
      query: (params) => {
        const queryParams = params ?? {};
        return {
        url: "/products/",
        params: {
          page: 1,
          page_size: 20,
          ...queryParams,
          in_stock:
            typeof queryParams.in_stock === "boolean"
              ? String(queryParams.in_stock)
              : undefined,
        },
        };
      },
      transformResponse: (response: ProductListResponse) => ({
        products: response.results.map(normalizeProduct),
        count: response.count,
        totalPages: response.total_pages,
        currentPage: response.current_page,
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${encodeURIComponent(id)}/`,
      transformResponse: (response: ApiProduct) => normalizeProduct(response),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
