import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // العرض لمدة 3 ثوانٍ شاملة الحركات
        const timer = setTimeout(() => setIsVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    // التلاشي بنعومة مع تكبير خفيف جداً لإعطاء إحساس بالعمق
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        transition: { duration: 1.2, ease: "easeInOut" }
                    }}
                >
                    {/* لمسة لونية هادئة جداً في الخلفية */}
                    <div className="absolute w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full" />

                    <div className="relative flex flex-col items-center">
                        {/* ظهور الاسم بنعومة فائقة */}
                        <motion.h1
                            className="font-heading text-5xl md:text-7xl text-accent-dark font-bold tracking-tight"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            Noreta
                        </motion.h1>

                        {/* سطر بسيط يظهر بعد الاسم */}
                        <motion.p
                            className="mt-6 text-main-text/60 font-body text-xs tracking-[0.5em] uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1.2 }}
                        >
                            The Art of Gifting
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}