export default function Background() {
  return (
    <>
      {/* Grid */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(246,195,71,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(246,195,71,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Blobs */}
      <div className="pointer-events-none fixed right-[-7.5rem] top-[-9rem] h-[clamp(18rem,38vw,31rem)] w-[clamp(18rem,38vw,31rem)] rounded-full bg-[radial-gradient(circle,#F6C347,transparent)] blur-[80px]" />

      <div className="pointer-events-none fixed bottom-[-6.25rem] left-[-6.25rem] h-[clamp(16rem,32vw,25rem)] w-[clamp(16rem,32vw,25rem)] rounded-full bg-[radial-gradient(circle,#F4845F,transparent)] blur-[80px]" />
    </>
  );
}