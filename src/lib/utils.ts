export { cn } from "cn"



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

export function toAbsoluteMediaUrl(url?: string | null): string | null {
  if (!url) return null
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url
  }
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`
}