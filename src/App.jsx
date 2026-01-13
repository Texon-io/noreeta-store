import { useEffect, useState } from "react";
import {Routes, Route, useLocation} from "react-router";
import Navbar from "./components/organisms/Navbar.jsx";
import Footer from "./components/organisms/Footer.jsx";
import Cart from "./components/pages/Cart.jsx";
import { Toaster } from "sonner";

import HomePage from "./components/pages/HomePage.jsx";
import Contact from "./components/pages/Contact.jsx";
import Products from "./components/pages/Products.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import SplashScreen from "./components/atoms/SplashScreen.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    const location = useLocation() // عشان نعرف إحنا في أنهي صفحة دلوقتي

    useEffect(() => {
        document.title = "Noreta Store";
        const timer = setTimeout(() => setShowSplash(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // بنفحص هل إحنا في صفحة الأدمن ولا لأ
    const isAdminPage = location.pathname.startsWith("/admin");

    if (showSplash) return <SplashScreen />;

    return (
        <>
            <Toaster dir={'rtl'} richColors position="top-right" />
            <ScrollToTop />

            {isAdminPage ? (
                /* --- لوحة تحكم الأدمن (بدون Navbar و Footer) --- */
                <Routes>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            ) : (
                /* --- تصميم الموقع العادي للزبائن --- */
                <>
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </main>
                    <Cart />
                    <Footer />
                </>
            )}
        </>
    );
}