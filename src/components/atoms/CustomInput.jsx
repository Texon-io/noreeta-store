const CustomInput = ({ label, ...props }) => (
    <div className="space-y-2">
        <label className="text-[#2D2D2D] font-bold mr-2">{label}</label>
        <input
            {...props}
            className="w-full px-6 py-4 rounded-2xl border border-[#E0FAF5] bg-[#E0FAF5]/20 focus:bg-white focus:ring-2 focus:ring-[#4FB6A1] outline-none transition-all"
        />
    </div>
);

export default CustomInput;