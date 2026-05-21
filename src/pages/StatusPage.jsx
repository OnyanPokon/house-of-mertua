import { motion } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function StatusPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const isSuccess = type === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 bg-brand-dark">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl w-full bg-white text-brand-dark p-16 text-center border-t-[12px] border-brand-red shadow-2xl relative overflow-hidden"
      >
        {/* Editorial Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none text-[150px] font-black italic tracking-tighter flex items-center justify-center">
           {isSuccess ? 'YES' : 'OHNO'}
        </div>

        <div className="relative z-10">
          <div className={`w-24 h-24 rounded-none flex items-center justify-center text-white mx-auto mb-10 shadow-2xl ${isSuccess ? 'bg-brand-red shadow-brand-red/20' : 'bg-gray-800'}`}>
            {isSuccess ? <CheckCircle size={48} /> : <XCircle size={48} />}
          </div>
          
          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">
            {isSuccess ? 'PESANAN BERHASIL!' : 'ADA MASALAH!'}
          </h2>
          
          <p className="text-gray-500 mb-12 leading-relaxed font-medium text-lg italic max-w-sm mx-auto">
            {isSuccess 
              ? 'Terima kasih telah mempercayai Mertua. Pesananmu sudah masuk ke radar dapur kami sekarang!' 
              : 'Mohon maaf, sepertinya ada sedikit kendala pada sistem pembayaran. Transaksi belum dapat diproses.'}
          </p>
          
          <div className="flex flex-col gap-4">
            {isSuccess ? (
              <>
                <Link 
                  to="/tracking" 
                  className="w-full py-6 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all flex items-center justify-center gap-4 group"
                >
                  <MapPin size={18} />
                  Trace My Delivery
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/" className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 hover:text-brand-red mt-4 transition-colors">
                  Back to Home
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/payment')}
                  className="w-full py-6 bg-brand-dark text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red transition-all"
                >
                  ULANGI PEMBAYARAN
                </button>
                <Link to="/order" className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 hover:text-brand-red mt-4 transition-colors">
                  Kembali ke Menu
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
