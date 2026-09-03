"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (loginError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      setError("You are not authorized to access the admin panel.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f5f7f7",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "30px",
          border: "1px solid #e5eaea",
          borderRadius: "20px",
          background: "#ffffff",
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#667781",
            }}
          >
            WhatsApp Groups
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              lineHeight: 1.2,
              color: "#111b21",
            }}
          >
            Admin Login
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#667781",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Sign in to manage group submissions.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            htmlFor="admin-email"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#111b21",
            }}
          >
            Email
          </label>

          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "16px",
              border: "1px solid #d9e1e1",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <label
            htmlFor="admin-password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#111b21",
            }}
          >
            Password
          </label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "18px",
              border: "1px solid #d9e1e1",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          {error && (
            <div
              role="alert"
              style={{
                marginBottom: "16px",
                padding: "11px 13px",
                borderRadius: "10px",
                background: "#fff4f4",
                color: "#b42318",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: 0,
              borderRadius: "12px",
              background: "#111b21",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}