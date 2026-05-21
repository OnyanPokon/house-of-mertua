import { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '@/src/context/CartContext';
import { CreditCard, Smartphone, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';


export default function PaymentPage() {
    const { totalAmount, userInfo, placeOrder, cart } = useCart();
    const [method, setMethod] = useState(null);
    const navigate = useNavigate();

    const handleComplete = () => {
        if (!method) return;
        placeOrder();
        navigate('/status/success');
    };

    if (cart.length === 0 && !method) {
        // User shouldn't be here without items, but let's just redirect or show empty
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-brand-dark">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-red mb-4">Final Stage</h2>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Complete Your <span className="text-brand-red">Order.</span></h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { id: 'QRIS', icon: Smartphone, label: 'QRIS Pay', desc: 'Scan & Pay Instantly' },
                        { id: 'BANK_TRANSFER', icon: CreditCard, label: 'Bank Transfer', desc: 'Manual Verification' },
                        { id: 'COD', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when Arrived' },
                    ].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setMethod(item.id)}
                            className={cn(
                                "p-8 border-t-4 cursor-pointer transition-all flex flex-col items-center text-center group",
                                method === item.id
                                    ? "bg-white text-brand-dark border-brand-red shadow-2xl scale-105 z-10"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            )}
                        >
                            <item.icon size={40} className={cn("mb-6 transition-colors", method === item.id ? "text-brand-red" : "text-gray-400 group-hover:text-white")} />
                            <h3 className="font-black italic uppercase tracking-widest text-sm mb-2">{item.label}</h3>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{item.desc}</p>
                            {method === item.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-brand-red">
                                    <CheckCircle2 size={24} />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {method && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 text-brand-dark border-b-8 border-brand-red shadow-2xl relative overflow-hidden"
                    >
                        {/* Visual payment stuff */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6 border-b border-black/5 pb-4">Payment Instructions</h3>

                                {method === 'QRIS' && (
                                    <div className="flex flex-col items-center md:items-start">
                                        <div className="w-48 h-48 bg-gray-100 mb-6 flex items-center justify-center p-4 border-2 border-dashed border-gray-300 relative">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QRIS" className="w-full h-full opacity-80" />
                                            <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                                                <span className="bg-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] border border-brand-red shadow-sm transform -rotate-12">MERTUA PAY</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                            1. Buka aplikasi pembayaran digital <br />
                                            2. Scan kode QR di samping <br />
                                            3. Masukkan nominal yang sesuai <br />
                                            4. Simpan bukti pembayaran
                                        </p>
                                    </div>
                                )}

                                {method === 'BANK_TRANSFER' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 border-l-4 border-brand-red">
                                            <span className="text-[10px] wide-tracking text-gray-400">BCA Account</span>
                                            <div className="text-xl font-black italic tracking-tighter">7234 1123 00</div>
                                            <span className="text-[10px] font-bold">A.N HOUSE OF MERTUA</span>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-l-4 border-brand-red">
                                            <span className="text-[10px] wide-tracking text-gray-400">Mandiri Account</span>
                                            <div className="text-xl font-black italic tracking-tighter">123 00 999 888</div>
                                            <span className="text-[10px] font-bold">A.N HOUSE OF MERTUA</span>
                                        </div>
                                    </div>
                                )}

                                {method === 'COD' && (
                                    <div className="p-6 bg-red-50 border border-brand-red/10 text-center">
                                        <Banknote size={48} className="mx-auto text-brand-red mb-4" />
                                        <p className="text-sm font-bold uppercase tracking-widest leading-loose">
                                            Mohon siapkan uang pas sebesar <br />
                                            <span className="text-2xl font-black italic text-brand-red underline decor-brand-red/20 tracking-tighter">IDR {(totalAmount).toLocaleString('id-ID')}</span> <br />
                                            saat pesanan tiba di lokasi Anda.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-brand-dark p-10 text-white flex flex-col justify-between min-h-[350px]">
                                <div>
                                    <h4 className="wide-tracking text-brand-red mb-6 border-b border-white/10 pb-4">Order Summary</h4>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold opacity-60">Total Bill</span>
                                        <span className="text-2xl font-black italic tracking-tighter">IDR {totalAmount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="space-y-2 mb-8">
                                        <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">Ship to:</p>
                                        <p className="text-xs font-black italic uppercase leading-relaxed text-brand-red">{userInfo.name}</p>
                                        <p className="text-[10px] opacity-60 line-clamp-2 italic font-medium">{userInfo.address}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleComplete}
                                    className="w-full py-6 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-red transition-all flex items-center justify-center gap-4 group"
                                >
                                    Confirm & Track Order
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate('/order')}
                        className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-brand-red transition-colors flex items-center gap-2"
                    >
                        &larr; Back to Selection
                    </button>
                </div>
            </div>
        </div>
    );
}
