import { baseApi } from "@/redux/api/baseAPI";

export interface GuestOrderItem {
  product_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface GuestOrderPayload {
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  guest_shipping: {
    full_name: string;
    phone: string;
    division: string;
    district: string;
    upazila: string;
    address_line: string;
    postal_code: string;
  };
  payment_method: number;
  items: GuestOrderItem[];
}

export interface GuestOrderResponse {
  id: string;
  order_id?: string;
  order_number: string;
  subtotal: string;
  shipping_cost: string;
  discount: string;
  coupon_code: string;
  notes: string;
  guest_email: string;
}

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeGuestOrder: builder.mutation<GuestOrderResponse, GuestOrderPayload>({
      query: (body) => ({
        url: "/guest/orders/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePlaceGuestOrderMutation } = checkoutApi;
