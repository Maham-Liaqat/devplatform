import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  MapPin, 
  Briefcase, 
  Building, 
  Clock, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";

const JobListings = () => {
  const navigate = useNavigate();
  const [hoveredJob, setHoveredJob] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-Time",
      link: "/frontendTest",
      salary: "$90,000 - $120,000",
      experience: "2+ years",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      featured: true,
      applicants: 42
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "InnoSoft Solutions",
      location: "Bangalore, India",
      type: "Part-Time",
      link: "/frontendTest",
      salary: "$70,000 - $95,000",
      experience: "3+ years",
      posted: "1 week ago",
      skills: ["Node.js", "Python", "AWS", "MongoDB"],
      featured: false,
      applicants: 28
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "CodeWorks Technologies",
      location: "San Francisco, CA",
      type: "Contract",
      link: "/frontendTest",
      salary: "$110,000 - $140,000",
      experience: "4+ years",
      posted: "3 days ago",
      skills: ["React", "Next.js", "GraphQL", "PostgreSQL"],
      featured: true,
      applicants: 56
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Remote",
      type: "Full-Time",
      link: "/frontendTest",
      salary: "$85,000 - $110,000",
      experience: "3+ years",
      posted: "5 days ago",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      featured: false,
      applicants: 31
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      type: "Full-Time",
      link: "/frontendTest",
      salary: "$100,000 - $130,000",
      experience: "5+ years",
      posted: "Yesterday",
      skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
      featured: true,
      applicants: 19
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "AppCraft",
      location: "Remote",
      type: "Contract",
      link: "/frontendTest",
      salary: "$95,000 - $125,000",
      experience: "3+ years",
      posted: "4 days ago",
      skills: ["React Native", "Swift", "Android", "Firebase"],
      featured: false,
      applicants: 37
    }
  ];

  const filteredJobs = jobs.filter(job => {
    if (filter !== "all" && job.type !== filter) return false;
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && 
        !job.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleApplyClick = (job) => {
    // Add click animation
    const button = document.getElementById(`apply-btn-${job.id}`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
        navigate(job.link);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Career Move</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Find the perfect tech role that matches your skills and ambitions
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <span className="text-green-700 font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {jobs.length} Open Positions
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-8 border border-white/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by title or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {["all", "Full-Time", "Part-Time", "Contract"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                      filter === type
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {type === "all" ? "All Jobs" : type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              {/* Featured badge */}
              {job.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              {/* Card content */}
              <div className="p-6">
                {/* Job header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-medium">{job.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job details */}
                <div className="space-y-3 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">{job.salary}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <span>•</span>
                      <span>{job.posted}</span>
                    </div>
                    <span className="text-sm text-gray-500">{job.experience} exp</span>
                  </div>
                </div>

                {/* Apply button */}
                <button
                  id={`apply-btn-${job.id}`}
                  onClick={() => handleApplyClick(job)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-500 flex items-center justify-center gap-2 ${
                    hoveredJob === job.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl transform scale-[1.02]'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg'
                  }`}
                >
                  <span>Apply Now</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${
                    hoveredJob === job.id ? 'translate-x-2' : ''
                  }`} />
                </button>
              </div>

              {/* Hover gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-500 pointer-events-none ${
                hoveredJob === job.id ? 'opacity-100' : ''
              }`}></div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all"
            >
              View All Jobs
            </button>
          </div>
        )}

        {/* Stats footer */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-white/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{jobs.length}</div>
              <div className="text-gray-600">Total Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">{jobs.filter(j => j.featured).length}</div>
              <div className="text-gray-600">Featured Roles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{jobs.filter(j => j.location === "Remote").length}</div>
              <div className="text-gray-600">Remote Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600">Avg Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default JobListings;