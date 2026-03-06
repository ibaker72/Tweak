import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"], darkMode: "class",
  theme: { extend: {
    colors: {
      v: { DEFAULT:"#8B5CF6", light:"#A78BFA", deep:"#7C3AED", dim:"rgba(139,92,246,0.06)", border:"rgba(139,92,246,0.25)" },
      cyan: { DEFAULT:"#06B6D4", light:"#22D3EE", dim:"rgba(6,182,212,0.08)", border:"rgba(6,182,212,0.2)" },
      gold: "#F59E0B",
      surface: { 0:"#030305", 1:"#07070C", 2:"#0C0C14", 3:"#111119" },
      dim:"#4B4B60", body:"#8E8EA0",
    },
    fontFamily: { display:["'Outfit'","sans-serif"], body:["'Inter Tight'","sans-serif"], mono:["'Fira Code'","monospace"] },
  }},
  plugins: [],
};
export default config;
