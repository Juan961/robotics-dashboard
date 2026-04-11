// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Roboto: true,
      "Space Grotesk": true
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          "colors": {
            "surface-tint": "#00dbe9",
            "on-error-container": "#ffdad6",
            "on-surface-variant": "#b9cacb",
            "on-tertiary-container": "#b42800",
            "on-tertiary-fixed": "#3c0700",
            "primary-fixed-dim": "#00dbe9",
            "surface-container-high": "#272a31",
            "outline-variant": "#3b494b",
            "outline": "#849495",
            "error": "#ffb4ab",
            "background": "#10131a",
            "on-background": "#e1e2eb",
            "surface-bright": "#363940",
            "on-secondary-fixed-variant": "#3c4857",
            "surface-dim": "#10131a",
            "surface-container-lowest": "#0b0e14",
            "on-error": "#690005",
            "inverse-on-surface": "#2e3037",
            "primary": "#dbfcff",
            "on-tertiary": "#621100",
            "secondary": "#bbc7da",
            "secondary-fixed-dim": "#bbc7da",
            "inverse-surface": "#e1e2eb",
            "on-tertiary-fixed-variant": "#8a1d00",
            "surface-variant": "#32353c",
            "secondary-container": "#3e4a59",
            "on-primary": "#00363a",
            "surface": "#10131a",
            "inverse-primary": "#006970",
            "tertiary-container": "#ffcec2",
            "on-primary-container": "#006970",
            "on-secondary-container": "#adb9cc",
            "on-secondary-fixed": "#101c2a",
            "surface-container-highest": "#32353c",
            "tertiary": "#fff3f0",
            "tertiary-fixed": "#ffdad2",
            "primary-container": "#00f0ff",
            "surface-container-low": "#191c22",
            "primary-fixed": "#7df4ff",
            "surface-container": "#1d2026",
            "on-surface": "#e1e2eb",
            "error-container": "#93000a",
            "tertiary-fixed-dim": "#ffb4a2",
            "secondary-fixed": "#d7e3f7",
            "on-secondary": "#253140",
            "on-primary-fixed": "#002022",
            "on-primary-fixed-variant": "#004f54"
          },
          "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          "fontFamily": {
            "headline": ["Space Grotesk"],
            "body": ["Inter"],
            "label": ["Inter"],
            "mono": ["Roboto Mono"]
          }
        }
      }
    }
  }
})