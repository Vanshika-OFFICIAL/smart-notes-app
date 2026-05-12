export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",

          border:
            "3px solid rgba(255,255,255,0.35)",

          borderTop:
            "3px solid white",

          borderRadius: "50%",

          animation:
            "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}