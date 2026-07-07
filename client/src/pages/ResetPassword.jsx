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
    <div className="smart-bg relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <Background />

      <AuthCard>
        <h1 className="mb-2 font-['Fraunces',serif] text-[clamp(1.85rem,5.8vw,2.125rem)] leading-tight text-[#2A1F0D]">
          Reset Password
        </h1>

        <p className="mb-6 text-sm text-[#6B5B3E] sm:text-[15px]">
          Enter your new password
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-4 w-full rounded-[14px] border border-[rgba(246,195,71,0.3)] bg-white/90 px-4 py-3.5 text-base text-[#2A1F0D] outline-none transition focus:border-[rgba(244,132,95,0.45)] focus:ring-2 focus:ring-[rgba(244,132,95,0.18)] sm:py-4"
        />

        <button
          onClick={handleReset}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] px-4 py-3 text-[0.9375rem] font-semibold text-white transition active:scale-[0.99]"
        >
          {loading
            ? "Updating..."
            : "Reset Password →"}
        </button>

      </AuthCard>
    </div>
  );
}