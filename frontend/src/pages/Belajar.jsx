import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function Belajar() {
  const { subject, materiId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [kelas, setKelas] = useState("1");
  const [isTeacher, setIsTeacher] = useState(false);

  const materiData = {
    1: {
      judul: "Aljabar Dasar",
      durasi: "30 menit",
      sections: [
        {
          id: 1,
          title: "Pengantar Aljabar",
          text: "Konsep variabel dan konstanta. Contoh soal sederhana.",
        },
        {
          id: 2,
          title: "Operasi Aljabar",
          text: "Penjumlahan, pengurangan, perkalian, pembagian aljabar.",
        },
      ],
    },
    2: {
      judul: "Geometri Bangun Datar",
      durasi: "45 menit",
      sections: [
        {
          id: 1,
          title: "Persegi & Persegi Panjang",
          text: "Rumus luas dan keliling, contoh soal.",
        },
        {
          id: 2,
          title: "Lingkaran",
          text: "Rumus phi, diameter, jari-jari, luas.",
        },
      ],
    },
  };

  const id = Number(materiId);
  const m = materiData[id] || {
    judul: `Materi ${materiId}`,
    durasi: "-",
    sections: [{ id: 1, title: "-", text: "Konten belum tersedia." }],
  };

  const handleNext = () => {
    const nextId = id + 1;
    if (materiData[nextId]) navigate(`/belajar/${subject}/${nextId}`);
    else navigate(`/materi-siswa/${subject}`);
  };

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const role = qs.get("role") || localStorage.getItem("role");
    setIsTeacher(role === "guru");
  }, [location.search]);

  const storageKey = (subject, kelas) =>
    `completed::${subject || "unknown"}::kelas-${kelas}`;

  function markCompleted(subject, kelas, materiId) {
    try {
      const raw = localStorage.getItem(storageKey(subject, kelas));
      const arr = raw ? JSON.parse(raw) : [];
      if (!arr.includes(Number(materiId))) arr.push(Number(materiId));
      localStorage.setItem(storageKey(subject, kelas), JSON.stringify(arr));
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1100px] mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="link" onClick={() => navigate(-1)}>
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#003cbd]">{m.judul}</h1>
            <p className="text-sm text-gray-600">
              {m.durasi} • {subject?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex gap-6">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-[360px]">
            <div className="bg-gray-200 h-[260px] rounded-lg flex items-center justify-center text-gray-600 mb-3">
              Video / Slide Placeholder
            </div>

            <div className="flex gap-3">
              <Button onClick={() => alert("Mulai/Resume")}>Putar</Button>
              <Button variant="menu" onClick={() => alert("Catatan")}>
                Catatan
              </Button>
            </div>

            {isTeacher && (
              <div className="flex gap-3 mt-4">
                <label className="inline-flex gap-3 items-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      alert(`Upload: ${e.target.files?.[0]?.name || ""}`)
                    }
                  />
                  <Button
                    onClick={() =>
                      document.querySelector("input[type=file]")?.click()
                    }
                  >
                    Upload Materi
                  </Button>
                </label>

                <Button variant="menu" onClick={() => alert("Buat Ujian")}>
                  Buat Ujian
                </Button>

                <Button
                  variant="menu"
                  onClick={() => {
                    const raw = localStorage.getItem(
                      storageKey(subject, kelas)
                    );
                    const arr = raw ? JSON.parse(raw) : [];
                    alert(
                      `Siswa kelas ${kelas} yang sudah menyelesaikan:\n${
                        arr.length ? arr.join(", ") : "Belum ada"
                      }`
                    );
                  }}
                >
                  Lihat yang sudah belajar
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-[1.2] bg-white p-6 rounded-lg shadow">
            {m.sections.map((s) => (
              <section key={s.id} className="mb-4">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-gray-700 leading-relaxed">{s.text}</p>
              </section>
            ))}

            <div className="flex justify-end mt-4 items-center gap-3">
              <select
                className="border p-2 rounded"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    KELAS {i + 1}
                  </option>
                ))}
              </select>

              <Button
                className="w-[180px]"
                onClick={() => {
                  if (markCompleted(subject, kelas, id)) {
                    alert(`Materi ditandai selesai untuk KELAS ${kelas}`);
                  }
                }}
              >
                Tandai Selesai
              </Button>

              <Button onClick={handleNext}>
                {materiData[id + 1] ? "Selanjutnya" : "Selesai"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
