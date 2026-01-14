import SecHeading from "../atoms/SecHeading";
import CategoryCard from "../molecules/CategoryCard";

function CategoriesSec() {
    const categories = [
        {
            id: "notes",
            title: "دفاتر و نوتات",
            subtitle: "عوالم لا نهائية",
            imgPath: "/images/gifts.png",
            to: "/products?category=notes",
            gridClass: "md:col-span-2 md:row-span-2 min-h-[380px]",
        },
        {
            id: "pens",
            title: "أقلام",
            subtitle: "دوّني إبداعكِ",
            imgPath: "/images/notebooks.png",
            to: "/products?category=pens",
            gridClass: "md:col-span-1 md:row-span-1 min-h-[180px]",
        },
        {
            id: "boxs",
            title: "بوكسات",
            subtitle: "لمسة فنية",
            imgPath: "/images/tools.png",
            to: "/products?category=boxs",
            gridClass: "md:col-span-1 md:row-span-1 min-h-[180px]",
        },
    ];

    return (
        <section id="categories" className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <SecHeading className="text-main-text">اكتشفي عالم نوريتا</SecHeading>
                    {/* خط مزخرف تحت العنوان */}
                    <div className="flex justify-center items-center gap-2 mt-3">
                        <div className="w-20 h-[2px] bg-accent-main/30"></div>
                        <div className="w-2 h-2 rounded-full bg-accent-main"></div>
                        <div className="w-20 h-[2px] bg-accent-main/30"></div>
                    </div>
                </div>

                {/* الشبكة الأساسية: 3 أعمدة في الـ Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`${cat.gridClass} relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500`}
                        >
                            <CategoryCard to={cat.to} className="w-full h-full">
                                {/* الحاوية الخلفية للصورة */}
                                <div className="absolute inset-0 z-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${cat.imgPath})`, backgroundColor: '#fdf2f8' }}
                                    />
                                    {/* Overlay متدرج عشان الكلام يبان (Contrast) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                </div>

                                {/* المحتوى النصي */}
                                <div className="absolute bottom-0 right-0 p-8 z-10 text-right font-zain">
                                    <h3 className="font-heading text-3xl text-white font-bold mb-1 group-hover:text-secondary-text-light transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="font-body text-white/80 text-sm">
                                        {cat.subtitle}
                                    </p>
                                </div>
                            </CategoryCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoriesSec;