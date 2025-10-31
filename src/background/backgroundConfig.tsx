// Configuration for decorative background graphics.
// Tweak values here only.

export const backgroundConfig = {
    enabled: true,
    // Overall opacity of all effects
    opacity: 0.15,
    // Diagonal "rain" lines
    rain: {
        enabled: true,
        count: 80,          // number of streaks
        angleDeg: -24,      // tilt angle
        speedSec: 6,        // animation duration (lower = faster)
        lengthPx: [40, 120],// random length range
        widthPx: 1.5,       // streak thickness
        spread: 1.2,        // area coverage multiplier
    },
    // Dotted "clouds"
    clouds: {
        enabled: true,
        instances: [
            { x: 0.18, y: 0.18, scale: 1.0 },
            { x: 0.72, y: 0.24, scale: 0.8 },
            { x: 0.62, y: 0.58, scale: 0.9 },
        ],
        dotSize: 2,
        dotSpacing: 8,
        jitter: 0.6,        // random offset for organic look
        floatSpeedSec: 12,  // slow breathing animation
    },
};