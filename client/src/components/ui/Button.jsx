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
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] px-5 py-3.5 text-[0.9375rem] font-semibold shadow-[0_8px_24px_rgba(244,132,95,0.15)] transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
      style={{
        width: fullWidth ? "100%" : "auto",
        touchAction: "manipulation",
        ...variants[variant],
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}