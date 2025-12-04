import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useTeacherProfile from "../hooks/useTeacherProfile";
import {
  Menu,
  X,
  Home,
  Users,
  User,
  BookOpen,
  ChevronRight,
  BarChart3,
  Bell,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Filter,
  Download,
  MessageSquare
} from "lucide-react";

import Makima from "../assets/images/Ellipse_14.png";
import Logo from "../assets/images/Educore_Logo_White.png";

// IMPORT GAMBAR
import mtk from "../assets/images/mtk.jpg";
import indo from "../assets/images/B.indo.jpg";
import inggris from "../assets/images/B.inggris.jpg";
import biologi from "../assets/images/biologi.jpg";
import kimia from "../assets/images/kimia.jpg";
import fisika from "../assets/images/fisika.jpg";
import geografi from "../assets/images/geografi.jpg";
import ekonomi from "../assets/images/ekonomi.jpg";
import sejarah from "../assets/images/sejarah.jpg";

export default function BerandaGuru() {
  const navigate = useNavigate();
  const { profile } = useTeacherProfile();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const subjects = [
    { title: "Matematika", img: mtk, color: "from-blue-500 to-cyan-500" },
    { title: "Bahasa Indonesia", img: indo, color: "from-emerald-500 to-teal-500" },
    { title: "Bahasa Inggris", img: inggris, color: "from-purple-500 to-pink-500" },
    { title: "Biologi", img: biologi, color: "from-green-500 to-lime-500" },
    { title: "Kimia", img: kimia, color: "from-orange-500 to-amber-500" },
    { title: "Fisika", img: fisika, color: "from-red-500 to-rose-500" },
    { title: "Geografi", img: geografi, color: "from-indigo-500 to-blue-500" },
    { title: "Ekonomi", img: ekonomi, color: "from-yellow-500 to-orange-500" },
    { title: "Sejarah", img: sejarah, color: "from-gray-700 to-gray-900" },
  ];

  // Stats akan terisi otomatis setelah siswa login dan memilih kelas
  const stats = {
    totalStudents: 0,
    activeClasses: subjects.length,
    completionRate: 0,
    assignmentsPending: 0
  };

  const recentActivity = [
    // Akan terisi ketika ada siswa yang bergabung atau menyelesaikan materi
  ];

  const topStudents = [
    // Akan terisi berdasarkan performa siswa
  ];

  const upcomingDeadlines = [
    // Akan terisi ketika guru membuat tugas/deadline
  ];

  const filters = [
    { id: "all", label: "Semua" },
    { id: "active", label: "Aktif" },
    { id: "pending", label: "Tertunda" },
    { id: "completed", label: "Selesai" }
  ];

  const handleCardClick = (subjectTitle) => {
    navigate(`/manajemen-kelas/${subjectTitle.toLowerCase().replace(" ", "-")}`);
  };

  const handleAddSubject = () => {
    // Fungsi untuk menambah mata pelajaran baru
    alert("Fitur tambah mata pelajaran akan datang");
  };

  const handleExportData = () => {
    // Fungsi untuk export data
    alert("Fitur export data akan datang");
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-600 to-cyan-700 text-white shadow-xl">
        <div className="p-6 flex flex-col items-center">
          <img 
            src={Logo} 
            alt="EduCore Logo" 
            className="h-10 mb-8" 
          />
          
          {/* PROFILE SECTION */}
          <button
            onClick={() => navigate("/profil-guru")}
            className="focus:outline-none hover:opacity-90 transition-all duration-200 mb-4 group"
          >
            <div className="relative">
              <img
                src={profile.foto || Makima}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 group-hover:border-white/40 transition"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
            </div>
          </button>

          <h2 className="text-xl font-bold mb-2 text-center">
            {(profile?.nama || "Guru").split(" ")[0]}
          </h2>
          <p className="text-sm text-blue-100 mb-8">
            {profile?.mata_pelajaran || "Pengajar"}
          </p>

          {/* MENU NAVIGATION */}
          <nav className="space-y-2 w-full">
            <Button
              variant="menu-active"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl"
              icon={<Home size={20} />}
            >
              Dashboard
            </Button>
            
            <Button
              variant="menu"
              onClick={() => navigate("/data-siswa")}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
              icon={<Users size={20} />}
            >
              Data Siswa
            </Button>
            
            <Button
              variant="menu"
              onClick={() => navigate("/profil-guru")}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
              icon={<User size={20} />}
            >
              Profil Guru
            </Button>
          </nav>
        </div>

        {/* FOOTER */}
        <div className="mt-auto p-6 border-t border-white/20">
          <div className="text-center">
            <p className="text-sm text-blue-100 mb-1">Siap untuk Siswa Bergabung</p>
            <p className="text-xs text-blue-200">Data akan terisi otomatis</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE HEADER */}
        <header className="md:hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                {openMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <img src={Logo} alt="Logo" className="h-8" />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Bell size={22} />
              </button>
              
              <button onClick={() => navigate("/profil-guru")} className="focus:outline-none">
                <img
                  src={profile.foto || Makima}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                  alt="Profile"
                />
              </button>
            </div>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          {openMenu && (
            <div className="bg-blue-700/95 backdrop-blur-sm px-4 py-3 space-y-2 animate-slideDown">
              <Button
                variant="menu-active"
                onClick={() => setOpenMenu(false)}
                className="w-full flex items-center gap-3"
                icon={<Home size={20} />}
              >
                Dashboard
              </Button>
              
              <Button
                variant="menu"
                onClick={() => {
                  navigate("/data-siswa");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3"
                icon={<Users size={20} />}
              >
                Data Siswa
              </Button>
              
              <Button
                variant="menu"
                onClick={() => {
                  navigate("/profil-guru");
                  setOpenMenu(false);
                }}
                className="w-full flex items-center gap-3"
                icon={<User size={20} />}
              >
                Profil Guru
              </Button>
            </div>
          )}
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* HEADER SECTION */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Dashboard Guru
                  </h1>
                  <p className="text-gray-600">
                    Selamat datang, <span className="font-semibold text-blue-600">{(profile?.nama || "Guru").split(" ")[0]}</span>!
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Cari mata pelajaran..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                    />
                  </div>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    onClick={() => alert("Kalender akan datang")}
                  >
                    <Calendar className="text-gray-600" size={22} />
                  </button>
                </div>
              </div>

              {/* STATS CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Siswa</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stats.totalStudents}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Menunggu siswa bergabung
                      </p>
                    </div>
                    <Users className="text-blue-500" size={28} />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Kelas Tersedia</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stats.activeClasses}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Mata pelajaran siap
                      </p>
                    </div>
                    <BookOpen className="text-green-500" size={28} />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tingkat Penyelesaian</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stats.completionRate}%
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Akan terisi otomatis
                      </p>
                    </div>
                    <TrendingUp className="text-purple-500" size={28} />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tugas Tertunda</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stats.assignmentsPending}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Belum ada tugas
                      </p>
                    </div>
                    <Clock className="text-amber-500" size={28} />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={handleAddSubject}
                className="flex items-center gap-2"
                icon={<Plus size={20} />}
              >
                Tambah Mata Pelajaran
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleExportData}
                className="flex items-center gap-2"
                icon={<Download size={20} />}
              >
                Export Data
              </Button>
              
              <div className="flex flex-wrap gap-2 ml-auto">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* MATA PELAJARAN SECTION */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Mata Pelajaran</h2>
                  <span className="text-sm text-gray-500">
                    {filteredSubjects.length} mata pelajaran tersedia
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSubjects.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleCardClick(item.title)}
                      className="group bg-white rounded-xl shadow-lg cursor-pointer 
                                 hover:shadow-xl transition-all duration-300 overflow-hidden
                                 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="relative overflow-hidden h-32">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-20`}></div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
                        
                        {/* STATUS SISWA */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {stats.totalStudents === 0 ? "Belum ada siswa" : `${stats.totalStudents} siswa`}
                            </span>
                          </div>
                          <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            Siap bergabung
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            Klik untuk mengelola
                          </span>
                          <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SIDEBAR CONTENT */}
              <div className="space-y-6">
                {/* RECENT ACTIVITY */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Aktivitas Terkini</h3>
                    <Bell size={20} className="text-blue-500" />
                  </div>
                  
                  <div className="text-center py-6">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Aktivitas akan muncul di sini ketika siswa mulai bergabung
                    </p>
                  </div>
                </div>

                {/* EMPTY STATE FOR TOP STUDENTS */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Siswa Terbaik</h3>
                    <BarChart3 size={24} className="text-blue-400" />
                  </div>
                  
                  <div className="text-center py-6">
                    <Users className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      Data siswa akan muncul setelah mereka bergabung dan mulai belajar
                    </p>
                  </div>
                </div>

                {/* UPCOMING DEADLINES */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Deadline Mendatang</h3>
                    <Clock size={20} className="text-amber-500" />
                  </div>
                  
                  <div className="text-center py-6">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Belum ada deadline yang ditetapkan
                    </p>
                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Buat Tugas Pertama
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* WELCOME MESSAGE */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">
                    Siap untuk Memulai Kelas?
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Dashboard ini akan terisi otomatis ketika siswa mulai bergabung ke kelas Anda. 
                    Setiap mata pelajaran sudah siap dan menunggu partisipasi siswa.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-300" />
                      <span className="text-sm">Mata pelajaran siap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-300" />
                      <span className="text-sm">Dashboard otomatis</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Users className="w-20 h-20 text-white/80 mx-auto mb-4" />
                  <p className="text-3xl font-bold">{stats.totalStudents}</p>
                  <p className="text-sm text-blue-100">Siswa akan bergabung</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} EduCore. Dashboard Guru.</p>
            <p className="mt-1">
              Data statistik akan terisi otomatis saat siswa bergabung
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}