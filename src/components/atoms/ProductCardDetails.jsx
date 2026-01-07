import Button from "./Button.jsx";
import { useState } from "react";

const ProductCardDetails = ({
                                id,
                                name,
                                description,
                                image,
                                price,
                                stock,
                                onAddToCart,
                            }) => {
    const [isAdded, setIsAdded] = useState(false);

    function handleClick() {
        if (isAdded) return; // منع التكرار لو تم الإضافة بالفعل

        setIsAdded(true);
        onAddToCart({ name, price, image, id });

        setTimeout(() => {
            setIsAdded(false);
        }, 3000);
    }

    return (
        <div className="card-data py-4 px-4 flex flex-col items-end gap-3 min-h-64 font-zain justify-between group bg-white rounded-2xl">

            {/* Product Name */}
            <h5 className="card-name font-bold w-full text-2xl text-main-text group-hover:text-accent-dark transition-colors duration-300 leading-tight">
                {name}
            </h5>

            {/* Short Description */}
            <p className="card-description w-full font-light text-gray-500 text-[0.9rem] line-clamp-2 text-start leading-relaxed">
                {description}
            </p>

            {/* Price and Stock info */}
            <div className="card-Price-stock flex justify-between items-center w-full mt-auto">
                <div className="font-bold text-2xl text-accent-dark flex items-baseline gap-1">
                    {price}
                    <span className="text-sm font-medium text-gray-400">ج.م</span>
                </div>

                <div className="card-stock px-2 py-1 bg-gray-50 rounded-md border border-gray-100 font-medium text-xs text-gray-500">
                    المخزون: <span className="text-main-text">{stock}</span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button
                onClick={handleClick}
                className={`w-full mx-0 mt-3 transition-all duration-300 ${
                    isAdded ? "bg-green-600 border-green-600 hover:bg-green-700" : ""
                }`}
                size="sm"
                disabled={isAdded}
            >
                <div className="flex items-center justify-center gap-2">
                    {isAdded && <span>✓</span>}
                    {isAdded ? "تمت الإضافة" : "أضف للسلة"}
                </div>
            </Button>
        </div>
    );
};

export default ProductCardDetails;