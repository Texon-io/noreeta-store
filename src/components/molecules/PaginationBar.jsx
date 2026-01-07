import Button from "../atoms/Button.jsx";

function PaginationBar({
                           products,
                           currentPage,
                           setCurrentPage,
                           itemsPerPage,
                       }) {
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // لو مفيش غير صفحة واحدة، مش لازم نعرض الـ Bar
    if (totalPages <= 1) return null;

    const scrollToTop = () => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    };

    const handleNext = () => {
        setCurrentPage((p) => {
            const next = Math.min(p + 1, totalPages);
            scrollToTop();
            return next;
        });
    };

    const handlePrev = () => {
        setCurrentPage((p) => {
            const prev = Math.max(p - 1, 1);
            scrollToTop();
            return prev;
        });
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-5 font-zain">
            <div className="flex items-center gap-2">
                <Button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    variant="pagination"
                    className="w-24 border-none shadow-none bg-gray-100 hover:bg-accent-main/30 text-accent-dark hover:text-main-text"
                    size="sm"
                >
                    → السابق
                </Button>

                {/* عرض عداد الصفحات بستايل أشيك */}
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <span className="font-bold text-accent-dark">{currentPage}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">{totalPages}</span>
                </div>

                <Button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    variant="pagination"
                    className="w-24 border-none shadow-none bg-gray-100 hover:bg-accent-main/30 text-accent-dark hover:text-main-text"
                    size="sm"
                >
                    التالي ←
                </Button>
            </div>
        </div>
    );
}

export default PaginationBar;