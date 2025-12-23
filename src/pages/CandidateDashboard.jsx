import React, { useEffect, useState } from "react";
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Sparkles, 
  ChevronDown,
  Linkedin,
  Mail,
  Globe,
  Star,
  Rocket
} from "lucide-react";

const CandidateDashboard = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Trigger hero animation
    setTimeout(() => setAnimateHero(true), 300);
    
    // Trigger cards animation when scrolled
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      if (window.scrollY > 400 && !animateCards) {
        setAnimateCards(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Gregory Arrington",
      role: "CEO & Founder",
      image: "../images/CEO.jpeg",
      bio: "Former Google Engineering Lead with 15+ years. Passionate about bridging the talent gap.",
      stats: "Led 500+ successful hires",
      color: "from-blue-500 to-indigo-600",
      response: "CEO & Leadership"
    },
    {
      id: 2,
      name: "Jeremiah Kalmus",
      role: "CTO",
      image: "../images/CTO.jpeg",
      bio: "Full Stack expert with the experience of tech hiring.",
      stats: "32 patents in Full Stack recruitment",
      color: "from-purple-500 to-pink-600",
      response: "CTO & Decision"
    },
    {
      id: 3,
      name: "Nakasi Fujimoto",
      role: "Head of Talent",
      image: "../images/Talent.jpg",
      bio: "Ex-Meta HR Director with expertise in scaling engineering teams for startups to enterprises.",
      stats: "Scaled 50+ engineering teams",
      color: "from-green-500 to-emerald-600",
      response: "Project Manager"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Developers Hired", icon: Users },
    { number: "95%", label: "Client Satisfaction", icon: Heart },
    { number: "500+", label: "Companies Trust Us", icon: Target },

    { number: "4.9/5", label: "Platform Rating", icon: Star }
  ];

  return (  
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section - Full Image */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/a.png)`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40"></div>
        </div>

        {/* Animated Welcome Text */}
        <div className={`relative h-full flex flex-col items-center justify-center text-white transition-all duration-1000 ${
          animateHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}

          {/* Main Title */}
          <div className="text-center px-4">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-spin-slow" />
                <span className="text-2xl font-light tracking-widest text-blue-300">WELCOME TO</span>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-spin-slow" />
              </div>
              
              <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-gradient-text">
                DevHire
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Revolutionizing tech hiring with AI-powered talent matching and seamless recruitment solutions
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/70" />
            </div>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg transition-all duration-700 ${
                    scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-8">
              <Rocket className="w-4 h-4" />
              OUR MISSION
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Building the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tech recruitment</span>
            </h2>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              At DevHire, we believe finding the right talent shouldn't be a challenge. 
              We're on a mission to transform how companies discover, assess, and hire 
              exceptional developers through cutting-edge technology and human expertise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Innovation", desc: "Leveraging AI for smarter matches", icon: "🚀" },
                { title: "Excellence", desc: "97% candidate satisfaction rate", icon: "🏆" },
                { title: "Community", desc: "Growing network of 50K+ developers", icon: "🤝" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - "Your Managers" */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
        <Users className="w-4 h-4" />
        MEET THE VISIONARIES
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Managers</span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        The brilliant minds behind DevHire's success, dedicated to revolutionizing 
        how the world hires tech talent.
      </p>
    </div>

    {/* Team Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {teamMembers.map((member, index) => (
        <div 
          key={member.id}
          className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-700 transform hover:-translate-y-4 hover:shadow-3xl ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          {/* Role badge - TOP-RIGHT CORNER */}
          <div className={`absolute top-4 right-4 z-20 px-4 py-2 bg-gradient-to-r ${member.color} text-white rounded-full text-sm font-bold shadow-lg`}>
            {member.role.includes('&') ? member.role.split('&')[0].trim() : member.role}
          </div>

          {/* Image Container */}
          <div className="relative pt-12 pb-8">
            {/* Circular image container */}
            <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <div className={`absolute inset-0 bg-gradient-to-r ${member.color} opacity-20`}></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center 25%' }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-0">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <div className={`inline-block px-4 py-1 bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-bold`}>
                {member.role.includes('&') ? member.role.split('&')[1].trim() : member.role}
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {member.bio}
            </p>

            {/* Stats */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <Award className={`w-5 h-5 ${member.color.split(' ')[0]} ${member.color.split(' ')[1].replace('to-', 'text-')}`} />
                <span className="text-sm font-medium text-gray-700">{member.stats}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors">
               
              </button>
              <button className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Role Badge at Bottom */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300 text-center">
            <span className="text-gray-700 font-bold uppercase tracking-wider">{member.response}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Values</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Transparency", desc: "Clear processes, honest communication", color: "from-blue-400 to-blue-600" },
                { title: "Excellence", desc: "Going above and beyond always", color: "from-purple-400 to-purple-600" },
                { title: "Innovation", desc: "Constantly evolving our technology", color: "from-green-400 to-green-600" },
                { title: "Partnership", desc: "Working together for success", color: "from-orange-400 to-orange-600" }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who have revolutionized their tech recruitment with DevHire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">DH</span>
                </div>
                DevHire
              </div>
              <p className="text-gray-400 mt-2">Redefining tech recruitment since 2020</p>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} DevHire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-gradient-text {
          background: linear-gradient(90deg, #fff, #60a5fa, #3b82f6, #8b5cf6, #fff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-text 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default CandidateDashboard;