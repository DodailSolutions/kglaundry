'use client';

import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  rotation: number;
  rotSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

export default function ServiceSparkles({
  className = 'absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || 900;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    // Mouse tracking
    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // 16 clearly visible, well-spaced sparkle stars across the section
    const sparkleCount = 16;
    const sparkles: Sparkle[] = [];

    for (let i = 0; i < sparkleCount; i++) {
      // Distribute evenly in columns & rows with random jitter so they cover the whole section
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = (col + 0.5) * (width / 4) + (Math.random() - 0.5) * (width / 5);
      const y = (row + 0.5) * (height / 4) + (Math.random() - 0.5) * (height / 5);
      const baseRadius = 14 + Math.random() * 8; // Prominent, clearly visible size (28-44px star)

      sparkles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseRadius,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.03,
      });
    }

    // Helper: draw clearly visible 4-pointed sparkle star
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      outerRadius: number,
      rot: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.globalAlpha = Math.max(0.4, Math.min(1.0, alpha));

      const r = outerRadius;
      const curve = r * 0.22; // pinched waist for classic 4-point sparkle

      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, -curve, curve, 0);
      ctx.lineTo(r, 0);
      ctx.quadraticCurveTo(curve, 0, 0, curve);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, curve, -curve, 0);
      ctx.lineTo(-r, 0);
      ctx.quadraticCurveTo(-curve, 0, 0, -curve);
      ctx.closePath();

      // Glowing bright white body
      ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Soft subtle outline to ensure it pops on #6EC5B8 mint background
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Bright center core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];

        // Slow floating drift
        s.baseX += s.vx;
        s.baseY += s.vy;

        if (s.baseX < -40) s.baseX = width + 40;
        if (s.baseX > width + 40) s.baseX = -40;
        if (s.baseY < -40) s.baseY = height + 40;
        if (s.baseY > height + 40) s.baseY = -40;

        let targetX = s.baseX;
        let targetY = s.baseY;

        // Interactive mouse movement: gentle repulsion and rotation
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 40;
            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * force;
            targetY -= Math.sin(angle) * force;
            s.rotation += 0.04 * (1 - dist / maxDist);
          }
        }

        s.x += (targetX - s.x) * 0.08;
        s.y += (targetY - s.y) * 0.08;
        s.rotation += s.rotSpeed;

        // Twinkle pulse
        s.twinklePhase += s.twinkleSpeed;
        const pulse = 0.75 + 0.35 * Math.sin(s.twinklePhase);
        const currentRadius = s.baseRadius * pulse;
        const currentAlpha = 0.7 + 0.3 * Math.sin(s.twinklePhase);

        drawStar(ctx, s.x, s.y, currentRadius, s.rotation, currentAlpha);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
