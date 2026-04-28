"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendOtp, verifyOtp } from "../services/api.services";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  const otpValue = otp.join("");

  const handleChange = (index, value) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextValue;
    setOtp(nextOtp);
    setMessage("");

    if (nextValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedDigits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);

    if (!pastedDigits) return;

    const nextOtp = ["", "", "", ""];
    pastedDigits.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    setMessage("");

    const focusIndex = Math.min(pastedDigits.length, 4) - 1;
    inputRefs.current[Math.max(focusIndex, 0)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || otpValue.length !== 4 || loading) return;

    try {
      setLoading(true);
      setMessage("");
      await verifyOtp(email, otpValue);
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to verify OTP.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resending) return;

    try {
      setResending(true);
      setMessage("");
      setOtp(["", "", "", ""]);
      await sendOtp(email);
      setMessage("A new OTP was sent to your email.");
      inputRefs.current[0]?.focus();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to resend OTP.";
      setMessage(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Check your email</h1>

        <p className="mt-4 text-sm leading-6 text-white/70">
          {email
            ? `We sent a 4-digit OTP to ${email}. Enter it below to continue.`
            : "We sent you an OTP. Please check your inbox and continue with verification."}
        </p>

        <form onSubmit={handleVerify} className="mt-8">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-14 w-14 rounded-2xl border border-white/10 bg-black/30 text-center text-xl font-semibold text-white outline-none transition focus:border-white/30"
              />
            ))}
          </div>

          {message ? (
            <p className="mt-4 text-center text-sm text-white/70">{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={otpValue.length !== 4 || loading}
            className="mt-6 w-full rounded-2xl bg-white py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-4 w-full text-sm text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resending ? "Sending new OTP..." : "Resend OTP"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 w-full text-sm text-white/50 transition hover:text-white"
        >
          Back to login
        </button>
      </div>
    </main>
  );
}

function VerifyEmailFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Loading OTP screen...</h1>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
