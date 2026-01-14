import { useEffect, useRef, useState } from "react";
import {
    BookOpen,
    PenTool,
    LayoutGrid,
    Coffee,
    Briefcase,
    Package,
    ShieldQuestionMark,
    ChevronDown,
} from "lucide-react";


const categories = [
    {
        label: "دفاتر",
        value: "دفاتر",
        colors: {
            txt: "text-purple-600",
            bg: "bg-purple-100",
            bgHover: "hover:bg-purple-200",
        },
        icon: BookOpen,
    },
    {
        label: "أقلام",
        value: "أقلام",
        colors: {
            txt: "text-blue-600",
            bg: "bg-blue-100",
            bgHover: "hover:bg-blue-200",
        },
        icon: PenTool,
    },
    {
        label: "منظم مكتب",
        value: "منظم مكتب",
        colors: {
            txt: "text-yellow-600",
            bg: "bg-yellow-100",
            bgHover: "hover:bg-yellow-200",
        },
        icon: LayoutGrid,
    },
    {
        label: "مجات",
        value: "مجات",
        colors: {
            txt: "text-green-600",
            bg: "bg-green-100",
            bgHover: "hover:bg-green-200",
        },
        icon: Coffee,
    },
    {
        label: "شنط",
        value: "شنط",
        colors: {
            txt: "text-orange-600",
            bg: "bg-orange-100",
            bgHover: "hover:bg-orange-200",
        },
        icon: Briefcase,
    },
    {
        label: "بوكسات",
        value: "باكيدچات أو بوكسات",
        colors: {
            txt: "text-red-600",
            bg: "bg-red-100",
            bgHover: "hover:bg-red-200",
        },
        icon: Package,
    },
    {
        label: "أخرى",
        value: "أخرى",
        colors: {
            txt: "text-gray-600",
            bg: "bg-gray-100",
            bgHover: "hover:bg-gray-200",
        },
        icon: ShieldQuestionMark,
    },
];


export default function CategorySelect({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const selected = categories.find((c) => c.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex items-center gap-4 p-2 rounded-xl border border-gray-200 bg-gray-50"
        >
            <span className="text-base font-semibold text-gray-700 whitespace-nowrap mr-2">
                القسم:
            </span>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex-1 flex items-center cursor-pointer justify-between gap-3 py-2 px-4 rounded-xl ${selected?.colors?.bg ? selected?.colors?.bg : "bg-gray-100"
                    } ${selected?.colors?.bgHover
                        ? selected?.colors?.bgHover
                        : "hover:bg-gray-200"
                    } transition-colors`}
            >
                {selected ? (
                    <div className={`flex items-center gap-2 ${selected?.colors?.txt}`}>
                        <selected.icon size={18} />
                        <span className="font-bold">{selected.label}</span>
                    </div>
                ) : (
                    <span className="text-gray-400">اختر من القائمة</span>
                )}
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute flex flex-col gap-1 top-[110%] right-0 left-0 z-[100] bg-gray-300 border p-1 border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                        <div
                            key={cat.value}
                            onClick={() => {
                                onChange(cat.value);
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-fuchsia-50 cursor-pointer rounded-xl transition-colors border-b border-gray-50 last:border-0"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                <cat.icon size={18} />
                            </div>
                            <span className="font-medium text-gray-700">{cat.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
