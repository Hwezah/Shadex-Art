"use client";

import { useEffect, useId, useState } from "react";

const W = 1600;
const H = 900;

const PAINTS = ["#e63946", "#ff7a00", "#ffc300", "#16a34a", "#06b6d4", "#1d4ed8", "#7c3aed", "#d61f9c", "#ff4d6d"];

/** Small seeded PRNG so a given seed always paints the same canvas. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Splat = {
  color: string;
  blobs: { cx: number; cy: number; r: number }[];
  drops: { cx: number; cy: number; r: number }[];
  streaks: { cx: number; cy: number; rx: number; ry: number; angle: number }[];
  drips: { x: number; y: number; w: number; h: number }[];
};

function paint(seed: number) {
  const rand = mulberry32(seed);
  const pick = <T,>(xs: T[]) => xs[Math.floor(rand() * xs.length)];
  const splats: Splat[] = [];

  const count = 9 + Math.floor(rand() * 5);
  for (let i = 0; i < count; i++) {
    const cx = rand() * W;
    const cy = rand() * H;
    const r = 34 + rand() ** 2 * 120;

    // Core: a few overlapping blobs make an irregular puddle.
    const blobs = [{ cx, cy, r }];
    for (let k = 0, n = 2 + Math.floor(rand() * 4); k < n; k++) {
      const a = rand() * Math.PI * 2;
      const d = rand() * r * 0.6;
      blobs.push({ cx: cx + Math.cos(a) * d, cy: cy + Math.sin(a) * d, r: r * (0.35 + rand() * 0.35) });
    }

    // Droplets thrown outward, smaller the further they fly.
    const drops = [];
    for (let k = 0, n = 10 + Math.floor(rand() * 20); k < n; k++) {
      const a = rand() * Math.PI * 2;
      const t = rand() ** 1.5;
      const d = r * (1.05 + t * 1.8);
      drops.push({ cx: cx + Math.cos(a) * d, cy: cy + Math.sin(a) * d, r: Math.max(1.5, r * (0.02 + rand() * 0.11) * (1 - t * 0.6)) });
    }

    // Streaks: elongated flicks radiating from the impact.
    const streaks = [];
    for (let k = 0, n = 2 + Math.floor(rand() * 5); k < n; k++) {
      const a = rand() * Math.PI * 2;
      const rx = r * (0.3 + rand() * 0.6);
      const d = r * 0.85 + rx * 0.6;
      streaks.push({ cx: cx + Math.cos(a) * d, cy: cy + Math.sin(a) * d, rx, ry: r * (0.04 + rand() * 0.06), angle: (a * 180) / Math.PI });
    }

    // Some splats run: drips down the canvas.
    const drips = [];
    if (rand() < 0.45) {
      for (let k = 0, n = 1 + Math.floor(rand() * 2); k < n; k++) {
        const w = r * (0.06 + rand() * 0.06);
        drips.push({ x: cx + (rand() - 0.5) * r * 1.2, y: cy, w, h: r * (0.7 + rand() * 1.6) });
      }
    }

    splats.push({ color: pick(PAINTS), blobs, drops, streaks, drips });
  }

  // Loose flecks across the whole canvas.
  const flecks = Array.from({ length: 60 }, () => ({
    cx: rand() * W,
    cy: rand() * H,
    r: 1 + rand() * 3.5,
    color: pick(PAINTS),
  }));

  return { splats, flecks };
}

/**
 * Painter's canvas shown behind the hero image before it wipes in:
 * linen weave + bright, randomly placed paint splatters (new each visit).
 */
export function PaintCanvas({ className }: { className?: string }) {
  // Fixed seed for the server render; re-rolled on the client after mount
  // (still under the page-open curtain) so every visit gets a new canvas.
  const [seed, setSeed] = useState(7);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSeed(Math.floor(Math.random() * 1e9)));
    return () => cancelAnimationFrame(id);
  }, []);

  const uid = useId().replace(/:/g, "");
  const { splats, flecks } = paint(seed);

  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundColor: "#f3eee4",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(60,45,30,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(60,45,30,0.05) 0 1px, transparent 1px 3px)",
      }}
    >
      <svg className="absolute inset-0 size-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Ragged paint edges */}
          <filter id={`splat-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed={seed % 1000} />
            <feDisplacementMap in="SourceGraphic" scale="26" />
          </filter>
          {/* Canvas grain over everything, paint included */}
          <filter id={`grain-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0.55 0" />
          </filter>
        </defs>

        <g style={{ mixBlendMode: "multiply" }} opacity={0.92}>
          {splats.map((s, i) => (
            <g key={i} fill={s.color} filter={`url(#splat-${uid})`}>
              {s.blobs.map((b, k) => (
                <circle key={`b${k}`} cx={b.cx} cy={b.cy} r={b.r} />
              ))}
              {s.streaks.map((t, k) => (
                <ellipse key={`s${k}`} cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} transform={`rotate(${t.angle} ${t.cx} ${t.cy})`} />
              ))}
              {s.drips.map((d, k) => (
                <g key={`d${k}`}>
                  <rect x={d.x - d.w / 2} y={d.y} width={d.w} height={d.h} />
                  <circle cx={d.x} cy={d.y + d.h} r={d.w * 0.9} />
                </g>
              ))}
              {s.drops.map((d, k) => (
                <circle key={`p${k}`} cx={d.cx} cy={d.cy} r={d.r} />
              ))}
            </g>
          ))}
          {flecks.map((f, i) => (
            <circle key={`f${i}`} cx={f.cx} cy={f.cy} r={f.r} fill={f.color} />
          ))}
        </g>

        <rect width={W} height={H} filter={`url(#grain-${uid})`} opacity={0.18} />
      </svg>
    </div>
  );
}
