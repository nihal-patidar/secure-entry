import React, { useState } from "react";
import { Github, Linkedin, Mail, Instagram, Sparkles, Star, Crown, Award } from "lucide-react";
import Navbar from "./Navbar.jsx";

const founders = [
  {
    name: "Nihal Patidar",
    image: "/images/NihalPatidarImage.jpg",
    title: "Founder",
    Role: "Vision & Strategy, Core Development",
    expertise: "Team Building, Backend, Frontend",
    // socials: [
    //   { icon: "github", url: "https://github.com/nihal-patidar", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/nihal-patidar/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:nihalpatidar14@gmail.com", name: "Email" }
    // ]
  },
  {
    name: "Yagyadeep Ahirwar",
    image: "/images/YagyaDeepImage.jpg",
    title: "Co-Founder",
    Role: "Technical Architecture",
    expertise: "System Design",
    // socials: [
    //   { icon: "github", url: "https://github.com/yagyadeep786", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/yagyadeep-ahirwar/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:yagyadeepahirwar@gmail.com", name: "Email" }
    // ]
  }
];

const people = [
  {
    name: "Piyush Sharmna",
    image: "/images/PiyushImage.jpeg",
    Role: "Frontend Development, Form Builder, Design",
    expertise: "React, JavaScript, Node.js, Framer Motion",
    // socials: [
    //   { icon: "github", url: "https://github.com/arsenic-art", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/piyush-sharma-757585329/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:piyushsharmaa@yahoo.com", name: "Email" }
    // ]
  },
  {
    name: "Virender Singh Bhadoriya",
    image: "/images/VirenderImage.jpg",
    Role: "Frontend & Backend Development",
    expertise: "React, Node.js, AI/ML, Gen AI",
    // socials: [
    //   { icon: "github", url: "http://github.com/Virender07th", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/virender-singh-bhadoriya-95b91a276/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:hs374639@gmail.com", name: "Email" }
    // ]
  },
  {
    name: "Nikhil Patidar",
    image: "/images/NikhilImage.jpg",
    Role: "Frontend, Backend, Logic",
    expertise: "React, JavaScript, Node.js",
    // socials: [
    //   { icon: "github", url: "https://github.com/Nikhil-687", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/nikhil-patidar-03155a292/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:patidarnikhil687@gmail.com", name: "Email" },
    // ]
  },
  {
    name: "Tanay Sharma",
    image: "/images/TanayImage.jpg",
    Role: "Frontend, Backend, Design",
    expertise: "UI/UX, React, Node.js, Figma, Next.js",
    // socials: [
    //   { icon: "github", url: "https://github.com/TanaySharma15", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/tanaykumarsharma/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:tanaysharma1526@gmail.com", name: "Email" }
    // ]
  },
  {
    name: "Nagesh Arjariya",
    image: "/images/NageshImage.jpg",
    Role: "Frontend, Backend, Debugger",
    expertise: "React, NodeJs, Django, Python",
    // socials: [
    //   { icon: "github", url: "https://github.com/finnnagesh", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/nagesh-arjariya-019556292/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:nagesharjariya@gmail.com", name: "Email" },
    // ]
  },
  {
    name: "Asad Qureshi",
    image: "/images/AsadImage.jpg",
    Role: "FrontEnd, Design, UI/UX",
    expertise: "Figma, Web Design, React, Tailwind CSS",
    // socials: [
    //   { icon: "github", url: "https://github.com/Asad-Qureshi-Programmer", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/asad-qureshi-0894b8305/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:100asadqureshi@gmail.com", name: "Email" }
    // ]
  },
  {
    name: "Aman Ahmad",
    image: "/images/AmanImage.jpg",
    Role: "Frontend Development, Design",
    expertise: "React, NodeJs, Figma, Framer Motion",
    // socials: [
    //   { icon: "github", url: "https://github.com/wizardamxn", name: "GitHub" },
    //   { icon: "linkedin", url: "https://www.linkedin.com/in/wizardamxn/", name: "LinkedIn" },
    //   { icon: "mail", url: "mailto:amank225566@gmail.com", name: "Email" }
    // ]
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

  const FounderCard = ({ person, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
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
          className={`relative overflow-hidden rounded-2xl p-6 w-80 h-auto transition-all duration-500 transform
            ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'}
            bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
            backdrop-blur-sm flex flex-col`}
        >
           
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute inset-0 transition-transform duration-1000 ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600"></div>
            </div>
          </div>

          {/* Simple founder badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm z-20">
            Founder
          </div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id={`founder-dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.8" fill="url(#founder-gradient)" />
                  <defs>
                    <linearGradient id="founder-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#founder-dots-${index})`} />
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

              {/* Name and Title */}
              <h2 className={`text-lg font-bold mb-2 transition-all duration-300 ${
                isHovered ? 'scale-105' : ''
              } text-gray-800`}>
                {person.name}
              </h2>
              
              <div className="text-sm font-semibold text-blue-600 mb-3">
                {person.title}
              </div>

              {/* Work and Expertise */}
              <div className="space-y-2 mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-2.5 border border-blue-100">
                  <div className="text-xs font-semibold text-blue-700 mb-1">Role</div>
                  <div className="text-sm text-gray-700 font-medium">{person.Role}</div>
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
                {person?.socials?.map((social, socialIndex) => {
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

          {/* Elegant glow effect - same as regular cards */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
          }} />
        </div>
      </div>
    );
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
          className={`relative overflow-hidden rounded-2xl p-6 w-72 h-[450px] transition-all duration-500 transform
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
                  <div className="text-xs font-semibold text-blue-700 mb-1">Role</div>
                  <div className="text-sm text-gray-700 font-medium">{person.Role}</div>
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
                {person?.socials?.map((social, socialIndex) => {
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
         
          <div className="relative flex">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the talented individuals who bring innovation and excellence to every project
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
          </div>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-gray-600 max-w-lg mx-auto">
              Visionary leaders who built this company from the ground up
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 gap-y-12">
            {founders.map((founder, index) => (
              <FounderCard key={index} person={founder} index={index} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <p className="text-gray-600 max-w-lg mx-auto">
              Talented professionals driving innovation and excellence
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 gap-y-12">
            {people.map((person, index) => (
              <PersonCard key={index} person={person} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TeamCards;