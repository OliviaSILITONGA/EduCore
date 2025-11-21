import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Belajar() {
  const { subject, materiId } = useParams();
  const navigate = useNavigate();

  // dummy content - replace with API data later
  const materiData = {
    1: {
      judul: "Aljabar Dasar",
      durasi: "30 menit",
      sections: [
        { id: 1, title: "Pengantar Aljabar", text: "Konsep variabel dan konstanta. Contoh soal sederhana." },
        { id: 2, title: "Operasi Aljabar", text: "Penjumlahan, pengurangan, perkalian, pembagian aljabar." },
      ],
    },
    2: {
      judul: "Geometri Bangun Datar",
      durasi: "45 menit",
      sections: [
        { id: 1, title: "Persegi & Persegi Panjang", text: "Rumus luas dan keliling, contoh soal." },
        { id: 2, title: "Lingkaran", text: "Rumus phi, diameter, jari-jari, luas." },
      ],
    },
    3: {
      judul: "Trigonometri",
      durasi: "60 menit",
      sections: [
        { id: 1, title: "Sinus, Cosinus", text: "Definisi dasar dan hubungan pada segitiga siku-siku." },
        { id: 2, title: "Praktik Soal", text: "Contoh soal dan penyelesaian." },
      ],
    },
  };

  const id = Number(materiId);
  const m = materiData[id] || { judul: `Materi ${materiId}`, durasi: "-", sections: [{ id: 1, title: "-", text: "Konten belum tersedia." }] };

  const handleNext = () => {
    const nextId = id + 1;
    // naive next logic: if next exists, go to it, else back to materi list
    if (materiData[nextId]) navigate(`/belajar/${subject}/${nextId}`);
    else navigate(`/materi-siswa/${subject}`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Button variant="link" onClick={() => navigate(-1)}>← Kembali</Button>
          <div>
            <h1 style={styles.title}>{m.judul}</h1>
            <div style={styles.meta}>{m.durasi} • {subject ? subject.toUpperCase() : ""}</div>
          </div>
        </div>

        <div style={styles.main}>
          <div style={styles.videoColumn}>
            <div style={styles.videoPlaceholder}>Video / Slide Placeholder</div>
            <div style={styles.controls}>
              <Button onClick={() => alert("Mulai/Resume")}>Putar</Button>
              <Button variant="menu" onClick={() => alert("Catatan")}>Catatan</Button>
            </div>
          </div>

          <div style={styles.contentColumn}>
            {m.sections.map((s) => (
              <section key={s.id} style={styles.section}>
                <h3 style={styles.sectionTitle}>{s.title}</h3>
                <p style={styles.sectionText}>{s.text}</p>
              </section>
            ))}

            <div style={styles.nextRow}>
              <Button onClick={handleNext}>{materiData[id + 1] ? "Selanjutnya" : "Selesai"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20, fontFamily: "Arial, sans-serif", background: "#f4f4f4", minHeight: "100vh" },
  container: { maxWidth: 1100, margin: "0 auto" },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 18 },
  title: { margin: 0, fontSize: 24, fontWeight: 700, color: "#003cbd" },
  meta: { color: "#666", fontSize: 13 },
  main: { display: "flex", gap: 24 },
  videoColumn: { flex: 1, minWidth: 360 },
  videoPlaceholder: { background: "#00000008", height: 260, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#666", marginBottom: 12 },
  controls: { display: "flex", gap: 12 },
  contentColumn: { flex: 1.2, background: "white", padding: 18, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  section: { marginBottom: 14 },
  sectionTitle: { margin: "6px 0", fontSize: 18, color: "#000" },
  sectionText: { color: "#333", lineHeight: 1.6 },
  nextRow: { display: "flex", justifyContent: "flex-end", marginTop: 12 },
};

