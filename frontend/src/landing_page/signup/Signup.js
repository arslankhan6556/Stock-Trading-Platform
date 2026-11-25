import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const endpoint = isLogin
        ? "http://localhost:3002/login"
        : "http://localhost:3002/signup";

      const payload = isLogin
        ? { email, password }
        : { username, email, password };

      const res = await axios.post(endpoint, payload);
      const user = res.data?.user || {};
      const finalUsername = user.username || username || "User";
      const finalEmail = user.email || email || "";

      setMessage(
        res.data?.message || (isLogin ? "Login successful" : "Account created"),
      );

      setTimeout(() => {
        window.location.href = `http://localhost:3001?username=${encodeURIComponent(
          finalUsername,
        )}&email=${encodeURIComponent(finalEmail)}`;
      }, 600);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "28px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "4px", fontWeight: 600 }}>
          {isLogin ? "Login" : "Signup"}
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          {isLogin
            ? "Enter your credentials to access your account"
            : "Enter your details to create a new account"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 16px",
              backgroundColor: "#387ed1",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {message && (
          <p
            style={{ color: "#15803d", marginTop: "12px", textAlign: "center" }}
          >
            {message}
          </p>
        )}
        {error && (
          <p
            style={{ color: "#b91c1c", marginTop: "12px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <p
          style={{
            marginTop: "16px",
            marginBottom: 0,
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin((prev) => !prev);
              setError("");
              setMessage("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#387ed1",
              fontWeight: 500,
              cursor: "pointer",
              padding: 0,
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
