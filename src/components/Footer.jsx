import { Instagram, Twitter, Facebook, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-red text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2">
            <Instagram size={14} />
            <span>@houseofmertua</span>
          </div>
          <div className="flex items-center gap-2">
            <span>WA: +62 812-3456-7890</span>
          </div>
        </div>

        <div className="text-xl font-black italic tracking-tighter">
          HOUSE OF MERTUA
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
          &copy; 2026 House of Mertua Restaurant Group
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="h-2 bg-white/20 w-full" />
    </footer>
  );
}
