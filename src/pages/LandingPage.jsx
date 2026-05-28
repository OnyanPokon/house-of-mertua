import { motion } from "motion/react";
import { Info, Truck, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MENU_ITEMS } from "../constants";
import { ProductDetailModal } from "@/components";

export default function LandingPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 bg-brand-dark">
        {/* Background Editorial Accents */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center -z-10 overflow-hidden">
          <div className="text-huge text-brand-red opacity-[0.03] scale-150 -translate-x-1/4">
            BURGER
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-block border-l-4 border-brand-red pl-4 mb-8">
              <span className="wide-tracking text-brand-red">Established 2021 &mdash; Gorontalo, Indonesia</span>
            </div>

            <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter mb-8 italic uppercase">
              YANG <br />
              <span className="text-brand-red">DIRINDU.</span>
            </h1>

            <p className="text-sm md:text-lg text-gray-400 max-w-md mb-10 leading-relaxed font-medium">
            Burger ayam 100% daging segar tanpa frozen dan tanpa daging olahan, dipadukan dengan saus spesial dan sayuran fresh di setiap gigitan.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link
                to="/order"
                className="w-full sm:w-auto px-12 py-6 bg-brand-red text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-red-900 transition-all shadow-2xl shadow-brand-red/20"
              >
                Order Now
              </Link>
              <div className=" flex-col hidden lg:flex">
                <span className="text-[10px] uppercase tracking-widest text-white font-bold mb-1">Starting from</span>
                <span className="text-2xl font-black italic tracking-tighter">IDR 18,000</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative  justify-center items-center hidden md:flex"
          >
            <div className="absolute inset-0 bg-brand-red/10 blur-[120px] rounded-full" />
         
          </motion.div>
        </div>

        {/* Vertical Side Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-12 hidden lg:flex items-center justify-center bg-brand-dark border-l border-white/10 mt-24">
          <span className="rotate-90 whitespace-nowrap text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold">
            BEST BURGER IN TOWN &mdash; HOUSE OF MERTUA
          </span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-y border-white/5 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Siap dalam 30 Menit" },
            { icon: ShieldCheck, title: "Premium Quality", desc: "100% Daging Ayam" },
            { icon: Clock, title: "Freshly Made", desc: "Dimasak saat Pesan" },
            { icon: Info, title: "Local Pride", desc: "Dibuat di Indonesia" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="py-24 bg-brand-darker border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div className="max-w-xl">
              <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-red mb-6">Available Today</h2>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                TOP TIER <span className="text-brand-red">MODELS.</span>
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                Setiap burger dirakit secara presisi dengan standar House of Mertua.
              </p>
            </div>
          
          </div>

          <div className="grid grid-cols-1 gap-8">
            {MENU_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col md:flex-row items-center bg-white/5 hover:bg-white/10 hover:shadow-[0_30px_60px_-15px_rgba(239,68,68,0.1)] border-l-[6px] border-brand-red p-8 md:p-12 transition-all gap-10 md:gap-16 cursor-pointer relative overflow-hidden"
              >
                {/* Background Accent Text */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl md:text-[12rem] font-black italic opacity-[0.01] group-hover:opacity-[0.03] transition-all pointer-events-none uppercase tracking-tighter">
                  {item.id.split('-')[0]}
                </div>

                {/* Big Prominent Image */}
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 flex-shrink-0 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-red/10 rounded-full blur-3xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-115 filter drop-shadow-[0_20px_35px_rgba(239,68,68,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
                    <h3 className="text-2xl md:text-2xl font-black italic uppercase tracking-tight group-hover:text-brand-red transition-colors">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="inline-block self-center px-4 py-1.5 bg-white/20 text-white text-[10px] font-black uppercase tracking-widest border border-white/30">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm md:text-base max-w-lg mb-6 font-medium italic opacity-70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Launch Price</span>
                  <div className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
                    IDR {item.price.toLocaleString('id-ID')}
                  </div>
                  <Link
                    to="/order"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-red transition-colors group/link bg-white/5 hover:bg-white/10 px-6 py-3 border border-white/10"
                  >
                    Configure My Burger <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>


        </div>

        <ProductDetailModal
          item={selectedItem}
          isOpen={selectedItem !== null}
          onClose={() => setSelectedItem(null)}
        />
      </section>

      {/* Modern Branding Section */}
      <section className="py-32 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="text-[20vw] font-black italic tracking-tighter text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none uppercase">
            MERTUA
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-[120px] font-black text-white mb-12 leading-[0.8] italic uppercase tracking-tighter"
          >
            YANG PENASARAN <br /> <span className="bg-white text-brand-red px-6 inline-block transform -rotate-1">GAS ORDER!</span>
          </motion.h2>
          <p className="text-white/80 text-xl font-bold max-w-xl mx-auto mb-12 italic">
            {/* "Jangan cuma dilihatin gambarnya aja, aslinya jauh lebih enak. Langsung aja checkout sekarang!" */}
          </p>
          <Link
            to="/order"
            className="px-16 py-6 bg-brand-dark text-white text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-red transition-all shadow-2xl"
          >
            Get Yours Now
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
