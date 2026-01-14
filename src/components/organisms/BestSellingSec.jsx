import useProducts from "../../hooks/useProducts.js";
import SecHeading from "../atoms/SecHeading.jsx";
import BestSellingProduct from "../molecules/BestSellingProduct.jsx";

function BestSellingSec() {
  // variable to store bestseller products
  let bestSeller;

  // Fetching bestseller by the same API
  const { data: products, isSuccess, error, isLoading } = useProducts();

  // on success assigning first 3 bestsellers products in variable
  if (isSuccess) {
    bestSeller = products.filter((p) => p.BestSeller || p.bestSeller).slice(0, 4) || [];
  }

  // on error console this error
  // you handle error and the rest of code
  if (error) console.error(error);
  return (
    <section id={`bestSelling`} className="max-w-7xl mx-auto px-4 py-6">
      {/* Sec Title */}
      <SecHeading>منتجاتنا الأكثر مبيعاً</SecHeading>

      {/* خط مزخرف تحت العنوان */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <div className="w-20 h-[2px] bg-accent-main/30"></div>
        <div className="w-2 h-2 rounded-full bg-accent-main"></div>
        <div className="w-20 h-[2px] bg-accent-main/30"></div>
      </div>

      {/* Products Grid */}
      <div
        className="
          pt-6
          px-4
          flex
          flex-wrap
          justify-center
          gap-8
        "
      >
        {bestSeller &&
          bestSeller.map((product) => (
            <div key={product.id} className="w-full sm:w-[45%] lg:w-[22%] min-w-[250px]">
              <BestSellingProduct
                id={product.id}
                name={product.Name || product.name}
                price={product.Price || product.price}
                image={product.ImageURL || product.image}
                description={product.Description || product.description}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default BestSellingSec;
