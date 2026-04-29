const API = process.env.NEXT_PUBLIC_API_URL;

export const sendOtp = async (email) => {
  if (!API) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const res = await fetch(`${API}/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "OTP send failed.");
  }

  return data;
};
export const verifyOtp = async (email, otp) => {
  if (!API) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const trimmedEmail = email.trim();
  const normalizedToken = otp.replace(/\D/g, "").slice(0, 8);

  if (!trimmedEmail) {
    throw new Error("Email is required.");
  }

  if (normalizedToken.length !== 8) {
    throw new Error("Please enter a valid 8-digit OTP.");
  }

  const res = await fetch(`${API}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: trimmedEmail,
      token: normalizedToken,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.message || data.error || `OTP verification failed (${res.status}).`
    );
  }

  return data;
};
