"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Loader2 } from "lucide-react";
import { sendOtp, verifyOtp } from "../services/api.services";

const OTP_LENGTH = 8;
const EMPTY_OTP = Array(OTP_LENGTH).fill("");

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(EMPTY_OTP);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) router.replace("/login");
  }, [email, router]);

  const otpValue = otp.join("");

  const handleChange = (index, value) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextValue;
    setOtp(nextOtp);
    setMessage("");

    if (nextValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOtp(nextOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedDigits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedDigits) return;

    const nextOtp = [...EMPTY_OTP];
    pastedDigits.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    setMessage("");

    const focusIndex = Math.min(pastedDigits.length, OTP_LENGTH) - 1;
    inputRefs.current[Math.max(focusIndex, 0)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || otpValue.length !== OTP_LENGTH || loading) return;

    try {
      setLoading(true);
      setMessage("");

      await verifyOtp(email, otpValue);
      router.push("/");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to verify code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resending) return;

    try {
      setResending(true);
      setMessage("");
      setOtp([...EMPTY_OTP]);

      await sendOtp(email);

      setMessage("A new verification code was sent to your email.");
      inputRefs.current[0]?.focus();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to resend code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />

      <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
            <Mail className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            Check your email
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">
            {email ? (
              <>
                We sent an 8-digit verification code to{" "}
                <span className="font-medium text-white">{email}</span>
              </>
            ) : (
              "We sent you a verification code. Please check your inbox and continue."
            )}
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8">
          <div
            className="grid grid-cols-4 gap-3 sm:grid-cols-8"
            onPaste={handlePaste}
          >
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
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] text-center text-xl font-semibold text-white outline-none transition-all duration-200 focus:border-white focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)]"
              />
            ))}
          </div>

          {message ? (
            <p className="mt-4 text-center text-sm text-white/65">{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={otpValue.length !== OTP_LENGTH || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 font-medium text-black transition-all duration-200 hover:scale-[1.01] hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-5 w-full text-sm font-medium text-white/70 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resending ? "Sending new code..." : "Resend Code"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-3 w-full text-sm text-white/40 transition hover:text-white/70"
        >
          Back to login
        </button>
      </div>
    </main>
  );
}

function VerifyEmailFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 text-white">
      <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
        <h1 className="text-center text-2xl font-semibold">
          Loading verification screen...
        </h1>
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
