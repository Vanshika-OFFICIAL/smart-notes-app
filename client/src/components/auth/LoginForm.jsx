import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { setToken } from "../../utils/auth";
import Input from "../ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await loginUser({ email, password });

      setToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "linear-gradient(135deg,#F6C347,#F4845F)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ✦
        </div>

        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "22px",
            fontWeight: "700",
            color: "#2A1F0D",
          }}
        >
          Smart Notes
        </h2>
      </div>

      {/* TITLE */}
      <h1
        style={{
          fontFamily: "Fraunces, serif",
          fontSize: "34px",
          color: "#2A1F0D",
          marginBottom: "6px",
        }}
      >
        Welcome{" "}
        <span
          style={{
            color: "#F4845F",
            fontStyle: "italic",
          }}
        >
          back
        </span>
      </h1>

      <p
        style={{
          color: "#6B5B3E",
          marginBottom: "26px",
          fontSize: "15px",
        }}
      >
        Your thoughts are waiting for you
      </p>

      {/* EMAIL */}
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <div style={{ position: "relative" }}>
        <Input
          label="Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 👁 Eye Icon */}
        <span
          onClick={() => setShow(!show)}
          style={{
            position: "absolute",
            right: "14px",
            top: "38px",
            cursor: "pointer",
            color: "#6B5B3E",
          }}
        >
          {show ? "🙈" : "👁"}
        </span>
      </div>

      {/* FORGOT PASSWORD */}
      <div
        style={{
          textAlign: "right",
          fontSize: "13px",
          marginBottom: "12px",
        }}
      >
        <span
          onClick={() => navigate("/forgot-password")}
          style={{ color: "#F4845F", cursor: "pointer" }}
        >
          Forgot password?
        </span>
      </div>

      {/* ERROR */}
      {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

      {/* BUTTON */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          background: "linear-gradient(135deg,#F6C347,#F4845F)",
          color: "white",
          border: "none",
          marginTop: "10px",
          fontWeight: "500",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        Sign in →
      </button>
      
      {/* REGISTER LINK */}
      <p
        style={{
          marginTop: "22px",
          fontSize: "14px",
          color: "#6B5B3E",
        }}
      >
        Don’t have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#F4845F",
            fontWeight: "500",
          }}
        >
          Create one free
        </Link>
      </p>
    </div>
  );
}
