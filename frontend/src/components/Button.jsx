import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  style = {},
  className = "", // ← tambahkan ini
  ...props // ← tambahkan ini
}) 
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

export default function Button({ children, onClick, variant = "primary", style = {} }) {
	const base = {
		display: "inline-flex",
		alignItems: "center",
		gap: "12px",
		justifyContent: "flex-start",
		padding: "12px 18px",
		borderRadius: "10px",
		border: "none",
		cursor: "pointer",
		fontWeight: 600,
		width: "80%",
		margin: "12px auto",
		boxSizing: "border-box",
	};

	const variants = {
		primary: {
			background: "#003cbd",
			color: "#fff",
			border: "none",
			boxShadow: "0 6px 14px rgba(0,60,189,0.12)",
		},

		menu: {
			background: "#fff",
			color: "#A52A2A",
			border: "1px solid #e0e0e0",
			boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
		},

		link: {
			background: "none",
			color: "#2b7fb6",
			border: "none",
			padding: "4px 6px",
			width: "auto",
			boxShadow: "none",
			margin: 0,
			justifyContent: "flex-start",
			fontFamily: "inherit",
			fontSize: "18px",
			fontWeight: 700,
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

export { Button }
