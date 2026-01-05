import AboutImg from "../atoms/AboutImg";
import AboutTxt from "../atoms/AboutTxt";
import Button from "../atoms/Button";
import SecHeading from "../atoms/SecHeading";
import AboutList from "../molecules/AboutList";

function AboutSec() {
    return (
        <section id="about" className="relative pt-24 pb-20 px-6 lg:px-24 bg-white overflow-hidden">

            {/* دوائر ديكور خلفية أرق */}
            <div className="absolute top-10 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 -left-20 w-64 h-64 bg-accent-main-light/30 rounded-full blur-[80px]"></div>

            <div className="text-center mb-20 relative">
                <SecHeading>عن عالم نوريتا</SecHeading>
                {/* خط مزخرف تحت العنوان */}
                <div className="flex justify-center items-center gap-2 mt-3">
                    <div className="w-20 h-[2px] bg-accent-main/30"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-main"></div>
                    <div className="w-20 h-[2px] bg-accent-main/30"></div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row-reverse justify-center items-center gap-16 lg:gap-40">

                {/* الجانب البصري - الصورة والأيقونة الكيوت */}
                <div className="relative group shrink-0">
                    {/* خلفية الصورة المتداخلة */}
                    <div className="absolute -inset-4 bg-secondary/20 rounded-[2.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
                    <div className="absolute -inset-4 bg-card-bg rounded-[2.5rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>

                    <div className="relative z-10 drop-shadow-xl">
                        <AboutImg />
                    </div>

                    {/* الأيقونة الكيوت المطورة */}
                    <div className="absolute -bottom-8 -left-8 z-20 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-accent-main/10 border-b-4 border-accent-main animate-[float_4s_ease-in-out_infinite]">
                        <span className="text-4xl select-none">✨</span>
                    </div>
                </div>

                {/* النصوص والمحتوى */}
                <div className="w-full lg:w-1/2 flex flex-col gap-10 text-right font-zain">
                    <div className="space-y-6">
                        <h3 className="font-heading text-4xl text-accent-dark font-bold leading-tight">
                            حيث تجتمع <span className="">الأناقة</span> <br />
                            مع متعة القراءة
                        </h3>
                        <div className="font-body text-main-text text-lg leading-relaxed opacity-90">
                            <AboutTxt />
                        </div>
                    </div>

                    <div className="bg-card-bg/50 backdrop-blur-sm p-8 rounded-[2rem] border-r-4 border-accent-main shadow-sm">
                        <AboutList />
                    </div>

                    <div className="mt-2">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://api.whatsapp.com/message/VDEV3XJBZ4TRK1?autoload=1&app_absent=0"
                            className="inline-block group"
                        >
                            <button className="px-10 py-4 cursor-pointer  rounded-full font-bold text-white bg-accent-main hover:bg-accent-dark transition-all shadow-lg hover:shadow-accent-main/30 hover:scale-95 duration-300">
                                انضمي لنا
                            </button>
                        </a>
                    </div>
                </div>

            </div>

            {/* Styles للأنيميشن بتاع الأيقونة */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
            `}} />
        </section>
    );
}

export default AboutSec;