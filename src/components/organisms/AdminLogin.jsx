const AdminLogin = ({ passInput, setPassInput, isLocked, timeLeft, handleLogin, formatTime }) => (
    <div dir="ltr" className="min-h-screen bg-[#FFF5F8] flex items-center justify-center p-6 font-zain">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-[#FFD1E0] animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#FFD1E0] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">🌸</div>
                <h2 className="text-3xl font-bold text-[#2D2D2D]">Admin Login</h2>
                <p className="text-gray-400 mt-2">Welcome to Norita’s Dashboard</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <input
                    type="password"
                    value={passInput}
                    disabled={isLocked}
                    onChange={(e) => setPassInput(e.target.value)}
                    placeholder={isLocked ? "Try again later" : "Password"}
                    className={`w-full px-6 py-4 rounded-2xl border transition-all ${
                        isLocked ? "bg-gray-50" : "border-[#FFD1E0] focus:ring-2 focus:ring-[#F781A8] outline-none"
                    } text-center text-lg`}
                    required
                />
                <button disabled={isLocked} className="w-full cursor-pointer py-4 rounded-2xl font-bold text-lg bg-[#F781A8] text-white hover:bg-[#D65A84] transition-all shadow-md active:scale-95">
                    {isLocked ? `Locked for ${formatTime(timeLeft)}` : "Open Dashboard"}
                </button>
            </form>
        </div>
    </div>
);

export default AdminLogin;