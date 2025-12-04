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
  getToken,
} from "../services/api";

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

    // Coba simpan ke API jika ada token
    if (getToken()) {
      try {
        await createMateri({
          matpel: matpel,
          kelas: `kelas-${selectedKelas}`,
          judul: folderName,
          deskripsi: deskripsi || `Materi ${folderName}`,
          files: newMaterial.files,
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

  const handleDeleteMateri = async (id, kelas) => {
    if (confirm("Apakah Anda yakin ingin menghapus materi ini?")) {
      // Coba hapus via API jika ada token
      if (getToken()) {
        try {
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

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setUploadedFiles([]);
    setFolderName("");
    setSelectedKelas("");
  };

  

  return (
    <div style={styles.page}>
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

        <Button
          variant="menu"
          className="w-[80%]"
          onClick={() => navigate('/data-siswa')}
        >
          Data Siswa
        </Button>


        

      </div>
      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.header}>
          <Button
            onClick={() => navigate(-1)}
            style={styles.backButton}
            variant="link"
          >
            Kembali
          </Button>
          <h1 style={styles.title}>Manajemen Kelas {matpel}</h1>
        </div>

        <div style={styles.card}>
          <h2>Selamat datang di Manajemen Kelas!</h2>
          <p>
            Mata Pelajaran: <strong>{matpel}</strong>
          </p>
          <p>Di sini Anda bisa mengelola materi dan daftar murid.</p>

          <div style={styles.buttonContainer}>
            <Button
              style={styles.primaryButton}
              onClick={() => setShowUploadModal(true)}
            >
              Tambah Materi
            </Button>
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

const styles = {
  page: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "#f4f4f4",
  },
  sidebar: {
    width: "250px",
    background: "#808080",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
  },
  profilePlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
    background: "#ccc",
  },
  name: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  menuBtn: {
    width: "80%",
    padding: "12px",
    background: "white",
    color: "#A52A2A",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: "25px 40px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#3498db",
    fontSize: "16px",
    cursor: "pointer",
    marginRight: "15px",
    padding: "8px 12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  primaryButton: {
    padding: "12px 24px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  uploadSection: {
    marginBottom: "20px",
  },
  uploadLabel: {
    cursor: "pointer",
    display: "block",
  },
  uploadBox: {
    border: "2px dashed #3498db",
    borderRadius: "8px",
    padding: "40px",
    textAlign: "center",
    background: "#f8f9fa",
    transition: "all 0.3s ease",
  },
  uploadIcon: {
    width: "48px",
    height: "48px",
    margin: "0 auto 15px",
    color: "#3498db",
  },
  uploadText: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
  },
  uploadSubtext: {
    fontSize: "13px",
    color: "#999",
    marginTop: "8px",
  },
  orDivider: {
    textAlign: "center",
    margin: "20px 0",
    position: "relative",
  },
  orText: {
    background: "white",
    padding: "0 15px",
    color: "#999",
    fontSize: "14px",
    fontWeight: "600",
    position: "relative",
    zIndex: 1,
  },
  hiddenInput: {
    display: "none",
  },
  filesList: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  filesListTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  filesContainer: {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    maxHeight: "200px",
    overflowY: "auto",
  },
  fileItem: {
    padding: "8px 0",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileName: {
    fontSize: "14px",
    color: "#333",
    flex: 1,
    marginRight: "10px",
  },
  fileSize: {
    fontSize: "12px",
    color: "#999",
  },
  moreFiles: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
  },
  modalButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  cancelButton: {
    padding: "10px 20px",
    background: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  saveButton: {
    padding: "10px 20px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  selectKelas: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    background: "white",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  },
  materiCard: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    marginTop: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  materiTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  materiList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  materiItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    transition: "all 0.3s ease",
  },
  materiInfo: {
    display: "flex",
    gap: "15px",
    flex: 1,
  },
  materiIcon: {
    flexShrink: 0,
  },
  materiDetails: {
    flex: 1,
  },
  materiName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  materiMeta: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 10px 0",
  },
  fileDetails: {
    marginTop: "10px",
  },
  fileDetailsSummary: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#3498db",
    fontWeight: "500",
    padding: "5px 0",
    userSelect: "none",
  },
  fileDetailsContent: {
    marginTop: "10px",
    paddingLeft: "10px",
    maxHeight: "200px",
    overflowY: "auto",
  },
  fileDetailItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "13px",
  },
  fileDetailName: {
    color: "#555",
    flex: 1,
  },
  fileDetailSize: {
    color: "#999",
    marginLeft: "10px",
  },
  deleteButton: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    flexShrink: 0,
  },
};
