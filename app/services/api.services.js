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

  const res = await fetch(`${API}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      otp: otp.trim(),
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "OTP verification failed.");
  }

  return data;
};
