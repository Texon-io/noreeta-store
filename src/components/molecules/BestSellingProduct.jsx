import { useCart } from "../../hooks/useCart";
import BestSellingImg from "../atoms/BestSellingImg";
import Button from "../atoms/Button";
import {useState} from "react";

export default function BestSellingProduct({
  id,
  name,
  price,
  image,
  description,
}) {
  const { addToCart } = useCart();

    const [clicked, setClicked] = useState(false)

  const handleAdd = () => {
        setClicked(true)

      setTimeout(() =>{
          setClicked(false)
      }, 3500)
    addToCart({ id, name, price, image });
  };

  return (
    <div className="bg-card-bg rounded-xl shadow-md p-3 flex flex-col hover:scale-102 hover:shadow-xl transition duration-300 ">
      {/* Image */}
      <BestSellingImg image={image} name={name} />

      {/* Name and Price */}
      <div className="mt-3 flex flex-col gap-2">
        <h3 className="font-semibold text-accent-dark text-lg font-zain text-start">
          {name}
        </h3>

        <p className="text-base font-medium  text-start line-clamp-2">
          {description}
        </p>

        <p className="text-end text-md font-semibold text-zinc-800 mt-1 mx-3">
          {price} ج.م
        </p>
      </div>

      {/* Add to Cart Button */}
      <Button
        variant="main"
        size="sm"
        className={`mt-4 w-full`}
        onClick={handleAdd}
      >
        {" "}
          {clicked ? "تمت الإضافة إلى السلة": "إضافة إلى السلة"}
      </Button>
    </div>
  );
}
