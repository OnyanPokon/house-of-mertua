/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, User, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { userInfo, setUserInfo, cart, clearCart } = useCart();
  const [formData, setFormData] = useState(userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserInfo(formData);

    const phoneNumber = "6282221983627";

    // generate list pesanan dari cart
    const orderList = cart
      .map(
        (item) =>
          `- *${item.name} : x${item.quantity}pcs*`
      )
      .join("\n");

    // hitung total harga
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const message = `Halo Burger Mertua!!!!
Nama saya *${formData.name}*, saya ingin memesan.
Berikut detail pesanan saya:
${orderList}

Total:
Rp ${totalPrice.toLocaleString("id-ID")}

Detail Alamat:
"${formData.address}"

*_Klik tombol kirim untuk melanjutkan pesanan_*`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    onClose();
    clearCart();
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-white w-full max-w-xl pointer-events-auto border-t-8 border-brand-red shadow-2xl relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none select-none">
                <div className="text-8xl font-black italic">MERTUA</div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black italic tracking-tighter text-brand-dark uppercase">Detail Pesanan</h2>
                  <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors text-brand-dark">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label className="wide-tracking text-gray-400 block mb-3 pl-1">Nama Lengkap</label>
                    <div className="flex items-center bg-gray-50 border border-transparent focus-within:border-brand-red focus-within:bg-white transition-all px-6 py-4">
                      <User size={18} className="text-gray-400 mr-4" />
                      <input
                        type="text"
                        required
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Mertua"
                        className="bg-transparent border-none focus:ring-0 w-full font-bold text-brand-dark uppercase text-xs tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="wide-tracking text-gray-400 block mb-3 pl-1">Nomor WhatsApp</label>
                    <div className="flex items-center bg-gray-50 border border-transparent focus-within:border-brand-red focus-within:bg-white transition-all px-6 py-4">
                      <Phone size={18} className="text-gray-400 mr-4" />
                      <input
                        type="tel"
                        required
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+62 8XX XXXX"
                        className="bg-transparent border-none focus:ring-0 w-full font-bold text-brand-dark uppercase text-xs tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="wide-tracking text-gray-400 block mb-3 pl-1">Alamat Pengiriman</label>
                    <div className="flex items-start bg-gray-50 border border-transparent focus-within:border-brand-red focus-within:bg-white transition-all px-6 py-4">
                      <MapPin size={18} className="text-gray-400 mr-4 mt-1" />
                      <textarea
                        required
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Lokasi pengiriman spesifik..."
                        className="bg-transparent border-none focus:ring-0 w-full font-bold text-brand-dark h-32 resize-none uppercase text-xs tracking-widest leading-loose"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-6 mt-8 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all flex items-center justify-center gap-4 group shadow-xl shadow-brand-red/20"
                  >
                    Lanjutkan
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
