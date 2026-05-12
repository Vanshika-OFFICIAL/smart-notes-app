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
    <div style={{ textAlign: "center" }}>
      {/* LOGO */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px"
      }}>
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "linear-gradient(135deg,#F6C347,#F4845F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px"
        }}>
          ✦
        </div>

        <h2 style={{
          fontFamily: "Fraunces, serif",
          fontSize: "22px",
          fontWeight: "700",
          color: "#2A1F0D"
        }}>
          Smart Notes
        </h2>
      </div>

      {/* TITLE */}
      <h1 style={{
        fontFamily: "serif",
        fontSize: "34px",
        color: "#2A1F0D",
        marginBottom: "6px"
      }}>
        Create{" "}
        <span style={{
          color: "#F4845F",
          fontStyle: "italic",
          fontWeight: "500"
        }}>
          account
        </span>
      </h1>

      <p style={{
        color: "#6B5B3E",
        marginBottom: "28px",
        fontSize: "15px"
      }}>
        Start capturing your ideas ✨
      </p>

      {/* INPUTS */}
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

      {/* BUTTON */}
      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          background: "linear-gradient(135deg,#F6C347,#F4845F)",
          color: "white",
          border: "none",
          marginTop: "12px",
          fontWeight: "500",
          fontSize: "15px",
          cursor: "pointer"
        }}
      >
        {loading ? "Creating..." : "Create account →"}
      </button>

      {/* DIVIDER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "24px 0",
        color: "#A89270",
        fontSize: "14px"
      }}>
        <div style={{ flex: 1, height: "1px", background: "#eee" }} />
        or continue with
        <div style={{ flex: 1, height: "1px", background: "#eee" }} />
      </div>

      {/* SOCIAL */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button style={{
          flex: 1,
          padding: "10px",
          borderRadius: "12px",
          border: "1px solid #eee",
          background: "white"
        }}>
          Google
        </button>

        <button style={{
          flex: 1,
          padding: "10px",
          borderRadius: "12px",
          border: "1px solid #eee",
          background: "white"
        }}>
          GitHub
        </button>
      </div>

      {/* LOGIN LINK */}
      <p style={{
        marginTop: "22px",
        fontSize: "14px",
        color: "#6B5B3E"
      }}>
        Already have an account?{" "}
        <Link to="/" style={{
          color: "#F4845F",
          fontWeight: "500"
        }}>
          Sign in →
        </Link>
      </p>
    </div>
  );
}