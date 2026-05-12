import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

import Background from "../components/layout/Background";
import AuthCard from "../components/auth/AuthCard";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);

      await resetPassword(token, password);

      alert("Password reset successful");

      navigate("/");

    } catch (err) {
      alert("Invalid or expired token");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="smart-bg flex items-center justify-center min-h-screen relative">
      <Background />

      <AuthCard>

        <h1
          style={{
            fontSize: "34px",
            marginBottom: "10px",
            color: "#2A1F0D",
          }}
        >
          Reset Password
        </h1>

        <p
          style={{
            marginBottom: "24px",
            color: "#6B5B3E",
          }}
        >
          Enter your new password
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            marginBottom: "16px",
          }}
        />

        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg,#F6C347,#F4845F)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Updating..."
            : "Reset Password →"}
        </button>

      </AuthCard>
    </div>
  );
}