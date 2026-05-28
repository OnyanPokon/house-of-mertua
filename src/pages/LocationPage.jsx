import { useState } from 'react';
import { motion } from 'motion/react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Clock,  ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const API_KEY = '9e6d5c6f48mshcd1f1fe608b2525p1c6a8cjsn1f46b49291c8';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const BRANCHES = [
  {
    id: 'seminyak',
    name: 'House Of Mertua - Seminyak',
    address: 'Jl. Kayu Aya No.10, Seminyak, Bali',
    coords: { lat: -8.6946, lng: 115.1584 },
    hours: '11:00 - 22:00',
    phone: '+62 812 3456 7890'
  },
  {
    id: 'canggu',
    name: 'House Of Mertua - Canggu',
    address: 'Jl. Pantai Batu Bolong, Canggu, Bali',
    coords: { lat: -8.6500, lng: 115.1294 },
    hours: '11:00 - 23:00',
    phone: '+62 812 9999 0000'
  },
  {
    id: 'ubud',
    name: 'House Of Mertua - Ubud',
    address: 'Jl. Raya Ubud, Gianyar, Bali',
    coords: { lat: -8.5069, lng: 115.2625 },
    hours: '10:00 - 21:00',
    phone: '+62 812 8888 7777'
  }
];

export default function LocationsPage() {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Branches List */}
        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-8">
           <div className="mb-4">
              <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">OUR <span className="text-brand-red">OUTPOSTS.</span></h1>
              <p className="text-gray-500 font-medium italic leading-relaxed">
                Temukan burger premium terdekat dari lokasimu. Kami hadir di pusat-pusat kuliner terbaik di Bali.
              </p>
           </div>

           <div className="space-y-4">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={cn(
                    "p-8 border-l-4 transition-all cursor-pointer group relative overflow-hidden",
                    selectedBranch.id === branch.id 
                      ? "bg-white text-brand-dark border-brand-red shadow-2xl" 
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                   {/* Background Decal */}
                   <div className="absolute right-4 bottom-4 opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity">
                      <MapPin size={80} />
                   </div>

                   <h3 className="text-xl font-black italic tracking-tight uppercase mb-4 group-hover:text-brand-red transition-colors">{branch.name}</h3>
                   <div className="space-y-3 relativ`e z-10">
                      <div className="flex items-start gap-4">
                         <MapPin size={16} className={cn("mt-1", selectedBranch.id === branch.id ? "text-brand-red" : "text-gray-500")} />
                         <p className="text-xs font-bold opacity-60 leading-relaxed uppercase tracking-widest">{branch.address}</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <Clock size={16} className={selectedBranch.id === branch.id ? "text-brand-red" : "text-gray-500"} />
                         <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{branch.hours}</p>
                      </div>
                   </div>

                   <div className="mt-8 pt-4 border-t border-black/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">Select to View Map</span>
                      <ArrowRight size={16} className="text-brand-red" />
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-brand-red p-10 text-white shadow-2xl">
              <h4 className="text-xl font-black italic tracking-tighter uppercase mb-2 leading-tight">Expansion <br /> Coming Soon!</h4>
              <p className="text-xs font-bold opacity-80 mb-6 uppercase tracking-widest">Jakarta | Surabaya | Yogyakarta</p>
              <div className="h-1 w-20 bg-white" />
           </div>
        </div>

        {/* Right: Map Integration */}
        <div className="lg:col-span-12 xl:col-span-8">
           <div className="w-full h-[500px] lg:h-full min-h-[600px] relative border-8 border-brand-red md:border-[16px]">
              {hasValidKey ? (
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    center={selectedBranch.coords}
                    zoom={14}
                    mapId="LOCATIONS_MAP_ID"
                    className="grayscale invert brightness-75 contrast-125"
                    disableDefaultUI
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {BRANCHES.map(branch => (
                      <AdvancedMarker 
                        key={branch.id} 
                        position={branch.coords} 
                        onClick={() => setSelectedBranch(branch)}
                        title={branch.name}
                      >
                         <div className={cn(
                           "p-1 shadow-2xl transition-all duration-300 transform",
                           selectedBranch.id === branch.id ? "bg-brand-red scale-125 z-10" : "bg-white/20 scale-100"
                         )}>
                            <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                               <span className={cn(
                                 "font-black text-xs italic",
                                 selectedBranch.id === branch.id ? "text-white" : "text-white/20"
                               )}>M</span>
                            </div>
                         </div>
                      </AdvancedMarker>
                    ))}
                  </Map>
                </APIProvider>
              ) : (
                <div className="w-full h-full bg-brand-darker flex flex-col items-center justify-center p-12 text-center">
                   <Navigation size={48} className="text-brand-red mb-6 animate-bounce" />
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4">Map View Restricted</h3>
                   <p className="text-sm text-gray-500 font-medium italic max-w-sm">
                     &quot;Peta lokasi hanya tersedia dengan Google Maps API Key yang valid. Silakan hubungi admin untuk aktivasi.&quot;
                   </p>
                </div>
              )}

              {/* Selected Info Overlay */}
              <motion.div 
                key={selectedBranch.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute bottom-12 left-12 right-12 z-10 md:w-80 md:left-auto"
              >
                 <div className="bg-white p-8 text-brand-dark shadow-2xl border-t-8 border-brand-red">
                    <h4 className="text-xl font-black italic tracking-tight uppercase mb-4">{selectedBranch.name}</h4>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.coords.lat},${selectedBranch.coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red hover:text-brand-dark transition-colors"
                    >
                       Get Directions <Navigation size={14} />
                    </a>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}
