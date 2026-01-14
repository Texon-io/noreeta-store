import { useCart } from "../../hooks/useCart";
import BestSellingImg from "../atoms/BestSellingImg";
import Button from "../atoms/Button";
import { useState } from "react";

export default function BestSellingProduct({
  id,
  name,
  price,
  image,
  description,
}) {
  const { addToCart } = useCart();
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 3500);
    addToCart({ id, name, price, image });
  };

  return (
    // أضفنا h-full لضمان أن كل الكاردات في الصف تأخذ نفس الطول
    <div className="bg-card-bg rounded-xl shadow-md p-3 flex flex-col h-full hover:scale-102 hover:shadow-xl transition duration-300">

      {/* 1. تثبيت منطقة الصورة */}
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <BestSellingImg image={image} name={name} />
      </div>

      {/* 2. منطقة النصوص مع flex-grow لتوزيع المساحات */}
      <div className="mt-3 flex flex-col flex-grow gap-2">
        {/* تثبيت ارتفاع الاسم (سطر واحد مثلاً) */}
        <h3 className="font-semibold text-accent-dark text-lg font-zain text-start line-clamp-1 h-[28px]">
          {name}
        </h3>

        {/* تثبيت ارتفاع الوصف (سطرين) عشان الكارد ميتمددش */}
        <p className="text-sm font-medium text-start line-clamp-2 text-zinc-600 h-[40px] leading-tight">
          {description}
        </p>

        {/* السعر يفضل مكانه دائماً فوق الزرار */}
        <p className="text-end text-md font-bold text-zinc-800 mt-auto pt-2">
          {price} ج.م
        </p>
      </div>

      {/* 3. الزرار في الأسفل دائماً */}
      <div className="mt-4">
        <Button
          variant="main"
          size="sm"
          className="w-full py-2" // تأكد من وجود padding ثابت
          onClick={handleAdd}
          disabled={clicked} // إضافة disabled اختيارية أثناء الـ 3 ثواني
        >
          {clicked ? "تمت الإضافة ✔️" : "إضافة إلى السلة"}
        </Button>
      </div>
    </div>
  );
}