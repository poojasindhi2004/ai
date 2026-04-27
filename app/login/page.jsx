"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    router.push("/verify-email");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-black">
            AI
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Continue with your email to access MY AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Email Address
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4 focus-within:border-white/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent py-4 text-white placeholder:text-white/30 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!email.trim()}
            className="w-full rounded-2xl bg-white py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-white/40">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}