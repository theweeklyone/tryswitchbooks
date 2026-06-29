import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  const rawNext = searchParams.next ?? "";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard/leads";
  return (
    <div className="min-h-screen bg-cream-100">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 py-10 sm:px-8">
        <Logo size="md" />
        <p className="eyebrow mt-8">Switch Books</p>
        <h1 className="mt-3 font-serif text-3xl text-cocoa-300">
          Internal sign-in
        </h1>
        <p className="mt-2 text-center text-sm text-cocoa-50">
          Private dashboard. Business owners start with the free review.
        </p>
        <div className="mt-8 w-full">
          <SignInForm next={next} error={searchParams.error} />
        </div>
      </main>
    </div>
  );
}
