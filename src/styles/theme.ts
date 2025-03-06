export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
    background: {
      main: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
    },
    border: {
      light: '#e2e8f0',
      default: '#cbd5e1',
      dark: '#94a3b8',
    },
    success: {
      light: '#dcfce7',
      main: '#22c55e',
      dark: '#16a34a',
    },
    error: {
      light: '#fee2e2',
      main: '#ef4444',
      dark: '#dc2626',
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
  fontPrimary: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
  colorPrimary: "#0f172a",
  colorAccent: "#0ea5e9",
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px"
  }
}

export const transitions = {
  default: "all 0.3s ease-in-out",
  slow: "all 0.5s ease-in-out",
  fast: "all 0.2s ease-in-out"
}

export const zIndices = {
  navigation: 100,
  modal: 200,
  chat: 300
} 