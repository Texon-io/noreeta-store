function NavIcon({ onClick, src, icon, className, children }) {
  return (
    <div
      className={`nav-icons bg-secondary/25 hover:bg-accent-dark/25 transition-colors duration-300 p-1.5 rounded-lg pb-0 ${className || ""}`}
    >
      <button onClick={onClick} className={`cursor-pointer main-hover`}>
          {icon}
        {children}
      </button>
    </div>
  );
}

export default NavIcon;
