const API = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN_KEY = "auth_access_token";

const getStoredAuthToken = () => {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY) || "";
};

const extractAccessToken = (payload) => {
  if (!payload || typeof payload !== "object") return "";

  return (
    payload.accessToken ||
    payload.token ||
    payload.tempToken ||
    payload.jwt ||
    payload?.data?.accessToken ||
    payload?.data?.token ||
    payload?.data?.tempToken ||
    payload?.data?.jwt ||
    payload?.session?.accessToken ||
    payload?.session?.token ||
    payload?.result?.accessToken ||
    payload?.result?.token ||
    ""
  );
};

const storeAuthToken = (token) => {
  if (typeof window === "undefined" || !token) return;
  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

const createAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const accessToken = getStoredAuthToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    headers["X-Access-Token"] = accessToken;
  }

  return headers;
};

export const sendOtp = async (email) => {
  if (!API) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const res = await fetch(`${API}/api/auth/send-otp`, {
    method: "POST",
    headers: createAuthHeaders(),
    credentials: "include",
    body: JSON.stringify({ email: email.trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "OTP send failed.");
  }

  storeAuthToken(extractAccessToken(data));

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
    headers: createAuthHeaders(),
    credentials: "include",
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

  storeAuthToken(extractAccessToken(data));

  return data;
};
