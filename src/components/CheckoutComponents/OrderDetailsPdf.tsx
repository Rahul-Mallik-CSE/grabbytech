"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
  usePDF,
} from "@react-pdf/renderer";
import { FiDownload } from "react-icons/fi";
import type {
  GuestOrderItem,
  GuestOrderResponse,
} from "@/redux/features/checkout/checkoutAPI";
import type { CheckoutFormData } from "@/types/AllTypes";

export interface OrderPdfData {
  response: GuestOrderResponse;
  customer: CheckoutFormData;
  items: GuestOrderItem[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    color: "#172033",
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    paddingBottom: 18,
    borderBottom: "2px solid #fd6603",
    marginBottom: 22,
  },
  brand: {
    color: "#fd6603",
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
  },
  title: {
    marginTop: 6,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  muted: {
    color: "#667085",
    marginTop: 4,
  },
  section: {
    marginBottom: 18,
    padding: 14,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 9,
    color: "#fd6603",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#667085",
  },
  value: {
    maxWidth: "65%",
    textAlign: "right",
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 7,
    borderBottom: "1px solid #d1d5db",
    fontFamily: "Helvetica-Bold",
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: 9,
    borderBottom: "1px solid #edf0f2",
  },
  product: { flex: 1, paddingRight: 8 },
  quantity: { width: 45, textAlign: "center" },
  price: { width: 80, textAlign: "right" },
  total: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid #d1d5db",
  },
  grandTotal: {
    color: "#fd6603",
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
  },
  footer: {
    marginTop: 20,
    color: "#667085",
    textAlign: "center",
    fontSize: 9,
  },
});

function money(value: string | number) {
  return `Tk ${Number(value).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function OrderDocument({ data }: { data: OrderPdfData }) {
  const { response, customer, items } = data;
  const total = Number(response.subtotal) + Number(response.shipping_cost) - Number(response.discount);

  return (
    <Document title={`Order ${response.order_number}`} author="GrabbyTech">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>GrabbyTech</Text>
          <Text style={styles.title}>Order Confirmation</Text>
          <Text style={styles.muted}>Order {response.order_number}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUSTOMER & DELIVERY DETAILS</Text>
          <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.value}>{customer.fullName}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Phone</Text><Text style={styles.value}>{customer.phone}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{response.guest_email || customer.email || "N/A"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Address</Text><Text style={styles.value}>{customer.address}, {customer.city}, {customer.district}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Postal code</Text><Text style={styles.value}>{customer.postalCode || "N/A"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Payment</Text><Text style={styles.value}>Cash on Delivery</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDERED PRODUCTS</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.product}>Product</Text>
            <Text style={styles.quantity}>Qty</Text>
            <Text style={styles.price}>Total</Text>
          </View>
          {items.map((item) => (
            <View style={styles.itemRow} key={item.product_id}>
              <Text style={styles.product}>{item.name}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.price}>{money(item.total_price)}</Text>
            </View>
          ))}
          <View style={styles.total}>
            <View style={styles.row}><Text style={styles.label}>Subtotal</Text><Text>{money(response.subtotal)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Shipping</Text><Text>{money(response.shipping_cost)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Discount</Text><Text>{money(response.discount)}</Text></View>
            <View style={styles.row}><Text style={styles.grandTotal}>Total payable</Text><Text style={styles.grandTotal}>{money(total)}</Text></View>
          </View>
        </View>

        <Text style={styles.footer}>Thank you for shopping with GrabbyTech. Please keep this receipt for your records.</Text>
      </Page>
    </Document>
  );
}

function fileName(orderNumber: string) {
  return `grabbytech-order-${orderNumber}.pdf`;
}

export default function OrderDetailsPdf({ data }: { data: OrderPdfData }) {
  const document = useMemo(() => <OrderDocument data={data} />, [data]);
  const [instance] = usePDF({ document });
  const downloadedOrder = useRef<string | null>(null);

  useEffect(() => {
    if (!instance.url || downloadedOrder.current === data.response.order_number) return;
    downloadedOrder.current = data.response.order_number;
    const link = window.document.createElement("a");
    link.href = instance.url;
    link.download = fileName(data.response.order_number);
    link.click();
  }, [data.response.order_number, instance.url]);

  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName(data.response.order_number)}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 transition-all hover:border-[#FD6603] hover:text-[#FD6603]"
    >
      {({ loading }) => (
        <>
          <FiDownload size={16} />
          {loading ? "Preparing PDF..." : "Download Order PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
}
