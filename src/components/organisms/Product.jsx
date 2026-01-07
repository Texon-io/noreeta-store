import { motion, AnimatePresence } from "framer-motion";
import Button from "../atoms/Button.jsx";
import { placeHolder } from "../../utils/constants.js";
import { useCart } from "../../hooks/useCart.jsx";
import {useState} from "react";

function Product({ showModal, data }) {
    const { ImageURL: image, Name: name, Description: desc, Price: price, Stock: stock, id } = data;
    const { addToCart } = useCart();
    const tempImg = placeHolder;
    const [isAdded, setIsAdded] = useState(false)

    // إغلاق المودال عند الضغط على الخلفية
    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) showModal(false);
    };

    function handleAddToCart() {
        setIsAdded(true)
        setTimeout(()=>{
            setIsAdded(false);
        }, 3000)
        addToCart({ name, price, image, id });
    }

    return (
        <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-[2rem] shadow-2xl relative flex flex-col md:flex-row-reverse overflow-hidden w-full max-w-5xl max-h-[90vh] md:h-[600px]"
            >
                <button
                    onClick={() => showModal(false)}
                    className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-sm hover:bg-accent-dark hover:text-white transition-all cursor-pointer"
                >
                    <span className={`mb-2`}>&times;</span>
                </button>

                <div className="md:w-1/2 w-full h-64 md:h-full bg-gray-50 flex justify-center items-center p-6">
                    <motion.img
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src={image || tempImg}
                        alt={name}
                        className="w-full h-full rounded-2xl shadow-xl object-contain md:object-cover"
                    />
                </div>

                <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col font-zain text-right">
                    <div className="flex flex-col gap-4 overflow">
                        <span className="text-accent-dark/60 font-bold tracking-widest text-sm uppercase">نوريتا ستور</span>
                        <h5 className="text-main-text text-3xl md:text-5xl font-bold leading-tight">{name}</h5>

                        <div className="w-12 h-1 bg-accent-dark rounded-full mb-2"></div>

                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
                            {desc}
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-3xl font-bold text-accent-dark">{price} ج.م</span>
                            <span className={`text-sm px-3 py-1 rounded-full animate-pulse ${stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stock > 0 ? `متوفر: ${stock}` : "نفذت الكمية"}
              </span>
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <Button
                            onClick={handleAddToCart}
                            // هنا التغيير المؤقت في الألوان
                            className={`w-full py-4 text-xl shadow-lg transition-all duration-300 ${
                                isAdded ? "bg-green-600 border-green-600 scale-95" : "bg-accent-dark"
                            }`}
                            disabled={stock <= 0 || isAdded}
                        >
                            <div className="flex items-center gap-2">
                                {isAdded ? (
                                    <>
                                        <span>✓</span>
                                        <span>تمت الإضافة!</span>
                                    </>
                                ) : (
                                    "أضف إلى السلة"
                                )}
                            </div>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Product;