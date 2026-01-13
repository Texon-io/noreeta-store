import { NavLink } from "react-router";
import { createPortal } from "react-dom"; // استيراد بورتال

const links = [
    { path: "/", label: "الرئيسية" },
    { path: "/products", label: "المنتجات" },
    { path: "/contact", label: "تواصل معنا" },
];

function NavTabs({ variant = "horizontal", isOpen, onClose }) {

    if (variant === "sidebar") {
        // نستخدم البورتال لنقل السايد بار لآخر الصفحة في الـ DOM
        return createPortal(
            <>
                {/* Overlay */}
                <div
                    onClick={onClose}
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    } z-[9998]`}
                />

                {/* Sliding Menu */}
                <aside
                    className={`
                        fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "translate-x-full"}
                        z-[9999] p-8 flex flex-col gap-8
                    `}
                >
                    <button
                        onClick={onClose}
                        className="self-end text-3xl font-light mb-4 cursor-pointer hover:text-red-500 transition-colors"
                    >
                        &times;
                    </button>

                    <ul className="flex flex-col gap-8 text-right font-zain">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `text-xl transition-all duration-300 block ${
                                            isActive
                                                ? "font-bold text-accent-main pr-4 border-r-4 border-accent-main"
                                                : "text-gray-600 hover:pr-4"
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>
            </>,
            document.body // هنا بنقوله ارمي الكود ده في الـ body مباشرة
        );
    }

    // الـ Horizontal يفضل مكانه عادي جوا الناف بار
    return (
        <ul className="flex items-center gap-8 max-md:hidden font-zain">
            {links.map((link) => (
                <li key={link.path}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `text-lg transition-all duration-300 hover:text-accent-main ${
                                isActive ? "font-bold text-accent-main border-b-2 border-accent-main" : "text-main-text"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default NavTabs;