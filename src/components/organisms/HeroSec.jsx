import {hero} from "../../utils/constants.js";
import {Link} from "react-router";

const Hero = () => {
    return (
        <section className="relative flex flex-col md:flex-row items-center justify-between px-6 lg:px-24 pb-0 pt-32 md:py-24 min-h-[85vh] gap-12 bg-white overflow-hidden">

            {/* Content Side */}
            <div className="flex-1 text-right">
        <span className="inline-block px-5 py-1 rounded-full text-sm font-bold mb-6 bg-secondary text-main-text">
          إصدارات جديدة
        </span>

                <h1 className="font-zain text-4xl lg:text-6xl leading-tight font-semibold mb-8 text-accent-main">
                    عالمك الخاص <br />
                    <span className="text-accent-dark">بين صفحات كتاب</span>
                </h1>

                <p className="font-zain text-lg lg:text-xl mb-10 max-w-2xl text-main-text leading-relaxed">
                    اكتشفي مجموعة مختارة من الكتب التي تلامس روحك وتجمل يومك، من الروايات الأكثر مبيعاً إلى كتب تطوير الذات.
                </p>

                <div className="flex flex-row gap-4 justify-start font-zain">
                    <Link to={`/products`} className="px-10 py-4 cursor-pointer  rounded-full font-bold text-white bg-accent-main hover:bg-accent-dark transition-all shadow-lg hover:shadow-accent-main/30 hover:scale-95 duration-300">
                        تسوقي الآن
                    </Link>

                    <a href={`#bestSelling`}>
                        <button
                            className="px-10 py-4 cursor-pointer  rounded-full font-bold border-2 border-accent-main text-accent-main hover:bg-card-bg transition-all hover:scale-95  duration-300">
                            الأكثر مبيعاً
                        </button>
                    </a>
                </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 flex justify-center items-center relative">
                {/* الدائرة اللي ورا الصورة بستايل نوريتا */}
                <div className="absolute w-72 h-72 lg:w-[450px] lg:h-[450px] rounded-full bg-secondary/30 blur-3xl"></div>

                <div className="relative z-10 p-4 bg-card-bg rounded-[40px] hover:-rotate-3 transition-transform duration-1000 max-md:hidden">
                    <img
                        src={hero}
                        alt="Noreta Books"
                        className="rounded-[30px] shadow-2xl object-cover max-w-full h-auto"
                    />
                </div>
            </div>

            {/* لمسة ديكور خفيفة */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-accent-main-light rounded-full opacity-20 blur-xl"></div>
        </section>
    );
};

export default Hero;