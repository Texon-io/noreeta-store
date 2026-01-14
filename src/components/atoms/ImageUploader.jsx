const ImageUploader = ({ preview, onImageChange, onClear }) => (
    <div className="space-y-2">
        <label className="text-[#2D2D2D] font-bold mr-2">صورة المنتج</label>
        <div className={`border-2 border-dashed rounded-[2.5rem] p-8 transition-all ${preview ? "border-[#4FB6A1] bg-[#E0FAF5]/30" : "border-[#FFD1E0] bg-[#FFF5F8]"}`}>
            {preview ? (
                <div className="relative w-full max-w-xs mx-auto h-52 rounded-3xl overflow-hidden shadow-lg">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button onClick={onClear} className="absolute top-2 right-2 bg-white text-red-500 w-8 h-8 rounded-full shadow-md">✕</button>
                </div>
            ) : (
                <label className="cursor-pointer flex flex-col items-center py-4">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-2 text-[#F781A8]">➕</div>
                    <span className="text-[#D65A84] font-bold">اضغط لاختيار صورة</span>
                    <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
                </label>
            )}
        </div>
    </div>
);

export default ImageUploader;