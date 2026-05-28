/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const SLIDE_DATA = {
    'crispy-chicken': {
        slides: [
            {
                type: 'hero',
                image: './image_assets/crispy_chicken.png',
                title: 'Crispy Chicken',
                description:
                    'Daging paha ayam juicy yang digoreng krispi emas sempurna dengan balutan tepung bumbu rahasia keluarga.',
            },
            {
                type: 'closeup',
                image: '/image_assets/crispy_chicken_closeup.png',
                title: 'Precision Crispy Fry',
                description:
                    'Digoreng pada suhu sempurna 175°C untuk mengunci kelembapan daging dan menghasilkan tekstur kriuk luar biasa pada gigitan pertama.',
            },
            {
                type: 'blueprint',
                title: 'The Stack Architecture',
                layers: [
                    'Toasted Glazed Brioche Bun',
                    'Premium Butter Emulsion',
                    'Creamy Spicy Mayo Secret Sauce',
                    'Double Molten Cheddar Cheese Melt',
                    'Thick Crispy Fried Chicken Thigh',
                    'Iceberg Lettuce Crisp Chilled',
                ],
            },
        ],
    },

    'original-patty': {
        slides: [
            {
                type: 'hero',
                image: './image_assets/patty.png',
                title: 'Original Patty',
                description:
                    '100% daging ayam pilihan dipanggang sempurna dengan taburan bumbu racikan tradisional khas Mertua.',
            },
            {
                type: 'closeup',
                image: './image_assets/patty_closeup.png',
                title: 'Flame Sear Mastery',
                description:
                    'Proses pemanggangan untuk menghasilkan cita rasa smoky dan juicy yang khas.',
            },
            {
                type: 'blueprint',
                title: 'The Stack Architecture',
                layers: [
                    'Toasted Glazed Brioche Bun',
                    'Premium Butter Emulsion',
                    'Creamy Spicy Mayo Secret Sauce',
                    'Double Molten Cheddar Cheese Melt',
                    'Thick Chicken Patty',
                    'Iceberg Lettuce Crisp Chilled',
                ],
            },
        ],
    },

    'max-combo': {
        slides: [
            {
                type: 'hero',
                image: './image_assets/max_combo.png',
                title: 'Max Combo Extreme',
                description:
                    'Kombinasi crispy chicken dan chicken patty dengan extra cheese dan sayuran fresh.',
            },
            {
                type: 'closeup',
                image: './image_assets/max_combo_closeup.png',
                title: 'The Ultimate Stack',
                description:
                    'Perpaduan saus spesial, keju lumer, dan ayam crispy tebal dalam satu gigitan maksimal.',
            },
            {
                type: 'blueprint',
                title: 'The Stack Architecture',
                layers: [
                    'Toasted Glazed Brioche Bun',
                    'Premium Butter Emulsion',
                    'Creamy Spicy Mayo Secret Sauce',
                    'Double Molten Cheddar Cheese Melt',
                    'Thick Chicken Patty',
                    'Thick Crispy Fried Chicken Thigh',
                    'Double Iceberg Lettuce Crisp Chilled',
                ],
            },
        ],
    },
};

export default function ProductDetailModal({ item, isOpen, onClose }) {
    const { addToCart, cart, updateQuantity } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!item) return null;

    const itemDetails = SLIDE_DATA[item.id] || { slides: [] };
    const slides = itemDetails.slides;
    const isOrderPage = location.pathname === '/order';

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleAction = () => {
        // Add to selection
        const isInCart = cart.find(i => i.id === item.id);
        if (!isInCart) {
            addToCart(item);
        } else {
            updateQuantity(item.id, 1);
        }

        if (isOrderPage) {
            // Just close modal on order page
            onClose();
        } else {
            // Redirect to order page on landing page
            navigate('/order');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-brand-dark/95 backdrop-blur-md z-[150]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-x-4 bottom-4 top-8 md:inset-x-12 md:bottom-12 md:top-24 lg:inset-x-24 lg:bottom-16 lg:top-24 bg-brand-darker border-t-8 border-brand-red text-white z-[151] flex flex-col md:flex-row overflow-hidden shadow-2xl"
                    >
                        {/* Header / Brand text behind */}
                        <div className="absolute top-4 left-6 sm:left-12 opacity-[0.03] select-none pointer-events-none text-7xl sm:text-[140px] font-black italic tracking-tighter text-white">
                            DETAIL
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-brand-red hover:text-white transition-all border border-white/10 rounded-none text-gray-400"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Column: Interactive Slideshow Carousel */}
                        <div className="flex-[3] w-full md:w-1/2 h-[280px] sm:h-[800px] md:h-full bg-brand-dark/40 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 group overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12"
                                >
                                    {slides[currentSlide]?.type === 'hero' && (
                                        <div className="flex flex-col items-center justify-center text-center relative w-full h-full">
                                            <div className="absolute inset-0 bg-brand-red/5 rounded-full blur-3xl scale-75" />

                                            {/* Product Tag */}
                                            {item.tag && (
                                                <span className="absolute top-4 left-4 px-3 py-1 bg-brand-red text-white text-[9px] font-black uppercase tracking-[0.2em] transform -rotate-2">
                                                    {item.tag}
                                                </span>
                                            )}

                                            <div
                                                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center relative z-10 select-none pointer-events-none"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain filter drop-shadow-[0_25px_25px_rgba(239,68,68,0.15)]"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {slides[currentSlide]?.type === 'closeup' && (
                                        <div className="relative w-full h-full flex flex-col justify-end overflow-hidden border border-white/5 bg-black">
                                            <img
                                                src={(slides[currentSlide]).image}
                                                alt="Closeup"
                                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/50 to-transparent" />

                                            <div className="relative z-10 p-6 sm:p-10 text-left">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest mb-4">
                                                    <Award size={12} /> Craftsmanship
                                                </span>
                                                <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white mb-2">
                                                    {(slides[currentSlide]).title}
                                                </h3>
                                                <p className="text-xs text-gray-300 font-medium leading-relaxed max-w-md">
                                                    {(slides[currentSlide]).description}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {slides[currentSlide]?.type === 'blueprint' && (
                                        <div className="w-full h-full flex flex-col justify-center text-left max-w-sm">
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-red font-black mb-2">Slide 03 &mdash; Anatomy</span>
                                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">
                                                Burger Anatomy
                                            </h3>
                                            <div className="space-y-3">
                                                {(slides[currentSlide]).layers.map((layer, i) => (
                                                    <div key={i} className="flex items-center gap-4 border-l border-white/10 pl-4 py-1 hover:border-brand-red transition-all group/item">
                                                        <span className="text-[10px] md:text-base  font-mono text-gray-500 group-hover/item:text-brand-red transition-colors">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <span className="text-[10px] md:text-base  uppercase font-bold tracking-widest opacity-80 group-hover/item:opacity-100 transition-opacity">
                                                            {layer}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider Controls */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 p-2 bg-brand-darker/60 hover:bg-brand-red border border-white/5 text-white transition-all z-20"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 p-2 bg-brand-darker/60 hover:bg-brand-red border border-white/5 text-white transition-all z-20"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Slider Dots */}
                            <div className="absolute bottom-6 flex gap-2 z-20">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-2 transition-all duration-300 ${i === currentSlide ? 'w-8 bg-brand-red' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Dynamic Info, Specs and Action Button */}
                        <div className="flex-[2] p-6 sm:p-8 md:p-12 flex flex-col overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-red font-bold block mb-2">Model Detail</span>
                                    <h2 className="text-xl sm:text-5xl font-black italic tracking-tighter uppercase text-white leading-none mb-4">
                                        {item.name}
                                    </h2>
                                    <div className="h-1 w-24 bg-brand-red" />
                                </div>
                                <p className="text-gray-400 text-xs md:text-lg leading-relaxed font-medium italic opacity-80">
                                    {item.description}
                                </p>
                            </div>

                            {/* Pricing & CTA Lock */}
                            <div className="mt-2 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                                <button
                                    onClick={handleAction}
                                    className="w-full sm:w-auto px-12 py-5 bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-red transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-red/10"
                                >
                                    I Want This
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
