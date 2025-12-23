import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";

// Sophisticated Lucide icons for features
import { BrainCircuit, Code2, UsersRound, Timer, ShieldCheck, BarChart4 } from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const incrementTime = 20;
    const increment = end / (duration / incrementTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const images = [
    "../../images/hero_1.jpg",
    "../../images/hero_2.png",
    "../../images/hero_4.png",
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Optimized parallax
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-triggered animations - Now work both ways (up & down)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          entry.target.classList.remove("animate-out");
        } else {
          // When scrolling up, re-trigger animation if element goes out of view again
          entry.target.classList.remove("animate-in");
          entry.target.classList.add("animate-out");
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax values
  const heroParallax = scrollY * 0.2;
  const floatingBadgeParallax = scrollY * 0.15;

  // Company names for marquee
  const companies = ["Google", "Microsoft", "Amazon", "Spotify", "Netflix", "Apple", "Meta", "Tesla"];

  return (
    <>
 
      <div className="font-sans bg-[#fafafa] overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 md:pt-24 md:pb-40 overflow-hidden bg-white">
          <div
            className="absolute inset-0 -z-10 opacity-5 will-change-transform"
            style={{
              backgroundImage: "radial-gradient(circle at center, #10b981 0%, transparent 70%)",
              transform: `translateY(${heroParallax}px)`,
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text Side */}
              <div
                className="text-center md:text-left order-2 md:order-1"
                data-animate
                data-animation="slide-left"
              >
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                  TRUSTED BY 1000+ TECH COMPANIES
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Hire Top Tech Talent <br />
                  Faster with AI
                </h1>
                <p className="mt-6 text-lg text-gray-700 max-w-2xl">
                  DevHire helps you find, assess, and hire elite developers 2x faster
                  with intelligent matching and automated screening.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold shadow hover:shadow-lg hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Start Free Trial →
                  </Link>
                  <button className="px-8 py-4 bg-white text-black rounded-full font-semibold border border-gray-300 hover:border-green-600 transition-all duration-300">
                    Book a Demo
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600 justify-center md:justify-start">
                  <span>• No credit card required</span>
                  <span>• 14-day free trial</span>
                  <span>• Cancel anytime</span>
                </div>

                {/* Stats Section */}
                <div className="mt-20">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto md:mx-0"
                    data-animate
                    data-animation="slide-up"
                  >
                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl font-bold text-black mb-3">
                          <AnimatedCounter end={128} suffix="+" />
                        </div>
                        <p className="text-lg font-medium text-gray-800">Companies</p>
                        <p className="text-sm text-gray-600 mt-1">Trust Us</p>
                      </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl font-bold text-black mb-3">
                          <AnimatedCounter end={16} suffix="%" />
                        </div>
                        <p className="text-lg font-medium text-gray-800">Satisfaction</p>
                        <p className="text-sm text-gray-600 mt-1">Rate</p>
                      </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-4xl md:text-5xl font-bold text-black mb-3">0x</div>
                        <p className="text-lg font-medium text-gray-800">Faster</p>
                        <p className="text-sm text-gray-600 mt-1">Hiring</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Carousel */}
              <div
                className="order-1 md:order-2 relative"
                data-animate
                data-animation="slide-right"
                data-delay="200"
              >
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="aspect-video relative">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`DevHire Dashboard ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}

                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow hover:scale-110 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow hover:scale-110 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="absolute top-4 right-4 bg-white/90 rounded-full p-3 shadow"
                    >
                      {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "w-8 bg-green-600"
                              : "bg-gray-400 hover:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 will-change-transform"
                    style={{
                      transform: `translateY(${floatingBadgeParallax}px)`,
                    }}
                    data-animate
                    data-animation="slide-up"
                    data-delay="500"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-700 text-xl">✓</span>
                      </div>
                      <div>
                        <div className="font-semibold text-black">Perfect candidate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-24 pt-0 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-5 py-2.5 rounded-full text-sm font-medium mb-8">
                WHY CHOOSE DEVHIRE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Everything you need <br />
                for modern hiring
              </h2>
              <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
                Powerful features designed to streamline your entire hiring process
              </p>
            </div>

            <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <BrainCircuit className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">AI-Powered Matching</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Our algorithm matches you with the perfect candidates in seconds.
                  </p>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="150"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <Code2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Integrated Coding Tests</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Built-in coding assessments with real-time evaluation.
                  </p>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <UsersRound className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Vetted Talent Pool</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Access pre-screened developers ready to hire.
                  </p>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="450"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <Timer className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Fast Hiring Process</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Reduce time-to-hire from weeks to just days.
                  </p>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="600"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Secure & Compliant</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Enterprise-grade security with GDPR compliance.
                  </p>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 hover:-translate-y-3 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="750"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-green-700 transition-colors">
                    <BarChart4 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Analytics Dashboard</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Track hiring metrics and team performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Infinite Marquee */}
        <section className="py-32 bg-gradient-to-b from-[#fafafa] to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-5 py-3 rounded-full text-sm font-medium mb-10">
                TRUSTED BY INDUSTRY LEADERS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-12">
                Loved by teams at
              </h2>

              {/* Infinite Scrolling Marquee */}
              <div className="relative h-32 overflow-hidden mb-20">
                <div className="absolute inset-0 flex items-center">
                  <div className="marquee-wrapper">
                    <div className="marquee-content">
                      {[...companies, ...companies, ...companies].map((company, i) => (
                        <span
                          key={i}
                          className="mx-16 text-4xl md:text-5xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-500 whitespace-nowrap"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                    <div className="marquee-content" aria-hidden="true">
                      {[...companies, ...companies, ...companies].map((company, i) => (
                        <span
                          key={i}
                          className="mx-16 text-4xl md:text-5xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-500 whitespace-nowrap"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#fafafa] to-transparent pointer-events-none z-20" />
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-green-600 mb-6 opacity-70" fill="currentColor" />

                  <p className="text-lg text-gray-800 leading-relaxed mb-8 italic">
                    "DevHire cut our hiring time by 70%. The AI matching is incredibly accurate."
                  </p>

                  <div className="flex text-yellow-500 mb-6">
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      SC
                    </div>
                    <div>
                      <p className="font-bold text-black text-lg">Sarah Chen</p>
                      <p className="text-gray-600">CTO at TechFlow</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-green-600 mb-6 opacity-70" fill="currentColor" />

                  <p className="text-lg text-gray-800 leading-relaxed mb-8 italic">
                    "Best hiring platform we've used. The quality of candidates is outstanding."
                  </p>

                  <div className="flex text-yellow-500 mb-6">
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      MJ
                    </div>
                    <div>
                      <p className="font-bold text-black text-lg">Marcus Johnson</p>
                      <p className="text-gray-600">Engineering Lead at ScaleUp</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
                data-animate
                data-animation="slide-up"
                data-delay="400"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-green-600 mb-6 opacity-70" fill="currentColor" />

                  <p className="text-lg text-gray-800 leading-relaxed mb-8 italic">
                    "Integrated coding tests saved us hundreds of hours in technical screening."
                  </p>

                  <div className="flex text-yellow-500 mb-6">
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                    <Star className="w-6 h-6 fill-current" />
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      PS
                    </div>
                    <div>
                      <p className="font-bold text-black text-lg">Priya Sharma</p>
                      <p className="text-gray-600">VP Engineering at CloudNine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                READY TO TRANSFORM YOUR HIRING?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Start hiring smarter today
              </h2>
              <p className="text-lg text-gray-700 mb-10">
                Join thousands of companies that trust DevHire to build their dream teams.
              </p>

              <Link
                to="/register"
                className="inline-block px-10 py-5 bg-green-600 text-white rounded-full font-bold text-lg shadow hover:shadow-lg hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Free
              </Link>

              <p className="mt-6 text-sm text-gray-600">
                Free 14-day trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Animation & Marquee Styles */}
      <style jsx>{`
        [data-animate] {
          opacity: 0;
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        }

        /* Reverse animation when scrolling up */
        [data-animate].animate-out {
          opacity: 0;
        }

        [data-animation="slide-left"] {
          transform: translateX(-80px);
        }
        [data-animation="slide-left"].animate-in {
          opacity: 1;
          transform: translateX(0);
          transition-delay: var(--delay, 0ms);
        }

        [data-animation="slide-right"] {
          transform: translateX(80px);
        }
        [data-animation="slide-right"].animate-in {
          opacity: 1;
          transform: translateX(0);
          transition-delay: var(--delay, 0ms);
        }

        [data-animation="slide-up"] {
          transform: translateY(60px);
        }
        [data-animation="slide-up"].animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: var(--delay, 0ms);
        }

        [data-delay] {
          --delay: attr(data-delay ms);
        }

        /* Marquee */
        .marquee-wrapper {
          display: flex;
          width: 200%;
          animation: marquee 60s linear infinite;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          width: 100%;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .marquee-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default Landing;