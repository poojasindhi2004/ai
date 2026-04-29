"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Loader2 } from "lucide-react";
import { clearAuthToken } from "../services/api.services";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const accessToken =
        typeof window !== "undefined"
          ? window.sessionStorage.getItem("auth_access_token")
          : "";

      const res = await fetch("https://test-q6ja.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: "include", // important if backend uses session/cookie
        body: JSON.stringify({
          name: name.trim(),
        }),
        
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      clearAuthToken();
      router.push("/");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />

      <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
            <User className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            Complete your profile
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">
            Finish setting up your account to continue.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-white focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)]"
            />
          </div>

          {message ? (
            <p className="mt-4 text-center text-sm text-red-300">{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 font-medium text-black transition-all duration-200 hover:scale-[1.01] hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
