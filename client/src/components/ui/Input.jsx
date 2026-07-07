export default function Input({
  label,
  type,
  value,
  onChange,
  trailingElement,
}) {
  return (
    <div className="mb-4 text-left">
      <label className="mb-1.5 block text-left text-[0.8125rem] font-medium text-[#6B5B3E] sm:text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full rounded-[14px] border border-[rgba(246,195,71,0.3)] bg-white/90 px-4 py-3.5 text-base text-[#2A1F0D] outline-none transition focus:border-[rgba(244,132,95,0.45)] focus:ring-2 focus:ring-[rgba(244,132,95,0.18)] sm:py-4"
        />

        {trailingElement ? (
          <div className="absolute inset-y-0 right-4 flex items-center text-[#6B5B3E]">
            {trailingElement}
          </div>
        ) : null}
      </div>
    </div>
  );
}