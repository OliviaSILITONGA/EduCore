import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";
import useTeacherProfile from "../hooks/useTeacherProfile";
import {
  getMateriBySubject,
  createMateri,
  deleteMateri as deleteMateriAPI,
  updateMateri,
  getToken,
} from "../services/api";
import axios from "axios";

const UPLOADS_BASE = "http://localhost:3000/api/uploads";

export default function ManajemenKelas() {
  const navigate = useNavigate();
  const { matpel } = useParams();
  const { profile } = useTeacherProfile();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [loading, setLoading] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");

  const kelasList = [
    { id: 1, name: "Kelas 1" },
    { id: 2, name: "Kelas 2" },
    { id: 3, name: "Kelas 3" },
    { id: 4, name: "Kelas 4" },
    { id: 5, name: "Kelas 5" },
    { id: 6, name: "Kelas 6" },
    { id: 7, name: "Kelas 7" },
    { id: 8, name: "Kelas 8" },
    { id: 9, name: "Kelas 9" },
    { id: 10, name: "Kelas 10" },
    { id: 11, name: "Kelas 11" },
    { id: 12, name: "Kelas 12" },
  ];

  useEffect(() => {
    loadMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matpel]);

  const loadMaterials = async () => {
    // Coba load dari API jika ada token
    if (getToken()) {
      try {
        let allMaterials = [];
        for (let i = 1; i <= 12; i++) {
          const res = await getMateriBySubject(matpel, `kelas-${i}`);
          if (res.data && res.data.length > 0) {
            allMaterials = [
              ...allMaterials,
              ...res.data.map((m) => ({ ...m, kelas: i })),
            ];
          }
        }
        if (allMaterials.length > 0) {
          setSavedMaterials(allMaterials);
          return;
        }
      } catch (err) {
        console.log("Fallback ke localStorage");
      }
    }

    // Fallback ke localStorage
    let allMaterials = [];
    for (let i = 1; i <= 12; i++) {
      const materials = JSON.parse(
        localStorage.getItem(`materi_${matpel}_kelas${i}`) || "[]"
      );
      // Normalize file paths: ensure they are in format "folderName/filename"
      const normalizedMaterials = materials.map((m) => {
        if (m.files && Array.isArray(m.files)) {
          return {
            ...m,
            kelas: i,
            files: m.files.map((f) => {
              // If path doesn't contain "/" or looks like old format, reconstruct it
              if (!f.path || !f.path.includes("/")) {
                // Use folderName from material
                return { ...f, path: `${m.folderName}/${f.name}` };
              }
              return f;
            }),
          };
        }
        return { ...m, kelas: i };
      });
      allMaterials = [...allMaterials, ...normalizedMaterials];
    }
    setSavedMaterials(allMaterials);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Cek apakah ini folder atau file individual
      const firstFilePath = files[0].webkitRelativePath || files[0].name;
      let extractedFolderName;

      if (files[0].webkitRelativePath) {
        // Ini adalah folder
        extractedFolderName = firstFilePath.split("/")[0];
      } else {
        // Ini adalah file individual
        extractedFolderName = `Upload ${new Date().toLocaleDateString(
          "id-ID"
        )}`;
      }

      setFolderName(extractedFolderName);

      // Simpan file details ke state
      const fileDetails = files.map((file) => ({
        name: file.name,
        path: file.webkitRelativePath || file.name,
        size: file.size,
        type: file.type,
        file: file,
      }));

      setUploadedFiles(fileDetails);
    }
  };

  const handleSaveMateri = async () => {
    if (uploadedFiles.length === 0) {
      alert("Silakan pilih file atau folder terlebih dahulu!");
      return;
    }

    if (!selectedKelas) {
      alert("Silakan pilih kelas terlebih dahulu!");
      return;
    }

    setLoading(true);

    const materialFiles = uploadedFiles.map((f) => ({
      name: f.name,
      path: `${folderName}/${f.name}`,
      size: f.size,
      type: f.type,
    }));

    const newMaterial = {
      id: Date.now(),
      folderName: folderName,
      kelas: selectedKelas,
      uploadDate: new Date().toISOString(),
      fileCount: uploadedFiles.length,
      files: materialFiles,
    };

    if (getToken()) {
      try {
        const token = getToken();
        // upload files one by one
        for (const f of uploadedFiles) {
          const formData = new FormData();
          formData.append("folderName", folderName);
          formData.append("file", f.file, f.name);
          await axios.post(`${UPLOADS_BASE}/upload`, formData, {
            headers: { Authorization: token },
          });
        }

        // create materi metadata (may fail if DB not available)
        await createMateri({
          matpel: matpel,
          kelas: `kelas-${selectedKelas}`,
          judul: folderName,
          deskripsi: deskripsi || `Materi ${folderName}`,
          files: materialFiles,
        });

        alert(
          `Berhasil mengupload "${folderName}" untuk Kelas ${selectedKelas} dengan ${uploadedFiles.length} file!`
        );
        setShowUploadModal(false);
        setUploadedFiles([]);
        setFolderName("");
        setSelectedKelas("");
        setDeskripsi("");
        loadMaterials();
        setLoading(false);
        return;
      } catch (err) {
        console.log("API error, fallback ke localStorage:", err);
      }
    }

    // Fallback ke localStorage
    const storageKey = `materi_${matpel}_kelas${selectedKelas}`;
    const existingMaterials = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );
    existingMaterials.push(newMaterial);
    localStorage.setItem(storageKey, JSON.stringify(existingMaterials));

    alert(
      `Berhasil mengupload "${folderName}" untuk Kelas ${selectedKelas} dengan ${uploadedFiles.length} file!`
    );
    setShowUploadModal(false);
    setUploadedFiles([]);
    setFolderName("");
    setSelectedKelas("");
    setDeskripsi("");
    loadMaterials();
    setLoading(false);
  };

  const handleDeleteMateri = async (id, kelas, folderName) => {
    if (confirm("Apakah Anda yakin ingin menghapus materi ini?")) {
      // Coba hapus via API jika ada token
      if (getToken()) {
        try {
          // remove folder files first
          const token = getToken();
          const headers = token ? { Authorization: token } : {};
          if (folderName) {
            try {
              await axios.delete(
                `${UPLOADS_BASE}/delete-folder/${encodeURIComponent(
                  folderName
                )}`,
                { headers }
              );
            } catch (e) {
              console.warn("Gagal menghapus folder fisik:", e);
            }
          }

          await deleteMateriAPI(id);
          loadMaterials();
          alert("Materi berhasil dihapus!");
          return;
        } catch (err) {
          console.log("API error, fallback ke localStorage:", err);
        }
      }

      // Fallback ke localStorage
      const storageKey = `materi_${matpel}_kelas${kelas}`;
      const materials = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const updatedMaterials = materials.filter((m) => m.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updatedMaterials));
      loadMaterials();
      alert("Materi berhasil dihapus!");
    }
  };

  // Delete single file inside a material folder
  const handleDeleteFile = async (materiId, folderName, fileName) => {
    if (!confirm(`Hapus file ${fileName} ?`)) return;
    if (!getToken()) {
      alert("Hanya guru yang terautentikasi dapat menghapus file di server");
      return;
    }
    try {
      const token = getToken();
      const headers = token ? { Authorization: token } : {};
      await axios.delete(
        `${UPLOADS_BASE}/delete/${encodeURIComponent(
          folderName
        )}/${encodeURIComponent(fileName)}`,
        { headers }
      );

      // update materi record to remove file
      const material = savedMaterials.find((m) => m.id === materiId);
      if (material) {
        const updatedFiles = (material.files || []).filter(
          (f) => f.name !== fileName
        );
        await updateMateri(materiId, {
          files: updatedFiles,
          fileCount: updatedFiles.length,
        });
      }
      loadMaterials();
      alert("File berhasil dihapus");
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus file, cek console");
    }
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setUploadedFiles([]);
    setFolderName("");
    setSelectedKelas("");
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8">
        <img src={Logo} alt="EduCore Logo" className="h-25 left-10" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-32 h-32 rounded-full mb-3 object-cover"
          />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Halo, Guru!</h2>

        <Button
          variant="menu"
          onClick={() => navigate("/beranda-guru")}
          className="w-[80%]"
        >
          Dashboard
        </Button>

        <Button variant="menu" className="w-[80%]">
          Data Siswa
        </Button>

        <Button variant="menu" className="w-[80%]">
          Materi
        </Button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 sm:px-10 lg:px-20 overflow-y-auto">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate(-1)}
            className="text-blue-500 text-base mr-4 p-2"
            variant="link"
          >
            Kembali
          </Button>
          <h1 className="text-3xl font-bold">Manajemen Kelas {matpel}</h1>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2>Selamat datang di Manajemen Kelas!</h2>
          <p>
            Mata Pelajaran: <strong>{matpel}</strong>
          </p>
          <p>Di sini Anda bisa mengelola materi dan daftar murid.</p>
          <div className="flex gap-4 mt-5">
            <Button
              className="bg-blue-500  text-white rounded-md px-4 py-2"
              onClick={() => {
                setSelectedKelas("");
                setShowUploadModal(true);
              }}
            >
              Tambah Materi
            </Button>
          </div>
        </div>

        {/* Daftar Materi yang Sudah Diupload */}
        {savedMaterials.length > 0 && (
          <div className="bg-white rounded-xl p-8 mt-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">
              Materi yang Tersimpan
            </h2>
            <div className="flex flex-col gap-4 mt-4">
              {savedMaterials.map((material) => (
                <div
                  key={material.id}
                  className="flex justify-between items-start p-4 bg-gray-100 rounded-md border border-gray-200 transition"
                >
                  <div className="flex gap-4 flex-1">
                    <div className="shrink-0">
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        {material.folderName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Kelas {material.kelas} • {material.fileCount} file •
                        Diupload:{" "}
                        {new Date(material.uploadDate).toLocaleString("id-ID")}
                      </p>
                      {material.files && material.files.length > 0 && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm text-blue-500 font-medium py-1 select-none">
                            Lihat daftar file ({material.files.length})
                          </summary>
                          <div className="mt-2 pl-3 max-h-48 overflow-y-auto">
                            {material.files.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-2 border-b border-gray-200 text-sm"
                              >
                                <span className="text-gray-800 flex-1 mr-2">
                                  📄 {file.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(2)} KB
                                </span>
                                <button
                                  onClick={() =>
                                    handleDeleteFile(
                                      material.id,
                                      material.kelas,
                                      material.folderName,
                                      file.name
                                    )
                                  }
                                  className="bg-red-600 text-white rounded px-2 py-1 text-xs ml-3"
                                  title="Hapus file"
                                >
                                  Hapus
                                </button>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDeleteMateri(
                        material.id,
                        material.kelas,
                        material.folderName
                      )
                    }
                    className="bg-red-600 text-white rounded-md px-2 py-1 flex items-center"
                    title="Hapus materi"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Upload Folder */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-[90%] max-h-[80vh] overflow-y-auto shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Upload Materi
              </h2>

              {/* Pilih Kelas untuk upload (bisa didapat dari query param) */}

              <div className="mb-4">
                <label htmlFor="folderInput" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-blue-400 rounded-md p-6 text-center bg-gray-50 transition">
                    <svg
                      className="w-12 h-12 mx-auto text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-base text-gray-600 mt-2">
                      {uploadedFiles.length === 0
                        ? "Klik untuk memilih folder"
                        : `${uploadedFiles.length} file dipilih${
                            folderName ? ` dari "${folderName}"` : ""
                          }`}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Upload folder atau file individual
                    </p>
                  </div>
                </label>
                <input
                  id="folderInput"
                  type="file"
                  webkitdirectory="true"
                  directory="true"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="relative text-center my-5">
                <span className="bg-white px-4 text-gray-500 font-semibold relative z-10">
                  ATAU
                </span>
              </div>

              <div className="mb-4">
                <label htmlFor="fileInput" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-green-500 rounded-md p-6 text-center bg-gray-50 transition">
                    <svg
                      className="w-12 h-12 mx-auto text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-base text-gray-600 mt-2">
                      Klik untuk memilih file individual
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      PDF, Word, PPT, Excel, Gambar, Video, dll.
                    </p>
                  </div>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="*/*"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    File yang akan diupload:
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 max-h-48 overflow-y-auto mt-2">
                    {uploadedFiles.slice(0, 10).map((file, index) => (
                      <div
                        key={index}
                        className="py-2 border-b border-gray-200 flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-800 flex-1 mr-2">
                          {file.path}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                    ))}
                    {uploadedFiles.length > 10 && (
                      <p className="mt-2 text-sm italic text-gray-600">
                        ... dan {uploadedFiles.length - 10} file lainnya
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-end mt-6">
                <Button
                  className="bg-gray-400 text-white rounded-md px-4 py-2"
                  onClick={handleCloseModal}
                >
                  Batal
                </Button>
                <Button
                  className={
                    !selectedKelas || uploadedFiles.length === 0
                      ? "bg-green-600 text-white rounded-md px-4 py-2 opacity-60 cursor-not-allowed"
                      : "bg-green-600 text-white rounded-md px-4 py-2"
                  }
                  onClick={handleSaveMateri}
                  disabled={!selectedKelas || uploadedFiles.length === 0}
                >
                  Simpan Materi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
