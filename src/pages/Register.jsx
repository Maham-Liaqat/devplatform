import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveUser } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);
  const [strength, setStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    setAnimateBg(true);
    // Calculate password strength
    let score = 0;
    if (form.password.length >= 8) score += 25;
    if (/[A-Z]/.test(form.password)) score += 25;
    if (/[0-9]/.test(form.password)) score += 25;
    if (/[^A-Za-z0-9]/.test(form.password)) score += 25;
    setStrength(score);
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear email exists error
    if (name === "email" && emailExists) {
      setEmailExists(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      // Check if email already exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const emailExists = users.some(user => user.email === form.email);
      if (emailExists) {
        newErrors.email = "This email is already registered";
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password = "Password must contain at least one special character";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Shake animation for invalid form
      const formElement = document.querySelector('form');
      formElement.classList.add('animate-shake');
      setTimeout(() => {
        formElement.classList.remove('animate-shake');
      }, 500);
      return;
    }
    
    setIsLoading(true);
    
    // Check email existence again before registration
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(user => user.email === form.email)) {
      setErrors({ email: "This email is already registered" });
      setEmailExists(true);
      setIsLoading(false);
      
      // Shake animation for duplicate email
      const emailInput = document.querySelector('input[name="email"]');
      emailInput.parentElement.classList.add('animate-shake');
      setTimeout(() => {
        emailInput.parentElement.classList.remove('animate-shake');
      }, 500);
      return;
    }
    
    // Simulate loading animation
    setTimeout(() => {
      saveUser(form);
      setIsLoading(false);
      
      // Success animation
      const formElement = document.querySelector('form');
      formElement.classList.add('animate-success');
      
      setTimeout(() => {
        alert("Registered successfully!");
        navigate("/login");
      }, 1000);
    }, 1500);
  };

  const getStrengthColor = () => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Fair";
    if (strength < 100) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 ${animateBg ? 'animate-float' : 'opacity-0'}`}
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
        
        <div className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl ${animateBg ? 'animate-pulse-slow' : 'opacity-0'}`} />
        <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl ${animateBg ? 'animate-pulse-slow' : 'opacity-0'}`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Registration Card */}
      <div className={`relative z-10 w-full max-w-md transform transition-all duration-700 ${animateBg ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
        {/* Decorative Top Border */}
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x"></div>
          </div>
          <div className="absolute top-3 right-4 animate-bounce">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-2xl p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg animate-pulse-once">
              <span className="text-white text-2xl">👤</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our community today</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-100 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  required
                />
                {form.name && !errors.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-check">
                    <span className="text-green-500">✓</span>
                  </div>
                )}
                {errors.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-check">
                    <span className="text-red-500">✗</span>
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-100 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : emailExists 
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  required
                />
                {form.email && !errors.email && !emailExists && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-check">
                    <span className="text-green-500">✓</span>
                  </div>
                )}
                {(errors.email || emailExists) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-check">
                    <span className="text-red-500">✗</span>
                  </div>
                )}
              </div>
              {(errors.email || emailExists) && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.email || "This email is already registered"}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-100 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.password}</p>
              )}
              
              {/* Password Strength Indicator */}
              {form.password && !errors.password && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Password strength</span>
                    <span className={`text-sm font-medium ${
                      strength < 25 ? 'text-red-600' :
                      strength < 50 ? 'text-orange-600' :
                      strength < 75 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getStrengthColor()}`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
                isLoading 
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              } animate-fade-in-up`}
              style={{ animationDelay: '0.5s' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Create Account</span>
                  <span className="ml-2 text-lg">🚀</span>
                </div>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "⚡", text: "Fast Setup" },
            { icon: "🔒", text: "Secure" },
            { icon: "🎯", text: "Easy to Use" }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-gray-100 flex flex-col items-center text-center transform transition-all duration-500 ${animateBg ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 100 + 700}ms` }}
            >
              <span className="text-2xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.2 + 1}s` }}>{feature.icon}</span>
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-once {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes check {
          0% {
            opacity: 0;
            transform: translateY(-10px) translateX(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        
        @keyframes success {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-once {
          animation: pulse-once 0.5s ease-in-out;
        }
        
        .animate-check {
          animation: check 0.3s ease-out;
        }
        
        .animate-success {
          animation: success 1s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Register;