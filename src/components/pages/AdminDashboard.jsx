import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

import useAddProduct from "../../hooks/useAddProduct";
import CategorySelect from "../organisms/CategoriesSelect.jsx";
import CustomInput from "../atoms/CustomInput.jsx";
import ImageUploader from "../atoms/ImageUploader.jsx";
import AdminLogin from "../organisms/AdminLogin.jsx";
import Label from "../atoms/Label.jsx";


const GOOGLE_API_URL = import.meta.env.VITE_GOOGLE_API_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;


export default function AdminDashboard() {
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
    const [category, setCategory] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [passInput, setPassInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [bestSeller, setBestSeller] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const formRef = useRef(null);

    // Initialize and check for existing lockout on mount (Persistence)
    useEffect(() => {
        const lockoutExpiry = localStorage.getItem("adminLockoutExpiry");
        if (lockoutExpiry) {
            const remainingTime = Math.floor(
                (parseInt(lockoutExpiry) - Date.now()) / 1000
            );
            if (remainingTime > 0) {
                setIsLocked(true);
                setTimeLeft(remainingTime);
            } else {
                localStorage.removeItem("adminLockoutExpiry");
            }
        }
    }, []);

    // Countdown timer logic for lockout period
    useEffect(() => {
        let timer;
        if (isLocked && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isLocked) {
            setIsLocked(false);
            setAttempts(0);
            localStorage.removeItem("adminLockoutExpiry");
        }

        return () => clearInterval(timer);
    }, [isLocked, timeLeft]);

    /**
     * Core logic to handle Cloudinary upload and Google Sheets data transmission
     * @param {Object} formDataValues - The product details from the form
     */
    const uploadProductLogic = async (formDataValues) => {
        if (!selectedFile) throw new Error("Please select a product image");
        if (!formDataValues.Category)
            throw new Error("Please select a product category");

        // 1. Upload assets to Cloudinary
        const imageData = new FormData();
        imageData.append("file", selectedFile);
        imageData.append("upload_preset", CLOUDINARY_PRESET);

        const cloudRes = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: imageData,
        });

        const cloudJson = await cloudRes.json();
        if (!cloudJson.secure_url) throw new Error("Cloudinary upload failed");

        // 2. Transmit data to Google Sheets via Web App
        // We send it as plain text to avoid CORS preflight issues with Apps Script,
        // then parse it as JSON on the server side.
        const productData = {
            ...formDataValues,
            ImageURL: cloudJson.secure_url,
            timestamp: new Date().toLocaleString("ar-EG"),
        };

        const response = await fetch(GOOGLE_API_URL, {
            method: "POST",
            // Essential: Use text/plain to bypass complex CORS preflight while sending JSON string
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok && response.status !== 0) {
            throw new Error("Failed to send data to Google Sheets");
        }

        return "Done";
    };

    //  Use mutateAsync instead of calling uploadProductLogic directly
    const addProductMutation = useAddProduct(uploadProductLogic);

    // Format seconds to MM:SS string
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isLocked) {
            toast.error(
                `Access denied. Please try again after ${formatTime(timeLeft)}`
            );
            return;
        }

        if (passInput === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setAttempts(0);
            toast.success("مرحبا مرة أخرى!");
        } else {
            setPassInput("");
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                // Define lockout period (30 minutes) and persist expiry time
                const lockoutDuration = 30 * 60 * 1000;
                const expiryTimestamp = Date.now() + lockoutDuration;
                localStorage.setItem("adminLockoutExpiry", expiryTimestamp);

                setIsLocked(true);
                setTimeLeft(lockoutDuration / 1000);

                // Security Alert via EmailJS
                const templateParams = {
                    time: new Date().toLocaleString("ar-EG"),
                    user_agent: navigator.userAgent,
                };

                emailjs
                    .send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        templateParams,
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                    )
                    .then(() => console.log("Security alert dispatched successfully."))
                    .catch((error) =>
                        console.error("EmailJS Security alert failed:", error)
                    );

                toast.error(
                    "Account locked due to multiple failed attempts. Security alert sent."
                );
            } else {
                toast.error(`Invalid password. ${3 - newAttempts} attempts remaining.`);
            }
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setPassInput("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const form = e.target;
        const formDataValues = {
            Name: form.name.value,
            Price: form.price.value,
            Stock: form.stock.value,
            Category: category,
            Description: form.description.value,
            BestSeller: bestSeller,
        };

        console.log("📝 Initial Form Data:", formDataValues);

        // 3. Use mutateAsync instead of calling uploadProductLogic directly
        toast.promise(addProductMutation.mutateAsync(formDataValues), {
            loading: "جاري إرسال المنتج...",
            success: () => {
                setImagePreview(null);
                setSelectedFile(null);
                setBestSeller(false);
                setCategory("");
                form.reset();
                return "تم إضافة المنتج بنجاح ! 🎉";
            },
            error: (err) => `${err.message}`,
        });
    };

    // AdminPanel.jsx

    if (!isAdmin) return <AdminLogin {...{ passInput, setPassInput, isLocked, timeLeft, handleLogin, formatTime }} />;

    return (
        <div dir="rtl" className="min-h-screen bg-[#FFF5F8] flex flex-col items-center py-12 px-6 font-zain">
            <button onClick={handleLogout} className="absolute top-6 left-6 cursor-pointer text-[#D65A84] bg-white border border-[#FFD1E0] px-5 py-2 rounded-2xl font-bold shadow-sm hover:bg-[#D65A84] hover:text-white transition-all">
                تسجيل خروج
            </button>

            <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-xl overflow-hidden border border-[#E0FAF5]">
                <div className="bg-gradient-to-r from-[#4FB6A1] to-[#86F2DB] p-8 text-white text-center">
                    <h1 className="text-3xl font-bold">إضافة منتج جديد ✨</h1>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="p-10 space-y-6">
                    <CustomInput label="اسم المنتج" name="name" required placeholder="مثال: نوت بوك نوريتا" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomInput label="السعر (EGP)" name="price" type="number" required placeholder="0.00" />
                        <CustomInput label="الكمية" name="stock" type="number" required placeholder="10" />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[#2D2D2D] font-bold mr-2">تصنيف المنتج</Label>
                        <div className="p-1 bg-[#FFF5F8] rounded-2xl border border-[#FFD1E0]">
                            <CategorySelect value={category} onChange={setCategory} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[#2D2D2D] font-bold mr-2">وصف المنتج</Label>
                        <textarea placeholder={`تفاصيل المنتج...`} name="description" rows="3" className="w-full px-6 py-4 rounded-2xl border border-[#E0FAF5] bg-[#E0FAF5]/20 focus:ring-2 focus:ring-[#4FB6A1] outline-none resize-none" />
                    </div>

                    <Label className="flex items-center gap-4 p-5 rounded-3xl border border-[#FFD1E0] bg-[#FFF5F8] cursor-pointer">
                        <input type="checkbox" checked={bestSeller} onChange={(e) => setBestSeller(e.target.checked)} className="w-6 h-6 accent-[#F781A8]" />
                        <span className="font-bold text-[#D65A84]">تمييز المنتج كـ "أكثر مبيعاً" 🔥</span>
                    </Label>

                    <ImageUploader
                        preview={imagePreview}
                        onImageChange={handleImageChange}
                        onClear={() => { setImagePreview(null); setSelectedFile(null); }}
                    />

                    <button disabled={loading} className="w-full cursor-pointer py-5 rounded-[2rem] font-bold text-xl bg-gradient-to-r from-[#F781A8] to-[#D65A84] text-white shadow-lg active:scale-95 transition-all">
                        {loading ? "جاري الحفظ..." : "إضافة المنتج الآن ✨"}
                    </button>
                </form>
            </div>
        </div>
    );
};