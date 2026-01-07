import { useState } from "react";
import NavIcon from "../atoms/NavIcon.jsx";
import NavTabs from "../molecules/NavTabs.jsx";
import {ShoppingBag, Menu} from "lucide-react"
import LogoWord from "../atoms/LogoWord.jsx";
import SecDivider from "../atoms/SecDivider.jsx";
import { useCart } from "../../hooks/useCart.jsx";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  // Cart
  const { toggleCart, itemCount } = useCart();

  return (
    <nav className="px-8 py-4 flex justify-between items-center text-main-text bg-white/85 backdrop-blur-sm mb-5 fixed top-0 right-0 left-0 z-50">
      {/*Navbar LogoWord */}
      <LogoWord>نوريتا ستور</LogoWord>

      {/* Navbar Tabs Horizontal version*/}
      <NavTabs variant="horizontal" />

      {/* Navbar Icons */}
      <div className="flex gap-4">
        <NavIcon className={`relative`} onClick={toggleCart} icon={<ShoppingBag/>}>
            {!itemCount || itemCount === 0 ? null :(<span className="absolute -top-1 -right-1 bg-accent-dark/85 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
              {itemCount}
            </span>)}
        </NavIcon>
        <NavIcon
          className="max-md:block hidden"
          icon={<Menu/>}
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </div>

      {/* Navbar Tabs Sidebar version */}
      <NavTabs
        variant="sidebar"
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      />

      {/* Navbar divider*/}
      <SecDivider pos="bottom-0" />
    </nav>
  );
}

export default Navbar;
