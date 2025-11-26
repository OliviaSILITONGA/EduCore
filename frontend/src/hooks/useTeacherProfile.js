import { useState, useEffect } from "react";

export default function useTeacherProfile() {
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
    foto: "", // base64 image
  });

  useEffect(() => {
    const saved = localStorage.getItem("teacherProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const saveProfile = (data) => {
    localStorage.setItem("teacherProfile", JSON.stringify(data));
    setProfile(data);
  };

  return { profile, saveProfile };
}
