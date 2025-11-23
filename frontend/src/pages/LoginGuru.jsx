import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginGuru() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-12 text-white bg-gradient-to-b from-sky-300 to-blue-700">
        <h1 className="text-5xl font-extrabold">Educore</h1>
        <p className="text-xl mt-2">Belajar cerdas, bukan lebih keras</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center px-12 gap-6">
        <h2 className="text-3xl font-bold text-blue-900">masuk untuk guru</h2>

        {/* INPUT USERNAME */}
        <Input
          type="text"
          className="w-full p-4 rounded-xl bg-blue-100 outline-none"
          placeholder="Nama pengguna atau email"
        />

        {/* INPUT PASSWORD */}
        <Input
          type="password"
          className="w-full p-4 rounded-xl bg-blue-100 outline-none"
          placeholder="Kata sandi"
        />

        {/* LUPA PASSWORD */}
        <a className="text-blue-700 text-sm font-semibold" href="#">
          Lupa kata sandi?
        </a>

        {/* CHECKBOX KEEP LOGIN */}
        <label className="flex items-start gap-3 text-sm text-gray-600">
          <Input type="checkbox" className="mt-1" />
          Biarkan saya tetap masuk <br />
          <span className="text-xs text-gray-400">
            Jangan centang kotak ini jika perangkat digunakan oleh orang lain
          </span>
        </label>

        {/* BUTTON LOGIN */}
        <Button className="w-full py-3 rounded-xl bg-blue-200 text-blue-800 font-bold text-xl">
          masuk
        </Button>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-700 text-sm mt-2">
          Tidak punya akun?{" "}
          <a href="#" className="text-blue-700 font-semibold">
            Buat akun
          </a>
        </p>
      </div>
    </div>
  );
}
