import { useState } from "react";
import { MENU_ITEMS } from "../constants";
import { ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import CheckoutModal from "../components/CheckoutModal";
import ProductDetailModal from "../components/ProductDetailModal";
import { useCart } from "../context/CartContext";

export default function OrderPage() {
  const { cart, addToCart, updateQuantity, totalAmount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  console.log(cart)

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left: Product Catalog */}
        <div className="lg:col-span-12 xl:col-span-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black italic text-brand-red">01</div>
              <h2 className="text-4xl md:text-4xl font-black italic tracking-tighter uppercase">Taking <span className="text-brand-red">Order</span></h2>
            </div>
            <p className="text-gray-500 font-medium italic max-w-xs text-right hidden md:block">
              Setiap burger adalah karya seni. Pilih favoritmu dan tentukan jumlahnya
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDetailItem(item)}
                className="group flex flex-col md:flex-row items-center bg-white/5 border-l-4 border-white/10 hover:border-brand-red p-8 md:p-10 transition-all gap-10 md:gap-14 cursor-pointer relative overflow-hidden"
              >
                {/* Bigger Product Photo */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 flex-shrink-0 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-red/15 rounded-full blur-2xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_20px_35px_rgba(239,68,68,0.2)]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-2 group-hover:text-brand-red transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 italic font-medium max-w-md">
                    {item.description}
                  </p>
                
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center md:items-end gap-4 min-w-[200px]"
                >
                  <div className="text-3xl font-black italic tracking-tighter">
                    IDR {item.price.toLocaleString('id-ID')}
                  </div>

                  {cart.find(i => i.id === item.id) ? (
                    <div className="flex items-center bg-white/10 p-1 border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-black italic text-xl">
                        {cart.find(i => i.id === item.id)?.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-8 py-3 border border-white text-white text-[10px] font-black uppercase tracking-widest italic hover:bg-white hover:text-brand-red transition-all w-full"
                    >
                      Add to Selection
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-white/10 p-6">
              <h4 className="wide-tracking text-brand-red mb-4">Informasi Penting</h4>
              <p className="text-[11px] leading-tight opacity-60 font-medium">Bahan-bahan segar kami disiapkan setiap pagi. Stok terbatas untuk menjaga kualitas rasa premium.</p>
            </div>
            <div className="border border-white/10 p-6 flex flex-col justify-center items-center text-center">
              <div className="wide-tracking text-brand-red mb-2">Estimasi Pengantaran</div>
              <div className="text-3xl font-black italic">20-35 <span className="text-[10px] uppercase not-italic tracking-[0.2em] font-bold">Menit</span></div>
            </div>
          </div>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4">
          <div className="sticky top-32">
            <div className="bg-white p-8 md:p-10 text-brand-dark border-t-8 border-brand-red shadow-2xl overflow-hidden relative">
              {/* Accent */}
              <div className="absolute -right-10 -bottom-10 text-brand-dark opacity-[0.03] select-none pointer-events-none text-9xl font-black italic">CART</div>

              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-black/5">
                <div className="text-2xl lg:text-3xl font-black italic text-brand-red">02</div>
                <h2 className="text-xl font-black italic tracking-tighter uppercase">Order Summary</h2>
              </div>

              <div className="space-y-6 mb-12 min-h-[100px]">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <ShoppingBag size={40} className="mx-auto text-gray-300 mb-4 opacity-50" />
                    <p className="text-xs wide-tracking text-gray-400">Your selection is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="flex-1 pr-4">
                        <h4 className="font-black text-sm uppercase leading-tight mb-1">{item.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic font-display">
                          {item.quantity} x IDR {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-black italic text-brand-red">
                          IDR {(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="text-[8px] uppercase tracking-widest font-black text-gray-300 hover:text-red-500 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-8 border-t-2 border-black border-dashed">
                <div className="flex items-center justify-between mb-8">
                  <span className="wide-tracking text-gray-400">Grand Total</span>
                  <span className="text-3xl font-black italic text-brand-red tracking-tighter">
                    IDR {totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-6 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-dark transition-all flex items-center justify-center gap-4 group shadow-xl shadow-brand-red/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center mt-6 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  *Belum termasuk biaya pengantaran
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ProductDetailModal
        item={selectedDetailItem}
        isOpen={selectedDetailItem !== null}
        onClose={() => setSelectedDetailItem(null)}
      />
    </div>
  );
}
