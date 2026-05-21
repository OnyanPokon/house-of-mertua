import { motion } from 'motion/react';
import { useCart } from '@/src/context/CartContext';
import { Package, Truck, UtensilsCrossed, CheckCircle2, ChevronRight, ShoppingBag, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeliveryMap from '@/src/components/DeliveryMap';
import { cn } from '@/src/lib/utils';

export default function TrackingPage() {
  const { activeOrder } = useCart();

  if (!activeOrder) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-brand-dark px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 md:p-20 text-brand-dark text-center border-t-[20px] border-brand-red shadow-2xl relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center text-[200px] font-black italic">HMT</div>
             
             <div className="relative z-10">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-10">
                   <Package size={48} className="text-gray-300" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-none">NO ACTIVE <span className="text-brand-red">ORDER.</span></h1>
                <p className="text-gray-500 font-medium italic mb-10 max-w-sm mx-auto">
                  Sepertinya kamu belum melakukan pemesanan burger mertua hari ini. Ayo mulai sekarang agar kami bisa langsung turun ke dapur!
                </p>
                <Link 
                  to="/order" 
                  className="inline-flex items-center gap-4 px-12 py-6 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all"
                >
                  START ORDERING
                  <ChevronRight size={18} />
                </Link>
             </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const statuses = [
    { id: 'PENDING', label: 'Order Recieved', icon: Package },
    { id: 'PREPARING', label: 'In the Kitchen', icon: UtensilsCrossed },
    { id: 'DELIVERING', label: 'On the Way', icon: Truck },
    { id: 'COMPLETED', label: 'Delivered', icon: CheckCircle2 },
  ];

  const currentStatusIndex = statuses.findIndex(s => s.id === activeOrder.status);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Map & Tracking */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="aspect-video md:aspect-auto md:h-[600px]">
              <DeliveryMap />
           </div>

           <div className="bg-white p-12 text-brand-dark border-b-8 border-brand-red shadow-2xl">
              <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-6">
                 <div className="flex items-center gap-4">
                    <div className="text-3xl font-black italic text-brand-red">Live</div>
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">Order Radar</h2>
                 </div>
                 <div className="text-right">
                    <span className="wide-tracking text-gray-400 block mb-1">Order ID</span>
                    <span className="font-black italic tracking-tight">{activeOrder.id}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statuses.map((step, i) => {
                  const isPast = i < currentStatusIndex;
                  const isCurrent = i === currentStatusIndex;
                  const isFuture = i > currentStatusIndex;

                  return (
                    <div key={step.id} className="relative flex flex-col items-center text-center">
                       <div className={cn(
                         "w-16 h-16 mb-4 flex items-center justify-center transition-all duration-500",
                         isPast && "bg-green-100 text-green-600",
                         isCurrent && "bg-brand-red text-white scale-110 shadow-xl shadow-brand-red/20 animate-pulse",
                         isFuture && "bg-gray-100 text-gray-300"
                       )}>
                          <step.icon size={28} />
                       </div>
                       <h4 className={cn(
                         "text-[10px] uppercase tracking-widest font-black leading-tight",
                         isFuture ? "text-gray-300" : "text-brand-dark"
                       )}>
                         {step.label}
                       </h4>
                       {i < statuses.length - 1 && (
                         <div className="hidden md:block absolute top-8 -right-4 w-8 h-[2px] bg-gray-100" />
                       )}
                    </div>
                  )
                })}
              </div>
           </div>
        </div>

        {/* Right: Order Detail & Chat */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-white/5 border-l-4 border-brand-red p-10 flex flex-col justify-between">
              <div>
                <h3 className="wide-tracking text-brand-red mb-8 border-b border-white/10 pb-4">Order Breakdown</h3>
                <div className="space-y-6 mb-12">
                   {activeOrder.items.map(item => (
                     <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-brand-dark flex items-center justify-center p-1">
                              <img src={item.image} alt="" className="w-full h-full object-contain" />
                           </div>
                           <div className="text-xs font-black uppercase tracking-tight italic">
                              {item.name} <span className="text-brand-red ml-2">x{item.quantity}</span>
                           </div>
                        </div>
                        <div className="text-xs font-bold font-mono">
                           {(item.price * item.quantity / 1000)}K
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-auto">
                 <div className="flex justify-between items-end">
                    <span className="wide-tracking text-gray-500">Total Paid</span>
                    <span className="text-2xl font-black italic tracking-tighter">IDR {activeOrder.total.toLocaleString('id-ID')}</span>
                 </div>
              </div>
           </div>

           <div className="bg-brand-red p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Phone size={80} />
              </div>
              <div className="relative z-10">
                 <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4">Butuh Bantuan?</h3>
                 <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">
                   Jika ada instruksi khusus untuk pengantar atau ingin update pesanan, langsung hubungi hotline kami.
                 </p>
                 <a 
                   href={`https://wa.me/6281234567890?text=Halo Mertua, bisa minta update pesanan ${activeOrder.id}?`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full py-5 bg-white text-brand-red text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-dark hover:text-white transition-all shadow-xl"
                 >
                    Chat on WhatsApp
                 </a>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 border border-white/10 text-center">
                 <Clock size={20} className="mx-auto text-brand-red mb-3" />
                 <span className="text-[9px] wide-tracking mb-1 block">Est. Time</span>
                 <span className="font-black italic">~25 Min</span>
              </div>
              <div className="bg-white/5 p-6 border border-white/10 text-center">
                 <ShoppingBag size={20} className="mx-auto text-brand-red mb-3" />
                 <span className="text-[9px] wide-tracking mb-1 block">Delivery</span>
                 <span className="font-black italic">FLAT 5K</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
