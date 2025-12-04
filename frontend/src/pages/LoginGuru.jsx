import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/images/Educore_Logo_White.png";
import { loginGuru } from "../services/api";
import {
  Mail,
  Lock,
  LogIn,
  User,
  ArrowRight,
  Shield,
  BookOpen,
  GraduationCap
} from "lucide-react";

export default function LoginGuru() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Harap isi email!");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid!");
      return;
    }

    if (!password.trim()) {
      setError("Harap isi kata sandi!");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi harus minimal 6 karakter!");
      return;
    }

    setLoading(true);
    try {
      await loginGuru(email, password);
      navigate("/beranda-guru");
    } catch (err) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="EduCore Logo" className="h-10" />
              <div>
                <h1 className="text-xl font-bold">EduCore</h1>
                <p className="text-xs text-blue-100">Portal Guru</p>
              </div>
            </div>
            <Link 
              to="/register-guru" 
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              <User size={16} />
              Daftar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT SIDE - INFO */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white hidden lg:flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Selamat Datang Kembali!</h2>
                <p className="text-blue-100 mb-8">
                  Masuk ke akun guru Anda untuk mengakses dashboard, materi, dan manajemen kelas.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Dashboard Lengkap</p>
                      <p className="text-sm text-blue-200">Pantau perkembangan siswa secara real-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Manajemen Kelas</p>
                      <p className="text-sm text-blue-200">Kelola materi dan tugas dengan mudah</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Keamanan Terjamin</p>
                      <p className="text-sm text-blue-200">Data Anda terlindungi dengan enkripsi</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-200">
                  Belum punya akun?{" "}
                  <Link to="/register-guru" className="text-white font-semibold underline hover:no-underline">
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <LogIn className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Masuk ke Akun Guru</h2>
                  <p className="text-gray-600">Masukkan kredensial Anda untuk melanjutkan</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 flex items-center gap-2">
                    <Shield size={18} />
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      Alamat Email
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@contoh.com"
                      required
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <Lock size={16} />
                        Kata Sandi
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {showPassword ? "Sembunyikan" : "Tampilkan"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                      Ingat saya
                    </label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Masuk ke Dashboard
                    </>
                  )}
                </button>

                {/* DIVIDER */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Atau lanjutkan dengan</span>
                  </div>
                </div>

                {/* SOCIAL LOGIN */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  
                  <button
                    type="button"
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-3.862c0-1.881-2.002-1.722-2.002 0v3.862h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                    </svg>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                </div>

                {/* REGISTER LINK */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Belum punya akun?{" "}
                    <Link 
                      to="/register-guru" 
                      className="text-blue-600 font-semibold hover:text-blue-700 hover:underline flex items-center gap-1 justify-center"
                    >
                      Daftar akun guru
                      <ArrowRight size={16} />
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} EduCore. Hak cipta dilindungi.</p>
          <p className="mt-1">Portal Login Guru - Akses dashboard dan manajemen kelas</p>
        </div>
      </footer>
    </div>
  );
}