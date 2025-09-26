// src/features/auth/api.ts
export interface LoginResponse {
  token: string;
  user: {
    id?: string;
    email: string;
    role?: string;
  };
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // ambil pesan error dari body kalau ada
    let msg = `Login failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

export interface RegisterResponse {
  id: string;
  email: string;
  role?: string;
}

export async function registerRequest(email: string, password: string): Promise<RegisterResponse> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let msg = `Register failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
