"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";

export function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0) scale(1)" : "translateY(32px) scale(0.98)",
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

export function Counter({ end, suffix = "", prefix = "", decimals = 0 }: {
  end: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const [ref, inV] = useInView();
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!inV) return;
    let v = 0; const step = end / 140;
    const t = setInterval(() => {
      v += step;
      if (v >= end) { setC(end); clearInterval(t); }
      else setC(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inV, end, decimals]);
  return <span ref={ref}>{prefix}{decimals > 0 ? c.toFixed(decimals) : c}{suffix}</span>;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.01)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)"; };
  return (
    <div ref={ref} className={className}
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
  );
}

export function MeshBG() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] -top-[20%] h-[800px] w-[800px] animate-[meshA_20s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.07),transparent_70%)] blur-[80px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] animate-[meshB_25s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.04),transparent_70%)] blur-[80px]" />
      <div className="absolute right-[20%] top-[30%] h-[400px] w-[400px] animate-[meshA_18s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04),transparent_70%)] blur-[60px]" />
      <style>{`
        @keyframes meshA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.05)}66%{transform:translate(-30px,20px) scale(0.95)}}
        @keyframes meshB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,30px) scale(1.08)}}
      `}</style>
    </div>
  );
}

export function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(0);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let w: number, h: number, cols: number, rows: number;
    const sp = 28;
    function resize() { w = c!.width = c!.offsetWidth * 2; h = c!.height = c!.offsetHeight * 2; ctx.setTransform(2,0,0,2,0,0); cols = Math.ceil(c!.offsetWidth / sp); rows = Math.ceil(c!.offsetHeight / sp); }
    function draw() {
      ctx.clearRect(0, 0, w / 2, h / 2);
      const mx = mouse.current.x, my = mouse.current.y;
      for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) {
        const x = i * sp, y = j * sp, dx = mx - x, dy = my - y, d = Math.sqrt(dx*dx+dy*dy), t = Math.max(0, 1 - d / 160), r = 0.7 + 2.8 * t * t;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = t > 0 ? `rgba(139,92,246,${0.1+0.5*t*t})` : "rgba(255,255,255,0.035)"; ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    }
    const onM = (e: MouseEvent) => { const b = c!.getBoundingClientRect(); mouse.current = { x: e.clientX - b.left, y: e.clientY - b.top }; };
    const onL = () => { mouse.current = { x: -1000, y: -1000 }; };
    resize(); draw();
    window.addEventListener("resize", resize); c.addEventListener("mousemove", onM); c.addEventListener("mouseleave", onL);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); c.removeEventListener("mousemove", onM); c.removeEventListener("mouseleave", onL); };
  }, []);
  return <canvas ref={ref} className="pointer-events-auto absolute inset-0 h-full w-full" />;
}
