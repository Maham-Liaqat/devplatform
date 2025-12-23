import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../../utils/auth";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const currentUser = getLoggedInUser();
    setUser(currentUser);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/jobs-listings", label: "Jobs" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contact", label: "Contact" },
    { path: "/candidates", label: "About Us" },
  ];

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="text-3xl font-bold text-black transition-all duration-300 group-hover:text-green-600">
              DevHire
            </div>
          </Link>

          {/* Desktop Navigation - Meridian-inspired hover animations */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-gray-100/70 rounded-full p-1.5 shadow-inner">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full ${
                      isActive
                        ? "text-white"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {/* Active / Hover Background Blob */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg"
                          : "bg-transparent"
                      } group-hover:bg-gradient-to-r group-hover:from-green-500/80 group-hover:to-emerald-500/80`}
                      style={{
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                      }}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="ml-8 flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-black">
                      {user.name || "Account"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${
                      dropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        Settings
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-7 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-6 pb-6 border-t pt-6 bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-gray-700">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="text-left text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-gray-700">
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-center font-medium shadow-lg"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;