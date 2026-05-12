import { useState } from "react";

export default function SocialButton({ icon, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`social-btn ${hovered ? "is-hovered" : ""}`}
    >
      {icon}
      {label}
    </button>
  );
}