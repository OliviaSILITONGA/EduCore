import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";
import useTeacherProfile from "../hooks/useTeacherProfile";

export default function ManajemenKelas() {
  const navigate = useNavigate();
  const { matpel } = useParams();
  const { profile } = useTeacherProfile();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");

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
    // Load materi dari localStorage saat komponen dimount
    loadMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matpel]);

  const loadMaterials = () => {
    // Load semua materi dari semua kelas untuk mata pelajaran ini
    let allMaterials = [];
    for (let i = 1; i <= 12; i++) {
      const materials = JSON.parse(
        localStorage.getItem(`materi_${matpel}_kelas${i}`) || "[]"
      );
      allMaterials = [
        ...allMaterials,
        ...materials.map((m) => ({ ...m, kelas: i })),
      ];
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

  const handleSaveMateri = () => {
    if (uploadedFiles.length === 0) {
      alert("Silakan pilih file atau folder terlebih dahulu!");
      return;
    }

    if (!selectedKelas) {
      alert("Silakan pilih kelas terlebih dahulu!");
      return;
    }

    // Simpan ke localStorage per kelas
    const storageKey = `materi_${matpel}_kelas${selectedKelas}`;
    const savedMaterials = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const newMaterial = {
      id: Date.now(),
      folderName: folderName,
      kelas: selectedKelas,
      uploadDate: new Date().toISOString(),
      fileCount: uploadedFiles.length,
      files: uploadedFiles.map((f) => ({
        name: f.name,
        path: f.path,
        size: f.size,
        type: f.type,
      })),
    };

    savedMaterials.push(newMaterial);
    localStorage.setItem(storageKey, JSON.stringify(savedMaterials));

    alert(
      `Berhasil mengupload "${folderName}" untuk Kelas ${selectedKelas} dengan ${uploadedFiles.length} file!`
    );
    setShowUploadModal(false);
    setUploadedFiles([]);
    setFolderName("");
    setSelectedKelas("");
    loadMaterials(); // Reload materi setelah upload
  };

  const handleDeleteMateri = (id, kelas) => {
    if (confirm("Apakah Anda yakin ingin menghapus materi ini?")) {
      const storageKey = `materi_${matpel}_kelas${kelas}`;
      const materials = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const updatedMaterials = materials.filter((m) => m.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updatedMaterials));
      loadMaterials();
      alert("Materi berhasil dihapus!");
    }
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setUploadedFiles([]);
    setFolderName("");
    setSelectedKelas("");
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[#27B4E3] text-white flex flex-col items-center pt-8">
        <img src={Logo} alt="EduCore Logo" className="h-25 mb-6" />

        <button
          onClick={() => navigate("/profil-guru")}
          className="focus:outline-none hover:opacity-80 transition"
        >
          <img
            src={profile.foto || Makima}
            className="w-32 h-32 rounded-full mb-3 object-cover border-4 border-white shadow-lg"
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
      <div className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="text-blue-600 text-base"
          >
            Kembali
          </Button>
          <h1 className="text-3xl font-bold ml-3">Manajemen Kelas {matpel}</h1>
        </div>

        {/* CARD */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">
            Selamat datang di Manajemen Kelas!
          </h2>

          <p className="text-gray-700">
            Mata Pelajaran: <strong>{matpel}</strong>
          </p>

          <p className="text-gray-600 mt-1">
            Di sini Anda bisa mengelola materi dan daftar murid.
          </p>

          <div className="flex gap-4 mt-6">
            <Button className="w-fit px-6">Lihat Materi</Button>
            <Button className="w-fit px-6">Lihat Daftar Murid</Button>
          </div>
        </div>

        {/* Daftar Materi yang Sudah Diupload */}
        {savedMaterials.length > 0 && (
          <div style={styles.materiCard}>
            <h2 style={styles.materiTitle}>Materi yang Tersimpan</h2>
            <div style={styles.materiList}>
              {savedMaterials.map((material) => (
                <div key={material.id} style={styles.materiItem}>
                  <div style={styles.materiInfo}>
                    <div style={styles.materiIcon}>
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
                    <div style={styles.materiDetails}>
                      <h3 style={styles.materiName}>{material.folderName}</h3>
                      <p style={styles.materiMeta}>
                        Kelas {material.kelas} • {material.fileCount} file •
                        Diupload:{" "}
                        {new Date(material.uploadDate).toLocaleString("id-ID")}
                      </p>
                      {material.files && material.files.length > 0 && (
                        <details style={styles.fileDetails}>
                          <summary style={styles.fileDetailsSummary}>
                            Lihat daftar file ({material.files.length})
                          </summary>
                          <div style={styles.fileDetailsContent}>
                            {material.files.map((file, idx) => (
                              <div key={idx} style={styles.fileDetailItem}>
                                <span style={styles.fileDetailName}>
                                  📄 {file.name}
                                </span>
                                <span style={styles.fileDetailSize}>
                                  {(file.size / 1024).toFixed(2)} KB
                                </span>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDeleteMateri(material.id, material.kelas)
                    }
                    style={styles.deleteButton}
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
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>Upload Materi</h2>

              {/* Pilih Kelas */}
              <div style={styles.uploadSection}>
                <label style={styles.label}>Pilih Kelas</label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  style={styles.selectKelas}
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.uploadSection}>
                <label htmlFor="folderInput" style={styles.uploadLabel}>
                  <div style={styles.uploadBox}>
                    <svg
                      style={styles.uploadIcon}
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
                    <p style={styles.uploadText}>
                      {uploadedFiles.length === 0
                        ? "Klik untuk memilih folder"
                        : `${uploadedFiles.length} file dipilih${
                            folderName ? ` dari "${folderName}"` : ""
                          }`}
                    </p>
                    <p style={styles.uploadSubtext}>
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
                  style={styles.hiddenInput}
                />
              </div>

              <div style={styles.orDivider}>
                <span style={styles.orText}>ATAU</span>
              </div>

              <div style={styles.uploadSection}>
                <label htmlFor="fileInput" style={styles.uploadLabel}>
                  <div style={{ ...styles.uploadBox, borderColor: "#27ae60" }}>
                    <svg
                      style={{ ...styles.uploadIcon, color: "#27ae60" }}
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
                    <p style={styles.uploadText}>
                      Klik untuk memilih file individual
                    </p>
                    <p style={styles.uploadSubtext}>
                      PDF, Word, PPT, Excel, Gambar, Video, dll.
                    </p>
                  </div>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={styles.hiddenInput}
                  accept="*/*"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div style={styles.filesList}>
                  <h3 style={styles.filesListTitle}>
                    File yang akan diupload:
                  </h3>
                  <div style={styles.filesContainer}>
                    {uploadedFiles.slice(0, 10).map((file, index) => (
                      <div key={index} style={styles.fileItem}>
                        <span style={styles.fileName}>{file.path}</span>
                        <span style={styles.fileSize}>
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                    ))}
                    {uploadedFiles.length > 10 && (
                      <p style={styles.moreFiles}>
                        ... dan {uploadedFiles.length - 10} file lainnya
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div style={styles.modalButtons}>
                <Button style={styles.cancelButton} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button style={styles.saveButton} onClick={handleSaveMateri}>
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
