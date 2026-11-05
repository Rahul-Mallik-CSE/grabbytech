"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-black px-6 py-20 text-white">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />
      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-[#FD6603]/30 bg-[#FD6603]/10 shadow-2xl shadow-[#FD6603]/10">
          <Image
            src="/grabbytechicon.jpg"
            alt="GrabbyTech"
            width={96}
            height={96}
            className="h-full w-full object-cover opacity-90"
          />
        </div>
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#FD6603]/25 bg-[#FD6603]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FD6603]">
          <FiAlertTriangle size={15} />
          Temporary issue
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/55 sm:text-base">
          We couldn&apos;t load this page right now. Try again, or head back home while we get things sorted.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FD6603] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#FD6603]/20 transition-colors hover:bg-[#e55b03]"
          >
            <FiRefreshCw size={17} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <FiHome size={17} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}