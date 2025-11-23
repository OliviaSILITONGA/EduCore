import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  style = {},
  className = "", // ← tambahkan ini
  ...props // ← tambahkan ini
}) {
  const base = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  };

  const variants = {
    primary: { background: "#003cbd", color: "#fff" },
    menu: {
      background: "white",
      color: "#A52A2A",
      border: "1px solid #e0e0e0",
      width: "80%",
      marginBottom: "12px",
      alignSelf: "center",
      padding: "12px 16px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    },
    link: {
      background: "none",
      color: "#003cbd",
      border: "none",
      padding: "6px 8px",
      width: "auto",
      boxShadow: "none",
      alignSelf: "flex-start",
    },
  };

  const applied = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style,
  };

  return (
    <button
      style={applied}
      onClick={onClick}
      className={className} // ← className diteruskan ke button HTML
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
