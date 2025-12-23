import React, { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  UserCheck,
  Clock,
  Award,
  DollarSign,
  MessageSquare,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    candidates: 120,
    jobs: 45,
    interviews: 10,
    hires: 38,
    pending: 17,
    revenue: "$42,500"
  });
  
  const [animateCards, setAnimateCards] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "John Doe", action: "completed frontend test", time: "5 min ago", status: "success" },
    { id: 2, user: "Sarah Smith", action: "applied for Backend Engineer", time: "12 min ago", status: "success" },
    { id: 3, user: "Mike Johnson", action: "failed technical interview", time: "1 hour ago", status: "failed" },
    { id: 4, user: "Emma Wilson", action: "scheduled interview", time: "2 hours ago", status: "pending" },
  ]);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        candidates: prev.candidates + Math.floor(Math.random() * 3),
        interviews: prev.interviews + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatsCard = ({ title, value, icon: Icon, trend, color, delay }) => (
    <div 
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl ${
        animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated background */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${color.split(' ')[0]} ${color.split(' ')[1]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-2 mt-4">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.value}% {trend.period}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dashboard</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time insights and analytics for your hiring platform
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <span className="text-green-700 font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Live Updates
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: Just now
              </div>
            </div>
          </div>

          {/* Quick Stats Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {["overview", "candidates", "jobs", "interviews", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Candidates"
            value={stats.candidates}
            icon={Users}
            color="from-blue-500 to-blue-600"
            trend={{ direction: 'up', value: 12, period: 'this week' }}
            delay={100}
          />
          
          <StatsCard
            title="Active Jobs"
            value={stats.jobs}
            icon={Briefcase}
            color="from-green-500 to-emerald-600"
            trend={{ direction: 'up', value: 8, period: 'this month' }}
            delay={200}
          />
          
          <StatsCard
            title="Interviews Scheduled"
            value={stats.interviews}
            icon={Calendar}
            color="from-purple-500 to-purple-600"
            trend={{ direction: 'up', value: 23, period: 'today' }}
            delay={300}
          />
          
          <StatsCard
            title="Successful Hires"
            value={stats.hires}
            icon={UserCheck}
            color="from-orange-500 to-orange-600"
            trend={{ direction: 'up', value: 15, period: 'this month' }}
            delay={400}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Pending Reviews</h3>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.pending}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(stats.pending / 50) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Candidates awaiting review</p>
          </div>
          
          <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Monthly Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stats.revenue}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+18.5% from last month</span>
            </div>
          </div>
          
          <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '700ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Success Rate</h3>
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">84%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: '84%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Candidate to hire conversion</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-700 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <MessageSquare className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-100' : 
                  activity.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : activity.status === 'failed' ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <span className="text-blue-600">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activity.status === 'success' ? 'bg-green-100 text-green-700' : 
                  activity.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
              View All Activity
            </button>
          </div>
        </div>

        {/* Performance Chart (Placeholder) */}
        <div className={`mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-700 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '900ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">Weekly</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Monthly</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Yearly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-1">
            {[65, 80, 60, 75, 90, 85, 70, 95, 88, 72, 82, 90].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-6 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-400 transition-all duration-1000 hover:opacity-80"
                  style={{ height: `${height}%` }}
                  title={`${height}%`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Avg. Hires per Month</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">+12.4% growth</span>
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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;