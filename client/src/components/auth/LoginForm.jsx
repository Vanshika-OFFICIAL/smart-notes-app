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
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center gap-2 sm:mb-5 sm:gap-2.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] text-lg font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl">
          ✦
        </div>

        <h2 className="font-['Fraunces',serif] text-[1.375rem] font-bold text-[#2A1F0D] sm:text-[1.45rem]">
          Smart Notes
        </h2>
      </div>

      <h1 className="mb-1.5 font-['Fraunces',serif] text-[clamp(1.9rem,6vw,2.125rem)] leading-tight text-[#2A1F0D]">
        Welcome{" "}
        <span className="italic text-[#F4845F]">
          back
        </span>
      </h1>

      <p className="mb-6 text-sm text-[#6B5B3E] sm:text-[15px]">
        Your thoughts are waiting for you
      </p>

      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        trailingElement={
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="rounded-full p-1 text-sm leading-none text-[#6B5B3E] transition hover:text-[#F4845F] focus:outline-none focus:ring-2 focus:ring-[rgba(244,132,95,0.2)]"
          >
            {show ? "🙈" : "👁"}
          </button>
        }
      />

      {/* <div className="mb-3 text-right text-[0.8125rem] sm:text-sm">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="cursor-pointer text-[#F4845F] transition hover:underline"
        >
          Forgot password?
        </button>
      </div> */}

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] px-4 py-3 text-[0.9375rem] font-medium text-white transition active:scale-[0.99]"
      >
        Sign in →
      </button>

      <p className="mt-5 text-sm text-[#6B5B3E]">
        Don’t have an account?{" "}
        <Link to="/register" className="font-medium text-[#F4845F] transition hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  );
}
