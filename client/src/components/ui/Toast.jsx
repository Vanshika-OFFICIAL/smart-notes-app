export default function Toast({
  message,
  type,
}) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",

        padding: "14px 20px",

        borderRadius: "14px",

        background:
          type === "error"
            ? "#ff4d4f"
            : "linear-gradient(135deg,#F6C347,#F4845F)",

        color: "white",

        fontWeight: "500",

        zIndex: 9999,

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      {message}
    </div>
  );
}