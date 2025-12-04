import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/images/Educore_Logo_White.png";
import Aki from "../assets/images/Ellipse_15.png";
import useStudentProfile from "../hooks/useStudentProfile";

export default function ProgressSiswa() {
  const navigate = useNavigate();
  const { subject, kelasId } = useParams();
  const { profile } = useStudentProfile();

  const [progress, setProgress] = useState({
    totalMateri: 0,
    selesai: 0,
    persentasi: 0,
  });

  useEffect(() => {
    calculateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, kelasId]);

  const calculateProgress = () => {
    // Load dari localStorage atau API
    const storageKey = `materi_${subject}_kelas${kelasId}`;
    const materiList = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const progressKey = `progress_${subject}_kelas${kelasId}`;
    const completedList = JSON.parse(localStorage.getItem(progressKey) || "[]");

    const total = materiList.length;
    const completed = completedList.filter((m) =>
      materiList.some((mat) => mat.id === m)
    ).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    setProgress({
      totalMateri: total,
      selesai: completed,
      persentasi: percentage,
    });
  };

  const handleMarkComplete = (materiId) => {
    const progressKey = `progress_${subject}_kelas${kelasId}`;
    const completedList = JSON.parse(localStorage.getItem(progressKey) || "[]");
    if (!completedList.includes(materiId)) {
      completedList.push(materiId);
      localStorage.setItem(progressKey, JSON.stringify(completedList));
      calculateProgress();
    }
  };

  const handleMarkIncomplete = (materiId) => {
    const progressKey = `progress_${subject}_kelas${kelasId}`;
    const completedList = JSON.parse(localStorage.getItem(progressKey) || "[]");
    const filtered = completedList.filter((id) => id !== materiId);
    localStorage.setItem(progressKey, JSON.stringify(filtered));
    calculateProgress();
  };

  const materiList = JSON.parse(
    localStorage.getItem(`materi_${subject}_kelas${kelasId}`) || "[]"
  );
  const completedList = JSON.parse(
    localStorage.getItem(`progress_${subject}_kelas${kelasId}`) || "[]"
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
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
            Progress {subject ? subject.toUpperCase() : ""}
          </h1>
        </div>

        {/* PROGRESS CARD */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Progres Pembelajaran Anda
          </h2>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-700">
                Penyelesaian Materi
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {progress.persentasi}%
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-linear-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress.persentasi}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Total Materi</p>
              <p className="text-3xl font-bold text-blue-600">
                {progress.totalMateri}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Materi Selesai</p>
              <p className="text-3xl font-bold text-green-600">
                {progress.selesai}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Belum Selesai</p>
              <p className="text-3xl font-bold text-orange-600">
                {progress.totalMateri - progress.selesai}
              </p>
            </div>
          </div>

          {/* Materi List */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Detail Materi
            </h3>
            <div className="space-y-3">
              {materiList.length > 0 ? (
                materiList.map((materi) => {
                  const isCompleted = completedList.includes(materi.id);
                  return (
                    <div
                      key={materi.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition ${
                        isCompleted
                          ? "bg-green-50 border-green-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">
                          {isCompleted ? "✅" : "📚"}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {materi.folderName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {materi.fileCount} file • Diupload:{" "}
                            {new Date(materi.uploadDate).toLocaleDateString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          isCompleted
                            ? handleMarkIncomplete(materi.id)
                            : handleMarkComplete(materi.id)
                        }
                        className={`px-4 py-2 rounded-md font-semibold text-white transition ${
                          isCompleted
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {isCompleted
                          ? "Tandai Belum Selesai"
                          : "Tandai Selesai"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Belum ada materi untuk mata pelajaran ini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
