import { useMemo } from "react";
import { backgroundConfig as cfg } from "./backgroundConfig";

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default function BackgroundGraphics() {
    if (!cfg.enabled) return null;

    const rain = useMemo(() => {
        if (!cfg.rain.enabled) return [];
        const items = [];
        const angle = (cfg.rain.angleDeg * Math.PI) / 180;
        for (let i = 0; i < cfg.rain.count; i++) {
            items.push({
                x: Math.random(),
                y: Math.random(),
                len: rand(cfg.rain.lengthPx[0], cfg.rain.lengthPx[1]),
                rot: cfg.rain.angleDeg,
                delay: rand(0, cfg.rain.speedSec),
                speed: cfg.rain.speedSec * rand(0.8, 1.2),
            });
        }
        return { angle, items };
    }, []);

    const clouds = useMemo(() => {
        if (!cfg.clouds.enabled) return [];
        // Simple cloud stencil made of circular dots positions
        const stencil: { x: number; y: number }[] = [];
        const w = 20, h = 10;
        for (let ix = 0; ix < w; ix++) {
            for (let iy = 0; iy < h; iy++) {
                // ellipse mask
                const nx = (ix - w / 2) / (w / 2);
                const ny = (iy - h / 2) / (h / 2);
                if (nx * nx + ny * ny < 1.0) stencil.push({ x: ix, y: iy });
            }
        }
        return { stencil };
    }, []);

    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                opacity: cfg.opacity,
                zIndex: 0,
            }}
        >
            {/* Rain layer */}
            {cfg.rain.enabled && (
                <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                    {rain.items.map((r, i) => (
                        <line
                            key={i}
                            x1={`${r.x * 100}%`}
                            y1={`${r.y * 100}%`}
                            x2={`${r.x * 100 + Math.cos(r.rot * Math.PI / 180) * r.len}px`}
                            y2={`${r.y * 100 + Math.sin(r.rot * Math.PI / 180) * r.len}px`}
                            stroke="rgba(255,255,255,0.7)"
                            strokeWidth={cfg.rain.widthPx}
                        >
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur={`${r.speed}s`}
                                begin={`${r.delay}s;${r.delay + r.speed}s`}
                                repeatCount="indefinite"
                            />
                        </line>
                    ))}
                </svg>
            )}

            {/* Clouds layer */}
            {cfg.clouds.enabled &&
                cfg.clouds.instances.map((c, idx) => (
                    <svg
                        key={idx}
                        width={300 * c.scale}
                        height={150 * c.scale}
                        style={{
                            position: "absolute",
                            left: `calc(${c.x * 100}% - ${150 * c.scale}px)`,
                            top: `calc(${c.y * 100}% - ${75 * c.scale}px)`,
                        }}
                    >
                        {clouds.stencil.map((p, i) => {
                            const jitterX = (Math.random() - 0.5) * cfg.clouds.jitter * cfg.clouds.dotSpacing;
                            const jitterY = (Math.random() - 0.5) * cfg.clouds.jitter * cfg.clouds.dotSpacing;
                            const cx = p.x * cfg.clouds.dotSpacing + jitterX;
                            const cy = p.y * cfg.clouds.dotSpacing + jitterY;
                            return (
                                <circle key={i} cx={cx} cy={cy} r={cfg.clouds.dotSize} fill="white">
                                    <animate
                                        attributeName="opacity"
                                        values="0.6;0.9;0.6"
                                        dur={`${cfg.clouds.floatSpeedSec + (i % 7) * 0.3}s`}
                                        begin={`${(i % 13) * 0.2}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            );
                        })}
                    </svg>
                ))}
        </div>
    );
}