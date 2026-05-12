export default function Input({ label, type, value, onChange }) {
  return (
    <div style={{ marginBottom: 16, textAlign: "left" }}>
      <label
        style={{
          display: "block",
          textAlign: "left",
          fontSize: 13,
          color: "#6B5B3E",
          marginBottom: 6,
        }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 14,
          border: "1px solid rgba(246,195,71,0.3)",
          outline: "none",
        }}
      />
    </div>
  );
}