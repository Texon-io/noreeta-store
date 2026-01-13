function LogoWord({ children, className, font }) {
  return (
    <div
      className={`nav-logo font-noto text-3xl text-accent-dark ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export default LogoWord;
