import { Link } from "react-router";
import Logo from "@/assets/images/logo.png";

const routes = [
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/faq", name: "Faq" },
  { path: "/features", name: "Features" },
  { path: "/pricing", name: "Pricing" },
];

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md py-3 mt-20">
      <div className="flex flex-row justify-between items-start md:items-center gap-6">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img src={Logo} alt="logo" className="w-10 h-10 mr-10" />
            <h4 className="text-lg font-bold text-primary/80 -ml-8">SafePay</h4>
          </div>
        </Link>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {routes.map((route) => (
            <Link key={route.path} to={route.path} className=" hover:text-primary hover:scale-110 transition-all duration-300">
              {route.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} SafePay. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
