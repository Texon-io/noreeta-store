function CategoryList({ category, activeCategory, setActiveCategory }) {
    // تحديد هل العنصر ده هو المختار حالياً
    const isActive = activeCategory === category;

    return (
        <li
            onClick={() => setActiveCategory(category)}
            className={`
        list-none px-4 py-2 rounded-full cursor-pointer font-medium text-sm sm:text-base
        transition-all duration-200 select-none flex justify-center items-center whitespace-nowrap
        
        ${isActive
                ? "bg-accent-dark text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-accent-main/20 hover:text-accent-dark"}
      `}
        >
            {category}
        </li>
    );
}

export default CategoryList;