// File: Header.jsx (Revisi untuk Layout Normal)
import React, { useState, useEffect, useContext } from "react";
import { NavigationContext } from "../App";

export default function Header() {
  const { setCurrentPage } = useContext(NavigationContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Hapus state dan logika untuk Hide on Scroll

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    
    // Hapus cleanup listener scroll

    return () => {
      window.removeEventListener("resize", handleResize);
      // ...
    };
  }, []); 

  const MutedLight = "#9aa0b4";

  return (
    // Hapus style position: 'fixed', top: 0, zIndex, transform, dan transition
    <header style={{ 
      width: '100%', 
      background: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div className="container topbar">
        {/* Konten brand */}
        <div className="brand">
          <div className="logo-mark">EC</div>
          <div>
            <div style={{ color: "var(--text)" }}>EduCore</div> 
            <div
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                marginTop: "2px",
              }}
            >
              Platform Belajar
            </div>
          </div>
        </div>

        {/* Konten nav-links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: "inherit", fontFamily: "inherit" }}
            onClick={() => { setCurrentPage("home"); setMenuOpen(false); }}
          >
            Beranda
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: "inherit", fontFamily: "inherit" }}
            onClick={() => { setCurrentPage("courselist"); setMenuOpen(false); }}
          >
            Mata Kuliah
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: "inherit", fontFamily: "inherit" }}
            onClick={() => { setCurrentPage("dosen"); setMenuOpen(false); }}
          >
            Guru
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: "inherit", fontFamily: "inherit" }}
            onClick={() => { setCurrentPage("kuis"); setMenuOpen(false); }}
          >
            Kuis
          </button>
        </nav>

        {/* Konten search-bar */}
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L16.65 16.65"
              stroke={MutedLight}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke={MutedLight}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Cari mata kuliah..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Konten actions */}
        <div className="actions">
          <button
            className="btn btn-outline"
            onClick={() => { setCurrentPage("roleSelection"); setMenuOpen(false); }}
          >
            Masuk
          </button>
          <button
            className="btn btn-primary"
            onClick={() => { setCurrentPage("roleSelection"); setMenuOpen(false); }}
          >
            Daftar
          </button>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span style={{ color: "var(--text)" }}>☰</span> 
        </button>
      </div>
    </header>
  );
}