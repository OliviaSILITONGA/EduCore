// File: Dashboard.jsx

import React, { useContext } from "react";
import { NavigationContext } from "../App";

export default function Dashboard() {
  const { setCurrentPage } = useContext(NavigationContext);

  // Data Dummy untuk Dashboard
  const enrolledCourses = [
    { id: 1, title: "Pemrograman Dasar", progress: 75, due: "2 Kuis Tertunda" },
    { id: 2, title: "Struktur Data", progress: 50, due: "Materi Baru Tersedia" },
    { id: 3, title: "Basis Data", progress: 90, due: "Tugas Akhir Mendekati" },
  ];

  const upcomingQuizzes = [
    { id: 1, title: "Kuis Pemrograman Dasar - Chapter 2", course: "Pemrograman Dasar", deadline: "Besok, 11:00" },
    { id: 2, title: "Kuis Struktur Data - Tree", course: "Struktur Data", deadline: "2 Hari Lagi" },
  ];

  const notifications = [
    { id: 1, message: "Nilai Pemrograman Dasar sudah diumumkan.", type: "success" },
    { id: 2, message: "Materi baru 'Sorting Algorithms' tersedia di Struktur Data.", type: "info" },
  ];

  const renderNotifications = () => (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ marginBottom: 16, color: "var(--text)" }}>🔔 Notifikasi Terbaru</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {notifications.map(notif => (
          <div 
            key={notif.id}
            style={{ 
              padding: 12, 
              borderRadius: 8, 
              background: notif.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(33, 150, 243, 0.1)',
              borderLeft: notif.type === 'success' ? '4px solid #4CAF50' : '4px solid #2196F3',
              color: 'var(--text)',
              fontSize: '0.95rem'
            }}
          >
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ marginBottom: 16, color: "var(--text)" }}>📚 Kelas Saya</h3>
      <div className="card-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 20 
      }}>
        {enrolledCourses.map(course => (
          <div key={course.id} className="card" style={{ padding: 20, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h4 style={{ color: "var(--primary-start)", marginBottom: 8 }}>{course.title}</h4>
            <p style={{ color: "var(--muted)", fontSize: '0.9rem', marginBottom: 16 }}>{course.due}</p>
            
            <div style={{ marginBottom: 8, fontSize: '0.85rem' }}>Progres: {course.progress}%</div>
            <div style={{ height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 4 }}>
              <div 
                style={{ 
                  width: `${course.progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #6C2BDD, #8a4bff)', // Primary gradient
                  borderRadius: 4, 
                  transition: 'width 0.5s' 
                }}
              ></div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage("kelas")}
              style={{ marginTop: 16, width: '100%', padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer' }}
            >
              Lanjutkan Belajar
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizzes = () => (
    <div>
      <h3 style={{ marginBottom: 16, color: "var(--text)" }}>📝 Kuis Mendatang</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {upcomingQuizzes.map(quiz => (
          <div key={quiz.id} style={{ 
            padding: 15, 
            borderRadius: 8, 
            background: 'rgba(108, 43, 221, 0.1)', 
            border: '1px solid rgba(108, 43, 221, 0.3)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <strong style={{ color: "var(--text)" }}>{quiz.title}</strong>
              <p style={{ color: "var(--muted)", fontSize: '0.9rem', marginTop: 4 }}>{quiz.course}</p>
            </div>
            <span style={{ 
              color: "#FF9800", 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              padding: '4px 8px', 
              borderRadius: 6, 
              background: 'rgba(255, 152, 0, 0.1)' 
            }}>
              {quiz.deadline}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container" style={{ padding: "60px 20px" }}>
      <h1 style={{ marginBottom: 40, fontSize: '2.5rem', color: 'var(--primary-start)' }}>
        Selamat Datang Kembali!
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 350px', 
        gap: 40,
        // Responsive CSS sederhana
        // Agar terlihat di web, Anda mungkin perlu memindahkan ini ke file CSS global
        '@media (maxWidth: 900px)': { 
            gridTemplateColumns: '1fr',
        }
      }}>
        {/* Kolom Kiri: Kelas dan Kuis */}
        <div>
          {renderCourses()}
          {renderQuizzes()}
        </div>

        {/* Kolom Kanan: Notifikasi */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: 20, borderRadius: 12, height: 'fit-content', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {renderNotifications()}
          <button 
            onClick={() => setCurrentPage("kuis")} 
            style={{ 
              width: '100%', 
              marginTop: 10, 
              padding: '10px 0', 
              background: 'transparent', 
              border: '1px solid var(--muted)', 
              color: 'var(--muted)', 
              borderRadius: 8, 
              cursor: 'pointer' 
            }}
          >
            Lihat Semua Kuis
          </button>
        </div>
      </div>
    </main>
  );
}