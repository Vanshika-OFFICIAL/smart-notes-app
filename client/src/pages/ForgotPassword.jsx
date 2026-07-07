import { useState } from "react";
import { forgotPassword } from "../services/api";
import AuthCard from "../components/auth/AuthCard";
import Background from "../components/layout/Background";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleSubmit = async () => {
try {
setLoading(true);
setError("");
setSuccess("");

  await forgotPassword(email);

  setSuccess(
    "Password reset link sent successfully. Please check your email."
  );
} catch (err) {
  setError(
    err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="smart-bg relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
<Background />

  <AuthCard>
    <div className="mb-4 flex items-center justify-center gap-2 sm:mb-5 sm:gap-2.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 text-lg shadow-md sm:h-12 sm:w-12 sm:text-xl">
        ✨
      </div>

      <h2 className="font-['Fraunces',serif] text-[1.375rem] font-bold text-[#2A1F0D] sm:text-[1.45rem]">
        Smart Notes
      </h2>
    </div>

    <h1 className="mb-1.5 font-['Fraunces',serif] text-[clamp(1.75rem,5.5vw,2.125rem)] leading-tight text-[#2A1F0D]">
      Forgot <span className="text-orange-500 italic">password</span>
    </h1>

    <p className="mb-6 text-sm text-[#6B5B3E] sm:text-[15px]">
      We’ll send you a reset link
    </p>

    {success && (
      <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        {success}
      </div>
    )}

    {error && (
      <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mb-4 w-full rounded-[14px] border border-[rgba(246,195,71,0.3)] bg-white/90 px-4 py-3.5 text-base text-[#2A1F0D] outline-none transition focus:border-[rgba(244,132,95,0.45)] focus:ring-2 focus:ring-[rgba(244,132,95,0.18)] sm:py-4"
    />

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-yellow-400 to-orange-500 px-4 py-3 text-[0.9375rem] font-medium text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
    >
      {loading ? "Sending..." : "Send reset link →"}
    </button>

    <p className="mt-5 text-center text-sm text-[#6B5B3E]">
      <span>Remember your password?</span>{" "}
      <Link
        to="/"
        className="font-medium text-[#F4845F] transition hover:underline"
      >
        Back to login →
      </Link>
    </p>
  </AuthCard>
</div>

);
}