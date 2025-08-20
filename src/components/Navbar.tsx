import { useState } from "react";
import Logo from "@/assets/images/logo.png";
import { Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi"; // React icons

const routes = [
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/faq", name: "Faq" },
  { path: "/features", name: "Features" },
  { path: "/pricing", name: "Pricing" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full shadow-md sticky top-0 pb-3 backdrop-blur-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-8 h-8 mr-10" />
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-5">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="hover:text-primary hover:scale-110 transition-all duration-300 ease-in-out text-lg"
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link to="/login" className="px-4 py-2 border rounded-md cursor-pointer hover:border-primary hover:scale-110 transition-all duration-300 ease-in-out">
            Sign in
          </Link>
          <Link  to="/register" className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out">
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`flex flex-col md:hidden border-t border-b pb-5 absolute w-full z-20 bg-black transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100 top-10" : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="hover:text-primary text-lg py-2"
            onClick={() => setIsOpen(false)}
          >
            {route.name}
          </Link>
        ))}
        <div className="flex flex-col gap-2 mt-3 cursor-pointer">
          <Link to="/login" className="px-4 py-2 border rounded-md">Sign in</Link>
          <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md hover:scale-110 transition-all duration-300">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
