import Spinner from "./Spinner";

export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  fullWidth = false,
}) {
  const variants = {
    primary: {
      background:
        "linear-gradient(135deg,#F6C347,#F4845F)",
      color: "white",
      border: "none",
    },

    secondary: {
      background: "white",
      color: "#2A1F0D",
      border: "1px solid rgba(246,195,71,0.25)",
    },

    danger: {
      background: "#ff4d4f",
      color: "white",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={{
        width: fullWidth ? "100%" : "auto",

        padding: "14px 20px",

        borderRadius: "16px",

        fontWeight: "600",

        fontSize: "15px",

        cursor: loading
          ? "not-allowed"
          : "pointer",

        transition: "0.25s ease",

        boxShadow:
          "0 8px 24px rgba(244,132,95,0.15)",

        opacity: loading ? 0.8 : 1,

        ...variants[variant],
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}