import { useState } from "react";
import Logo from "@/assets/images/logo.png";
import { Link, useLocation } from "react-router"; // useLocation added
import { FiMenu, FiX } from "react-icons/fi"; 
import { ModeToggle } from "./ModeToggle";

const routes = [
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/faq", name: "Faq" },
  { path: "/features", name: "Features" },
  { path: "/pricing", name: "Pricing" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // get current route

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full sticky top-0 py-3 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-40">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-10 h-10 mr-10" />
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-5">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`text-lg hover:text-primary hover:scale-105 transition-all duration-300 ease-in-out ${
                  isActive(route.path) ? "text-primary font-semibold" : ""
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <ModeToggle/>
          <Link to="/login" className="px-4 py-2 border rounded-md cursor-pointer hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out">
            Sign in
          </Link>
          <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle/>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`flex flex-col md:hidden border-t border-b pb-5 absolute w-full z-20 bg-white dark:bg-black transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100 top-16" : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`text-lg py-2 hover:text-primary ${
              isActive(route.path) ? "text-primary font-semibold" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            {route.name}
          </Link>
        ))}
        <div className="flex flex-col gap-2 mt-3 cursor-pointer">
          <Link to="/login" className="px-4 py-2 border rounded-md">Sign in</Link>
          <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md hover:scale-105 transition-all duration-300">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
