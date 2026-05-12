export default function Background() {
  return (
    <>
      {/* Grid */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(246,195,71,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(246,195,71,0.06) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Blobs */}
      <div style={{
        position: "fixed",
        width: 500,
        height: 500,
        top: -150,
        right: -120,
        borderRadius: "50%",
        background: "radial-gradient(circle,#F6C347,transparent)",
        filter: "blur(80px)"
      }} />

      <div style={{
        position: "fixed",
        width: 400,
        height: 400,
        bottom: -100,
        left: -100,
        borderRadius: "50%",
        background: "radial-gradient(circle,#F4845F,transparent)",
        filter: "blur(80px)"
      }} />
    </>
  );
}