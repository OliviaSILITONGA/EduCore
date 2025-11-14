import React, { useState, createContext } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CourseList from "./components/CourseList";
import LoginRegister from "./components/LoginRegister";
import RoleSelection from "./components/RoleSelection";
import Kelas from "./components/Kelas";
import Kuis from "./components/Kuis";
import Dosen from "./components/Dosen";
import Dashboard from "./components/Dashboard"; // <--- IMPOR BARU

export const NavigationContext = createContext();

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <AnimatedBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Header />
          <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px" }}>
            {currentPage === "home" && (
              <>
                <Hero />
                <CourseList />
              </>
            )}
            
            {currentPage === "dashboard" && <Dashboard />} {/* <--- KONDISI RENDERING BARU */}
            
            {currentPage === "roleSelection" && <RoleSelection />}
            {currentPage === "loginRegister" && <LoginRegister />}
            {currentPage === "kelas" && <Kelas />}
            {currentPage === "kuis" && <Kuis />}
            {currentPage === "dosen" && <Dosen />}
          </main>
          <Footer />
        </div>
      </div>
    </NavigationContext.Provider>
  );
}