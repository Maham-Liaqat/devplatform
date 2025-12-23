import React, { useState, useEffect } from "react";
import Spinner from "../components/common/Spinner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setLoading(false);
      setSubmitted(true);
      
      // Success animation
      const successElement = document.createElement('div');
      successElement.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in';
      successElement.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform scale-0 animate-pop-up">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-success-icon">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-800 text-center mb-2">Message Sent!</h3>
          <p class="text-gray-600 text-center mb-6">We'll get back to you soon.</p>
          <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Close
          </button>
        </div>
      `;
      document.body.appendChild(successElement);
      
      // Reset form after animation
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 from-blue-50 via-indigo-50 to-purple-50 p-6 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10 ${animateElements ? 'animate-float' : 'opacity-0'}`}
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className={`absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl ${animateElements ? 'animate-pulse-slow' : 'opacity-0'}`} />
        <div className={`absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl ${animateElements ? 'animate-pulse-slow' : 'opacity-0'}`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Main contact container */}
      <div className={`relative z-10 w-full max-w-4xl transform transition-all duration-700 ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Value & Trust Section */}
          <div className="space-y-8 animate-fade-in-left">

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Let’s Build Something <span className="text-blue-600">Great</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Whether you have an idea, a question, or a project in mind — we’re here to help you move forward with clarity and confidence.
              </p>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Why Contact Us?
              </h3>

              <ul className="space-y-4">
                {[
                  {
                    icon: "🚀",
                    title: "Fast & Clear Communication",
                    text: "We respond quickly and keep everything transparent."
                  },
                  {
                    icon: "🧠",
                    title: "Expert Guidance",
                    text: "Get practical advice, not generic answers."
                  },
                  {
                    icon: "🎯",
                    title: "Goal-Focused Solutions",
                    text: "We focus on results that actually matter to you."
                  }
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Happens Next */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">
                What Happens Next?
              </h3>

              <ol className="space-y-3 text-sm">
                <li className="flex items-center space-x-3">
                  <span className="font-bold text-lg">1.</span>
                  <span>We review your message carefully</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="font-bold text-lg">2.</span>
                  <span>We respond within 24 hours</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="font-bold text-lg">3.</span>
                  <span>We propose the best next step</span>
                </li>
              </ol>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <span className="text-2xl">🔒</span>
              <p className="text-gray-600 text-sm">
                Your message is 100% confidential. We never share your information.
              </p>
            </div>

          </div>


          {/* Right side - Contact form */}
          <div className="animate-fade-in-right">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* Form header with animation */}
              <div className="relative overflow-hidden rounded-t-xl -mt-8 -mx-8 mb-8">
                <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x"></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${formData.name ? 'text-blue-500' : 'text-gray-400'}`}>
                      <span className="text-xl">👤</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all duration-300 hover:bg-gray-100`}
                      placeholder="Enter your full name"
                    />
                    {formData.name && !errors.name && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center animate-pulse">
                        <span className="text-green-500">✓</span>
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 animate-shake">{errors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${formData.email ? 'text-blue-500' : 'text-gray-400'}`}>
                      <span className="text-xl">✉️</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all duration-300 hover:bg-gray-100`}
                      placeholder="you@example.com"
                    />
                    {formData.email && !errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center animate-pulse">
                        <span className="text-green-500">✓</span>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-shake">{errors.email}</p>
                  )}
                </div>

                {/* Message field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <div className={`absolute top-3 left-3 pointer-events-none transition-colors duration-300 ${formData.message ? 'text-blue-500' : 'text-gray-400'}`}>
                      <span className="text-xl">💬</span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all duration-300 hover:bg-gray-100 resize-none`}
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <p className="text-red-500 text-sm animate-shake">{errors.message}</p>
                    )}
                    <span className={`text-sm ml-auto ${formData.message.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitted}
                    className={`w-full py-4 px-4 rounded-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      submitted 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {submitted ? (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">✅</span>
                        Message Sent!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Send Message</span>
                        <span className="ml-2 text-lg">🚀</span>
                      </div>
                    )}
                  </button>
                )}

                {/* Form status */}
                <div className="text-center">
                  <div className="text-sm text-gray-500">
                    We typically respond within 24 hours
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
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
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pop-up {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes success-icon {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-fade-in-left {
          opacity: 0;
          animation: fade-in-left 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          opacity: 0;
          animation: fade-in-right 0.8s ease-out 0.2s forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-pop-up {
          animation: pop-up 0.5s ease-out forwards;
        }
        
        .animate-success-icon {
          animation: success-icon 0.5s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;