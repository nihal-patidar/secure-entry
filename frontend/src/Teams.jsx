import React, { useState } from "react";
import { Github, Linkedin, Mail, Instagram, Sparkles, Star } from "lucide-react";
// import people from "./pages/Teams Data/Members.jsx"; 
import Navbar from "./components/Navbar.jsx";
const people = [
  {
    name: "Piyush Sharmna",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    Worked: "Frontend Development, Form Builder",
    expertise: "React, Javascript, UI/UX",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:alice@example.com", name: "Email" }
    ]
  },
  {
    name: "Virender Singh Bhadoriya",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    Worked: "Backend, Frontend",
    expertise: "MERN, GenAI",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:bob@example.com", name: "Email" }
    ]
  },
  {
    name: "Nikhil Patidar",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    Worked: "Frontend, Backend",
    expertise: "Figma, Design Systems, Research",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:carol@example.com", name: "Email" },
    ]
  },
  {
    name: "David Wilson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    Worked: "Data Science",
    expertise: "Machine Learning, Python, Analytics",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:david@example.com", name: "Email" }
    ]
  },
  {
    name: "Nigga Arjhariya",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    Worked: "Marketing Strategy",
    expertise: "Digital Marketing, Content, SEO",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:emma@example.com", name: "Email" },
    ]
  },
  {
    name: "Frank Rodriguez",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    Worked: "Mobile Development",
    expertise: "React Native, Swift, Flutter",
    socials: [
      { icon: "github", url: "https://github.com", name: "GitHub" },
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "mail", url: "mailto:frank@example.com", name: "Email" }
    ]
  }
];

const TeamCards = () => {
  const getIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      instagram: Instagram,
      email: Mail,
      mail: Mail,
    };
    return icons[iconName.toLowerCase()] || null;
  };

  const PersonCard = ({ person, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating decoration elements */}
        <div className={`absolute -top-2 -right-2 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
       
        <div className={`absolute -top-1 -left-1 transition-all duration-700 delay-100 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <Star className="w-2 h-2 text-white" />
          </div>
        </div>

        <div
          className={`relative overflow-hidden rounded-2xl p-6 w-72 h-96 transition-all duration-500 transform
            ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'}
            bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
            backdrop-blur-sm flex flex-col`}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute inset-0 transition-transform duration-1000 ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600"></div>
            </div>
          </div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.8" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="text-center flex-1">
              {/* Profile Image */}
              <div className="relative inline-block mb-4 w-20 h-20">
                <div className={`absolute inset-0 rounded-full transition-all duration-300 p-0.5 ${
                  isHovered ? 'animate-pulse' : ''
                }`} style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                }}>
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={person.image}
                      alt={person.name}
                      className={`w-full h-full rounded-full object-cover transition-all duration-500
                        ${isHovered ? "scale-105 brightness-110" : ""}
                        shadow-md`}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=f0f9ff&color=3b82f6&size=128`;
                      }}
                    />
                  </div>
                </div>
               
                {/* Floating ring effect */}
                <div className={`absolute inset-0 rounded-full border border-blue-300 transition-all duration-500 ${
                  isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
                }`} />
              </div>

              {/* Name */}
              <h2 className={`text-lg font-bold mb-3 transition-all duration-300 ${
                isHovered ? 'scale-105' : ''
              } text-gray-800`}>
                {person.name}
              </h2>

              {/* Work and Expertise */}
              <div className="space-y-2 mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-2.5 border border-blue-100">
                  <div className="text-xs font-semibold text-blue-700 mb-1">Worked On</div>
                  <div className="text-sm text-gray-700 font-medium">{person.Worked}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-2.5 border border-purple-100">
                  <div className="text-xs font-semibold text-purple-700 mb-1">Expertise</div>
                  <div className="text-sm text-gray-700 font-medium">{person.expertise}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`transition-all duration-500 transform ${
                isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
              }`}
            >
              <div className="flex justify-center space-x-2 pt-3 border-t border-gray-100">
                {person.socials.map((social, socialIndex) => {
                  const Icon = getIcon(social.icon);
                  return (
                    Icon && (
                      <a
                        key={socialIndex}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        className={`group/social relative p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                          bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                          shadow-md hover:shadow-lg
                          text-white`}
                        style={{
                          transitionDelay: `${socialIndex * 50}ms`
                        }}
                      >
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover/social:rotate-12" />
                       
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {social.name}
                          </div>
                        </div>
                      </a>
                    )
                  );
                })}
              </div>
            </div>
          </div>

          {/* Elegant glow effect */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
          }} />
        </div>
      </div>
    );
  };

  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-56 h-56 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h1 className="text-5xl font-bold mb-4 relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-12">
              Our Team
            </h1>
            <div className="absolute inset-0 text-5xl font-bold opacity-10 blur-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transform translate-x-1 translate-y-1">
              Our Team
            </div>
          </div>
         
          <div className="relative flex inline-block">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the talented individuals who bring innovation and excellence to every project
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 gap-y-12">
          {people.map((person, index) => (
            <PersonCard key={index} person={person} index={index} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default TeamCards;