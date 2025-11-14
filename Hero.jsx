// File: Hero.jsx
import React, { useContext } from "react";
import { NavigationContext } from "../App";

export default function Hero() {
  const { setCurrentPage } = useContext(NavigationContext);

  return (
    <section 
      className="hero" 
      style={{
        display: 'flex',
        flexDirection: 'column', // Teks akan ditumpuk secara vertikal
        alignItems: 'center',    // Memusatkan horizontal
        justifyContent: 'center', // Memusatkan vertikal (jika cukup ruang)
        textAlign: 'center',     // Memusatkan teks di dalam div
        minHeight: '80vh',       // Memberi ruang agar bisa dipusatkan vertikal
        padding: '60px 20px',    // Padding agar tidak terlalu mepet tepi
        color: 'var(--text)',    // Warna teks agar cocok dengan tema gelap
      }}
    > 
      <div 
        className="hero-content"
        style={{
          maxWidth: '800px', // Batasi lebar agar teks tidak terlalu panjang di layar lebar
          margin: '0 auto',   // Pastikan div tetap di tengah
        }}
      >
        <h1 
          style={{ 
            fontSize: '3.5rem', // Ukuran font lebih besar
            fontWeight: 700,    // Lebih tebal
            marginBottom: '20px',
            lineHeight: '1.2',
            // Font yang lebih modern dan keren (contoh: Montserrat, Poppins, Inter)
            // Anda bisa mengganti ini jika punya font lain yang diinginkan
            fontFamily: "'Inter', sans-serif", // Contoh font modern
          }}
        >
          Belajar lebih pintar dengan panduan yang jelas
        </h1>
        <p 
          style={{ 
            fontSize: '1.3rem', // Ukuran font lebih besar untuk deskripsi
            color: 'var(--muted-light)', // Warna lebih lembut
            marginBottom: '40px',
            lineHeight: '1.6',
            fontFamily: "'Inter', sans-serif", // Konsisten dengan H1
            maxWidth: '650px', // Batasi lebar paragraf
            margin: '0 auto 40px auto', // Pastikan paragraf di tengah
          }}
        >
          Platform pembelajaran interaktif untuk murid dan guru. Materi,
          kuis, dan pelacakan progres yang membantu mencapai tujuan belajar.
        </p>
        <div 
          className="hero-cta"
          style={{
            // Pastikan tombol juga terpusat
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap', // Agar responsif
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage("kelas")}
            style={{
                padding: '15px 35px', // Tombol lebih besar
                fontSize: '1.1rem',  // Teks tombol lebih besar
                borderRadius: '12px',
                background: 'var(--primary)', // Gunakan warna primary dari CSS
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(108, 43, 221, 0.3)', // Sedikit shadow
                transition: 'transform 0.2s ease-in-out'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.style.transform = 'translateY(0)'}
          >
            Mulai Belajar
          </button>
        </div>
      </div>

      <div className="hero-illustration">
        {/* Ilustrasi telah dihapus untuk tampilan yang lebih sederhana */}
      </div>
    </section>
  );
}