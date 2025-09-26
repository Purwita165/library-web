// src/features/auth/api.ts

// ---- Login ----
export interface LoginResponse {
  token: string;
  user: {
    id?: string;
    name?: string;
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
    let msg = `Login failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

// ---- Register ----
export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export async function registerRequest(name: string, email: string, password: string): Promise<RegisterResponse> {
  const base = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
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
