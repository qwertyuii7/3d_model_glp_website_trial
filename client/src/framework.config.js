
export const frameworkConfig = {
  branding: {
    name: "Natural History Museum",
    exhibitionTitle: "Hintze Hall",
    subtitle: "Interactive 3D Exhibition",
    logoText: "NHM • LONDON",
  },
  theme: {
    colors: {
      bg: "#0a0a0a",
      surface: "rgba(20, 20, 20, 0.45)",
      surfaceHover: "rgba(35, 35, 35, 0.65)",
      border: "rgba(255, 255, 255, 0.08)",
      borderActive: "rgba(255, 255, 255, 0.25)",
      textPrimary: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.65)",
      textMuted: "rgba(255, 255, 255, 0.4)",
      accent: "#38bdf8",
      accentGlow: "rgba(56, 189, 248, 0.25)",
    },
    blur: "22px",
    radius: "24px",
  },
  lightingPresets: {
    neutral: {
      exposure: "1",
      shadowIntensity: "1",
      environmentImage: "neutral",
      toneMapping: "aces",
    },
    legacy: {
      exposure: "0.85",
      shadowIntensity: "1.5",
      environmentImage: "legacy",
      toneMapping: "commerce",
    },
    sunset: {
      exposure: "1.15",
      shadowIntensity: "0.8",
      environmentImage: "neutral",
      toneMapping: "aces",
    },
  },
  transitions: {
    cameraDuration: 1800,
    cameraEasing: "easeInOutCubic",
    uiDuration: 0.6,
  },
  accessibility: {
    reducedMotionCameraDuration: 400,
    ariaLive: "polite",
  },
  performance: {
    lazyLoadCardsWindow: 1,
    intersectionThreshold: 0.6,
  },
  plugins: {
    miniMap: true,
    lightingToggle: true,
    screenshotMode: true,
    developerHUD: true,
    ambientAudio: true,
  },
};
