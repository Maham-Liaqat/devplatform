import React from "react";
import { 
  Heart, 
  Twitter, 
  Linkedin, 
  Github, 
  Shield, 
  Lock,
  Globe,
  Mail,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const trustedCompanies = [
    "Google", "Microsoft", "Amazon", "Spotify", "Netflix", "Apple", "Meta", "Tesla"
  ];

  const footerSections = [
    { title: "Product", links: ["Features", "Pricing", "API", "Status"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Community", "Contact"] }
  ];

  const trustBadges = [
    { icon: <Shield className="w-4 h-4" />, text: "GDPR Compliant" },
    { icon: <Lock className="w-4 h-4" />, text: "Bank-Level Security" },
    { icon: <Globe className="w-4 h-4" />, text: "Global Hiring" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-32">
      {/* Trusted Companies Marquee */}
      <div className="bg-gray-50 py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-600 font-medium mb-8">Trusted by leading companies worldwide</p>
          <div className="relative">
            <div className="marquee-wrapper">
              <div className="marquee-content">
                {[...trustedCompanies, ...trustedCompanies].map((company, i) => (
                  <span key={i} className="mx-12 text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
                    {company}
                  </span>
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {[...trustedCompanies, ...trustedCompanies].map((company, i) => (
                  <span key={i} className="mx-12 text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
                    {company}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">DevHire</h2>
              <p className="text-gray-600">Hire smarter, build faster</p>
            </div>
            <p className="text-gray-600 mb-8 max-w-md">
              The modern platform for hiring top tech talent. Powered by AI, trusted by thousands of companies worldwide.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Stay updated</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
                <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                  Subscribe
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-gray-900 mb-5">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <span className="text-gray-600">Follow us:</span>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-green-600 transition"><Twitter className="w-5 h-5" /></a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition"><Github className="w-5 h-5" /></a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    {badge.icon}
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>
            © {currentYear} DevHire. All rights reserved. 
            {" "}<span className="inline-flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> remotely
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          width: 200%;
          animation: marquee 45s linear infinite;
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
    </footer>
  );
};

export default Footer;