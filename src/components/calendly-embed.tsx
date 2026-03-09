"use client";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

const URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/iyadbaker";

export function CalendlyEmbed() {
  useEffect(() => { const s = document.createElement("script"); s.src = "https://assets.calendly.com/assets/external/widget.js"; s.async = true; document.body.appendChild(s); return () => { document.body.removeChild(s); }; }, []);
  return (
    <div>
      <div className="calendly-inline-widget overflow-hidden rounded-xl" data-url={`${URL}?hide_gdpr_banner=1&background_color=0C0C14&text_color=8E8EA0&primary_color=C8FF00`} style={{ minWidth: 280, height: 660 }} />
      <a href={URL} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 text-[13px] text-accent/80 transition-colors duration-200 hover:text-accent sm:hidden">Open Calendly <ExternalLink className="h-3.5 w-3.5" /></a>
    </div>
  );
}
