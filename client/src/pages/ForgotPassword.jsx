import { useState } from "react";
import { forgotPassword } from "../services/api";
import AuthCard from "../components/auth/AuthCard";
import Background from "../components/layout/Background";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await forgotPassword(email);
      alert("Reset link sent");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="smart-bg flex items-center justify-center min-h-screen relative">
      <Background />

      <AuthCard>
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-md">
            ✨
          </div>
          <h2 className="font-bold text-lg">Smart Notes</h2>
        </div>

        {/* HEADING */}
        <h1 className="text-2xl font-semibold mb-1">
          Forgot <span className="text-orange-500 italic">password</span>
        </h1>

        <p className="text-gray-500 text-sm mb-5">
          We’ll send you a reset link
        </p>

        {/* INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 mb-4"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-[1.02] transition"
        >
          {loading ? "Sending..." : "Send reset link →"}
        </button>
        <p className="text-center text-sm mt-4">
          <span className="text-gray-500">Remember your password?</span>{" "}
          <Link
            to="/"
            className="text-orange-500 font-semibold hover:tracking-wide transition-all duration-300"
          >
            Back to login →
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
