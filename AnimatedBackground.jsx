import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Mathematical formulas and symbols
    const formulas = [
      "∫",
      "∑",
      "√",
      "π",
      "∞",
      "≈",
      "∆",
      "∇",
      "α",
      "β",
      "γ",
      "θ",
      "λ",
      "μ",
      "σ",
      "ε",
      "d/dx",
      "∂",
      "∄",
      "∈",
      "∉",
      "⊆",
      "⊇",
      "∩",
      "∪",
      "x²",
      "e^x",
      "log",
      "sin",
      "cos",
      "tan",
    ];

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < 25; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
          opacity: Math.random() * 0.5 + 0.3,
          formula: formulas[Math.floor(Math.random() * formulas.length)],
          size: Math.random() * 14 + 10,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };
    initParticles();

    // Mouse move tracking
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      // Clear canvas with dark blue background
      ctx.fillStyle = "#0a1628";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient overlay
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(10, 22, 40, 0.95)");
      gradient.addColorStop(0.5, "rgba(15, 30, 55, 0.95)");
      gradient.addColorStop(1, "rgba(10, 22, 40, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle, idx) => {
        // Calculate distance from mouse
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Repel from mouse
        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const repulseStrength = (1 - distance / maxDistance) * 2;
          particle.vx -= Math.cos(angle) * repulseStrength;
          particle.vy -= Math.sin(angle) * repulseStrength;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Pulse effect
        particle.pulsePhase += 0.02;
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;

        // Draw particle circle
        ctx.fillStyle = `rgba(147, 112, 219, ${
          particle.opacity * pulse * 0.6
        })`;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulse,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw formula text
        ctx.font = `bold ${particle.size * pulse}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(100, 200, 255, ${
          particle.opacity * pulse * 0.8
        })`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.formula, particle.x, particle.y);
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.2;
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
