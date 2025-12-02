import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/images/Educore_Logo_White.png";
import Aki from "../assets/images/Ellipse_15.png";
import useStudentProfile from "../hooks/useStudentProfile";
import { getMateriBySubject, getToken } from "../services/api";

export default function MateriSayaSiswa() {
  const navigate = useNavigate();
  const { subject, kelasId } = useParams();

  const { profile } = useStudentProfile();
  const [materiList, setMateriList] = useState([]);
  const [expandedMateri, setExpandedMateri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMateri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, kelasId]);

  const loadMateri = async () => {
    setLoading(true);
    
    // Coba load dari API jika ada token
    if (getToken()) {
      try {
        const res = await getMateriBySubject(subject, `kelas-${kelasId}`);
        if (res.data && res.data.length > 0) {
          setMateriList(res.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Fallback ke localStorage:", err);
      }
    }

    // Fallback ke localStorage
    const storageKey = `materi_${subject}_kelas${kelasId}`;
    const loadedMaterials = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );
    setMateriList(loadedMaterials);
    setLoading(false);
  };

  const toggleExpand = (materiId) => {
    setExpandedMateri(expandedMateri === materiId ? null : materiId);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8 min-h-screen">
        <img src={Logo} className="h-20 mb-6" alt="Logo Educore" />

        <button
          onClick={() => navigate("/profil-siswa")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile?.foto || Aki}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Temanku!!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-siswa")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="text-blue-700 text-lg font-semibold hover:underline"
          >
            Kembali
          </Button>

          <h1 className="text-3xl font-bold ml-4">
            Materi {subject ? subject.toUpperCase() : ""} - Kelas {kelasId}
          </h1>
        </div>

        {/* INFO CARD */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold">Selamat Belajar! 🎓</h2>
          <p className="text-base opacity-90 mt-1">
            Di sini kamu bisa mempelajari semua materi{" "}
            <strong>{subject}</strong>. Pilih materi yang ingin dipelajari dan
            mulai perjalanan belajarmu!
          </p>
        </div>

        {/* LIST MATERI */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-5">Materi Pembelajaran</h2>

          {materiList.length === 0 ? (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                Belum ada materi yang diupload untuk Kelas {kelasId} mata
                pelajaran ini.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Guru akan mengupload materi pembelajaran segera.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {materiList.map((materi) => (
                <div
                  key={materi.id}
                  className="border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition overflow-hidden"
                >
                  <div className="flex justify-between items-center p-5">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#3498db"
                          strokeWidth="2"
                        >
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {materi.folderName}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            📁 {materi.fileCount} file
                          </span>
                          <span className="flex items-center gap-1">
                            📅{" "}
                            {new Date(materi.uploadDate).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(materi.id)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 text-sm md:text-base rounded-md shadow-sm flex items-center gap-2"
                    >
                      {expandedMateri === materi.id ? "Tutup" : "Lihat File"}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedMateri === materi.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Expanded File List */}
                  {expandedMateri === materi.id &&
                    materi.files &&
                    materi.files.length > 0 && (
                      <div className="border-t border-gray-200 bg-white p-5">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Daftar File ({materi.files.length})
                        </h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {materi.files.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <span className="text-2xl">
                                  {file.type.includes("pdf")
                                    ? "📕"
                                    : file.type.includes("word") ||
                                      file.name.endsWith(".doc") ||
                                      file.name.endsWith(".docx")
                                    ? "📘"
                                    : file.type.includes("sheet") ||
                                      file.name.endsWith(".xls") ||
                                      file.name.endsWith(".xlsx")
                                    ? "📗"
                                    : file.type.includes("presentation") ||
                                      file.name.endsWith(".ppt") ||
                                      file.name.endsWith(".pptx")
                                    ? "📙"
                                    : file.type.includes("image")
                                    ? "🖼️"
                                    : file.type.includes("video")
                                    ? "🎥"
                                    : "📄"}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {file.path} •{" "}
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
