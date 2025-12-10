/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        secondary: "#8b5cf6", 
        "secondary-foreground": "#ffffff",
        accent: "#f3f4f6",
        "accent-foreground": "#111827",
        success: "#10b981", 
        warning: "#f59e0b", 
        input: "#f9fafb",
        border: "#e5e7eb", 
        ring: "#2563eb",
        muted: "#e5e7eb", 
        "muted-foreground": "#6b7280",
      },
    }
  },
  plugins: [],
};
