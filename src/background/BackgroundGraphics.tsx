
import {useMemo, useRef, useEffect, useState} from "react";
import {backgroundConfig as cfg} from "./backgroundConfig";

type RainItem = {
    x: number;
    y: number;
    endX: number;
    endY: number;
    speed: number;
    id: number;
    startTime: number; // Track when this drop was created
};

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function generateRainDrop(angle: number, startTime: number): RainItem {
    const startX = rand(0, 100);
    const startY = rand(0, 100);
    const len = rand(cfg.rain.lengthPx[0], cfg.rain.lengthPx[1]);

    const lenX = (len / 10);
    const lenY = (len / 10);

    return {
        x: startX,
        y: startY,
        endX: startX + Math.cos(angle) * lenX,
        endY: startY + Math.sin(angle) * lenY,
        speed: cfg.rain.speedSec * rand(0.8, 1.2),
        id: startTime, // Use timestamp as unique ID
        startTime,
    };
}

export default function BackgroundGraphics() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [rain, setRain] = useState<RainItem[]>([]);

    useEffect(() => {
        if (cfg.video.enabled && videoRef.current) {
            const video = videoRef.current;

            const attemptPlay = () => {
                video.playbackRate = cfg.video.playbackRate;
                video.muted = true;
                video.play()
                    .then(() => console.log("✓ Video playing"))
                    .catch((err) => {
                        console.warn("⚠ Video autoplay blocked:", err.message);
                        // Retry on any user interaction
                        const retry = () => {
                            video.play().then(() => {
                                console.log("✓ Video resumed after interaction");
                                document.removeEventListener("click", retry);
                                document.removeEventListener("touchstart", retry);
                                document.removeEventListener("keydown", retry);
                            });
                        };
                        document.addEventListener("click", retry, {once: true});
                        document.addEventListener("touchstart", retry, {once: true});
                        document.addEventListener("keydown", retry, {once: true});
                    });
            };

            // Try immediately and when loaded
            if (video.readyState >= 3) {
                attemptPlay();
            } else {
                video.addEventListener("canplay", attemptPlay, {once: true});
            }

            return () => {
                video.pause();
            };
        }
    }, []);

    // Initialize and manage rain drops
    useEffect(() => {
        if (!cfg.rain.enabled) return;

        const angle = (cfg.rain.angleDeg * Math.PI) / 180;
        const initialRain: RainItem[] = [];
        const now = Date.now();

        // Create initial rain drops with staggered start times
        for (let i = 0; i < cfg.rain.count; i++) {
            initialRain.push(generateRainDrop(angle, now + i));
        }

        setRain(initialRain);

        // Set up interval to replace drops
        const interval = setInterval(() => {
            setRain((prev) => {
                const now = Date.now();
                const newRain = [...prev];
                let replaced = false;

                // Find drops that should be replaced (older than their speed duration)
                for (let i = 0; i < newRain.length; i++) {
                    const drop = newRain[i];
                    const age = (now - drop.startTime) / 1000; // Convert to seconds

                    if (age >= drop.speed) {
                        // Replace this drop
                        newRain[i] = generateRainDrop(angle, now);
                        replaced = true;
                        break; // Only replace one drop per interval check
                    }
                }

                return replaced ? newRain : prev;
            });
        }, 100); // Check every 100ms

        return () => {
            clearInterval(interval);
        };
    }, []);

    const clouds = useMemo((): { stencil: { x: number; y: number }[] } => {
        if (!cfg.clouds.enabled) return {stencil: []};
        const stencil: { x: number; y: number }[] = [];
        const w = 20, h = 10;
        for (let ix = 0; ix < w; ix++) {
            for (let iy = 0; iy < h; iy++) {
                const nx = (ix - w / 2) / (w / 2);
                const ny = (iy - h / 2) / (h / 2);
                if (nx * nx + ny * ny < 1.0) stencil.push({x: ix, y: iy});
            }
        }
        return {stencil};
    }, []);

    // Early return AFTER all hooks
    if (!cfg.enabled) return null;

    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
                overflow: "hidden",
            }}
        >
            {/* Video layer */}
            {cfg.video.enabled && (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: cfg.video.objectFit as never,
                        opacity: cfg.video.opacity,
                    }}
                    onLoadedData={() => console.log("Video data loaded")}
                    onError={(e) => console.error("Video error:", e)}
                >
                    <source src={cfg.video.src} type="video/mp4"/>
                </video>
            )}

            {/* Rain + Clouds overlays with original opacity */}
            <div style={{position: "absolute", inset: 0, opacity: cfg.opacity}}>
                {/* Rain layer */}
                {cfg.rain.enabled && (
                    <svg width="100%" height="100%" style={{position: "absolute", inset: 0}}>
                        {rain.map((r: RainItem) => (
                            <line
                                key={r.id}
                                x1={`${r.x}%`}
                                y1={`${r.y}%`}
                                x2={`${r.endX}%`}
                                y2={`${r.endY}%`}
                                stroke="rgba(255,255,255,0.7)"
                                strokeWidth={cfg.rain.widthPx}
                            >
                                <animate
                                    attributeName="opacity"
                                    values="0;1;0"
                                    dur={`${r.speed}s`}
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
        </div>
    );
}