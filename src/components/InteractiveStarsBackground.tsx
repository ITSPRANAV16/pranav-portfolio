import React, { useEffect, useRef } from 'react';

export default function InteractiveStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates for subtle pull interaction
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Generate dynamic star objects
    const starCount = Math.min(60, Math.floor((width * height) / 25000));
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      fadeSpeed: number;
      fadeDirection: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(182, 0, 168, 0.45)', // Cyber magenta
      'rgba(99, 102, 241, 0.35)', // Indigo
      'rgba(34, 211, 238, 0.3)',  // Cyan/Blue
      'rgba(255, 255, 255, 0.25)', // White
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.1,
        fadeSpeed: 0.002 + Math.random() * 0.004,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];

        // Gently update coordinates
        s1.x += s1.vx;
        s1.y += s1.vy;

        // Bounce back softly on bounds
        if (s1.x < 0 || s1.x > width) s1.vx *= -1;
        if (s1.y < 0 || s1.y > height) s1.vy *= -1;

        // Subtle pull vector to the cursor interaction
        if (mouse.x > -1000) {
          const dx = mouse.x - s1.x;
          const dy = mouse.y - s1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const pullStrength = (180 - dist) / 180 * 0.05;
            s1.x += (dx / dist) * pullStrength;
            s1.y += (dy / dist) * pullStrength;
          }
        }

        // Modulate alpha glow
        s1.alpha += s1.fadeSpeed * s1.fadeDirection;
        if (s1.alpha >= 0.7) {
          s1.fadeDirection = -1;
        } else if (s1.alpha <= 0.1) {
          s1.fadeDirection = 1;
        }

        // Fill star point
        ctx.beginPath();
        ctx.arc(s1.x, s1.y, s1.size, 0, Math.PI * 2);
        ctx.fillStyle = s1.color.replace(/[\d.]+\)$/, `${s1.alpha})`);
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacity = (110 - distance) / 110 * 0.12;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(182, 0, 168, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
