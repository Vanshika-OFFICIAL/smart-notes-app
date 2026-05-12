export default function AuthCard({ children }) {
  return (
    <div style={{
      width: "420px",
      padding: "40px",
      borderRadius: "28px",
      background: "rgba(255,253,248,0.75)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(246,195,71,0.24)",
      boxShadow: "0 8px 40px rgba(244,132,95,0.14)",
    }}>
      {children}
    </div>
  );
}