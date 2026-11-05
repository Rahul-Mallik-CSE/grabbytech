import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-black px-6 py-20 text-white">
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#FD6603]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-[#FD6603]/10 blur-3xl" />
      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-[#FD6603]/20">
          <Image
            src="/grabbytechicon.jpg"
            alt="GrabbyTech"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-7xl font-black tracking-tighter text-[#FD6603] sm:text-9xl">404</p>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-white/45">
          Page not found
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/55 sm:text-base">
          The page you are looking for does not exist or may have moved. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FD6603] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#FD6603]/20 transition-colors hover:bg-[#e55b03]"
          >
            <FiHome size={17} />
            Back to Home
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <FiSearch size={17} />
            Browse Products
          </Link>
        </div>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white/45 transition-colors hover:text-white">
          <FiArrowLeft size={14} />
          Return to safety
        </Link>
      </div>
    </main>
  );
}