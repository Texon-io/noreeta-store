import { motion } from "framer-motion";
import Button from "../atoms/Button.jsx";
import { placeHolder } from "../../utils/constants.js";
import { useCart } from "../../hooks/useCart.jsx";
import { useState } from "react";
import { X } from "lucide-react"; // شكل أنضف للإغلاق

function Product({ showModal, data }) {
    const { image, name, description: desc, price, stock, id } = data;
    const { addToCart } = useCart();
    const tempImg = placeHolder;
    const [isAdded, setIsAdded] = useState(false);

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) showModal(false);
    };

    function handleAddToCart() {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
        addToCart({ name, price, image, id });
    }

    return (
        <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[100] p-4 sm:p-6"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row-reverse overflow-hidden w-full max-w-5xl max-h-[90vh]"
            >
                {/* Close Button - More visible on mobile */}
                <button
                    onClick={() => showModal(false)}
                    className="absolute right-4 top-4 z-20 bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors group cursor-pointer"
                >
                    <X className="text-gray-500 group-hover:text-red-500" size={20} />
                </button>

                {/* Image Section - Fixed height on mobile, full on desktop */}
                <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gray-50 flex justify-center items-center p-4 md:p-8">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={image || tempImg}
                        alt={name}
                        className="w-full h-full rounded-2xl object-contain drop-shadow-xl"
                    />
                </div>

                {/* Content Section - Scrollable on mobile if text is long */}
                <div className="w-full md:w-1/2 px-6 md:p-12 flex flex-col font-zain text-right overflow-y-auto">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <span className="text-accent-dark/60 font-bold text-xs md:text-sm uppercase tracking-wider">
                            نوريتا ستور
                        </span>
                        <h5 className="text-main-text text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            {name}
                        </h5>

                        <div className="w-12 h-1 bg-accent-dark rounded-full"></div>

                        <p className="text-gray-600 text-base md:text-xl leading-relaxed font-light">
                            {desc}
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl md:text-3xl font-bold text-accent-dark">
                                {price} ج.م
                            </span>
                            <span className={`text-[12px] px-3 py-1 rounded-full ${stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {stock > 0 ? `متوفر: ${stock}` : "نفذت الكمية"}
                            </span>
                        </div>
                    </div>

                    {/* Action Button - Stays at bottom */}
                    <div className="mt-8 md:mt-auto">
                        <Button
                            onClick={handleAddToCart}
                            className={`w-full py-3 md:py-4 text-lg md:text-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isAdded ? "bg-green-600 border-green-600" : "bg-accent-dark hover:bg-accent-main"
                                }`}
                            disabled={stock <= 0 || isAdded}
                        >
                            {isAdded ? (
                                <><span>✓</span><span>تمت الإضافة!</span></>
                            ) : (
                                "أضف إلى السلة"
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Product;