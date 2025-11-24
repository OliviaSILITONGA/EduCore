import { useState, useEffect } from "react";

export default function useStudentProfile() {
  const [profile, setProfile] = useState({
    nama: "",
    gender: "",
    telepon: "",
    provinsi: "",
    kota: "",
    alamat: "",
    sekolahProvinsi: "",
    sekolahKota: "",
    namaSekolah: "",
    tingkat: "",
    ortuNama: "",
    ortuTelepon: "",
    foto: "", // base64 image
  });

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const saveProfile = (data) => {
    localStorage.setItem("studentProfile", JSON.stringify(data));
    setProfile(data);
  };

  return { profile, saveProfile };
}
