import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import { registerUser } from "../../services/api";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  try {
    setLoading(true);

    await registerUser({
      email,
      password,
    });

    alert("Account created successfully");

    navigate("/");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Registration failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center gap-2 sm:mb-5 sm:gap-2.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] text-lg font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl">
          ✦
        </div>

        <h2 className="font-['Fraunces',serif] text-[1.375rem] font-bold text-[#2A1F0D] sm:text-[1.45rem]">
          Smart Notes
        </h2>
      </div>

      <h1 className="mb-1.5 font-['Fraunces',serif] text-[clamp(1.9rem,6vw,2.125rem)] leading-tight text-[#2A1F0D]">
        Create{" "}
        <span className="font-medium italic text-[#F4845F]">
          account
        </span>
      </h1>

      <p className="mb-6 text-sm text-[#6B5B3E] sm:mb-7 sm:text-[15px]">
        Start capturing your ideas ✨
      </p>

      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] px-4 py-3 text-[0.9375rem] font-medium text-white transition active:scale-[0.99]"
      >
        {loading ? "Creating..." : "Create account →"}
      </button>

      <p className="mt-5 text-sm text-[#6B5B3E]">
        Already have an account?{" "}
        <Link to="/" className="font-medium text-[#F4845F] transition hover:underline">
          Sign in →
        </Link>
      </p>
    </div>
  );
}