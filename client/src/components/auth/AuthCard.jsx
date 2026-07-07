export default function AuthCard({ children }) {
  return (
    <section className="relative z-10 w-full max-w-[420px] rounded-[28px] border border-[rgba(246,195,71,0.24)] bg-[rgba(255,253,248,0.75)] p-6 shadow-[0_8px_40px_rgba(244,132,95,0.14)] backdrop-blur-[24px] sm:p-8 lg:p-10">
      {children}
    </section>
  );
}