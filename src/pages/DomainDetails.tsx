
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";

// Domain data - updated with all new domains
const domains = [
  {
    title: "Frontend Development",
    description: "Learn to create responsive and interactive user interfaces using modern frameworks and libraries.",
    iconClass: "fa-solid fa-code",
    longDescription: "Dive deep into the world of frontend development and learn to build beautiful, responsive user interfaces. Master HTML5, CSS3, JavaScript, and popular frameworks like React, becoming proficient in creating dynamic and interactive web experiences that users love.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "UI/UX Principles"]
  },
  {
    title: "Web Development",
    description: "Build and maintain websites and web applications using modern technologies and best practices.",
    iconClass: "fa-solid fa-globe",
    longDescription: "From static websites to dynamic web applications, learn comprehensive web development skills. Cover frontend styling, server-side processing, database integration, and deployment strategies to create robust web solutions.",
    skills: ["HTML/CSS", "JavaScript", "Backend Technologies", "CMS Systems", "Performance Optimization", "Web Security"]
  },
  {
    title: "Full Stack Development",
    description: "Master both client and server-side development to build complete, end-to-end applications.",
    iconClass: "fa-solid fa-layer-group",
    longDescription: "Become a versatile developer capable of handling both frontend and backend aspects of web applications. Learn to integrate databases, implement authentication, deploy applications, and create seamless user experiences from start to finish.",
    skills: ["Frontend Technologies", "Backend Development", "Database Design", "API Integration", "Deployment", "Authentication"]
  },
  {
    title: "AI Powered Web Dev",
    description: "Build intelligent web applications using artificial intelligence and machine learning technologies.",
    iconClass: "fa-solid fa-brain",
    longDescription: "Combine the power of artificial intelligence with modern web development to create intelligent applications. Learn to integrate AI models, implement machine learning features, and build smart web solutions that can learn and adapt.",
    skills: ["Machine Learning", "AI Integration", "Python/JavaScript", "Neural Networks", "Data Processing", "API Development"]
  },
  {
    title: "Robotics and Automation",
    description: "Design, build, and program robots and automated systems for various applications.",
    iconClass: "fa-solid fa-robot",
    longDescription: "Explore the exciting field of robotics and automation. Learn about mechanical design, electronic circuits, programming microcontrollers, and implementing AI algorithms to create intelligent robotic systems and automation solutions.",
    skills: ["Mechanical Design", "Electronics", "Programming", "Sensor Integration", "Control Systems", "Machine Learning"]
  },
  {
    title: "Embedded Systems & IoT",
    description: "Connect devices to the internet and develop smart solutions for the connected world.",
    iconClass: "fa-solid fa-microchip",
    longDescription: "Discover how to connect the physical world to the internet. Design and build connected devices, implement data collection and analysis, and create systems that make our lives smarter, safer, and more efficient.",
    skills: ["Embedded Systems", "Networking", "Cloud Integration", "Sensor Technology", "Data Analysis", "Security Principles"]
  },
  {
    title: "PCB Design and Hardware Prototyping",
    description: "Learn to design printed circuit boards and create hardware prototypes for electronic projects.",
    iconClass: "fa-solid fa-microchip",
    longDescription: "Master the art of PCB design and hardware prototyping. Learn to create professional circuit boards, understand component selection, and develop skills in bringing electronic ideas from concept to reality through hands-on prototyping.",
    skills: ["PCB Design", "Circuit Analysis", "Component Selection", "Prototyping", "Testing & Debugging", "Manufacturing Processes"]
  },
  {
    title: "AI Hardware",
    description: "Develop specialized hardware solutions optimized for artificial intelligence and machine learning applications.",
    iconClass: "fa-solid fa-microchip",
    longDescription: "Explore the intersection of AI and hardware engineering. Learn to design and optimize hardware solutions for machine learning workloads, understand AI accelerators, and develop efficient computing systems for AI applications.",
    skills: ["AI Accelerators", "Neural Processing Units", "Hardware Optimization", "FPGA Programming", "System Architecture", "Performance Analysis"]
  },
  {
    title: "Power Electronics and Energy Systems",
    description: "Design and develop power electronic systems for energy conversion and management applications.",
    iconClass: "fa-solid fa-bolt",
    longDescription: "Dive into the world of power electronics and energy systems. Learn to design efficient power converters, understand renewable energy systems, and develop solutions for modern energy challenges including smart grids and electric vehicles.",
    skills: ["Power Converters", "Energy Storage", "Renewable Energy", "Smart Grids", "Motor Drives", "Power Management"]
  },
  {
    title: "Digital Marketing",
    description: "Learn strategies to promote brands and products in the digital landscape to reach target audiences.",
    iconClass: "fa-solid fa-bullhorn",
    longDescription: "Master the art and science of promoting businesses online. Learn SEO, social media marketing, content creation, email marketing, and analytics to help brands connect with their target audience effectively.",
    skills: ["SEO", "Social Media Marketing", "Content Strategy", "Email Campaigns", "Analytics", "Conversion Optimization"]
  },
  {
    title: "Research and Development",
    description: "Engage in cutting-edge research and develop innovative solutions to complex problems.",
    iconClass: "fa-solid fa-flask",
    longDescription: "Join our research teams working on the latest technological innovations. Analyze complex problems, research potential solutions, and develop prototypes that push the boundaries of what's possible in technology today.",
    skills: ["Problem Analysis", "Research Methodologies", "Prototype Development", "Documentation", "Data Analysis", "Technical Writing"]
  }
];

// Updated pricing data - removing 3 months option
const pricingOptions = [
  { duration: "7 days", price: 999.00 },
  { duration: "15 days", price: 1999.00 },
  { duration: "1 month", price: 3499.00 },
  { duration: "2 months", price: 6999.00 },
];

const DomainDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState<any>(null);

  useEffect(() => {
    const currentDomain = domains.find(d => d.title.toLowerCase().replace(/\s+/g, '-') === slug);
    if (currentDomain) {
      setDomain(currentDomain);
      document.title = `${currentDomain.title} - Azhizen Summer Internship`;
    } else {
      navigate('/'); // Redirect to home if domain not found
    }
  }, [slug, navigate]);

const handleApplyWithDuration = (duration) => {
  navigate(`/?domain=${encodeURIComponent(domain.title)}&duration=${encodeURIComponent(duration)}#apply`);
  setTimeout(() => {
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 500);
};
  
  
  
  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  if (!domain) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="azhizen-container">
          {/* Main content */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-azhizen-lavender/30 w-12 h-12 flex items-center justify-center">
                  <i className={`${domain.iconClass} text-azhizen-darkPurple text-xl`}></i>
                </div>
                <h1 className="heading-lg">{domain.title}</h1>
              </div>
              <p className="text-gray-700">{domain.description}</p>
            </div>
            
            {/* What You'll Learn section - moved above pricing */}
            <section className="mb-8">
              <h2 className="heading-md mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Hands-on experience working on real-world projects</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Industry-standard tools and technologies used by professionals</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Problem-solving techniques and best practices in the field</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Collaboration skills through team projects and mentorship</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Portfolio-worthy projects to showcase your abilities</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-azhizen-lavender/30 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-azhizen-darkPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Career guidance and mentorship from industry professionals</p>
                  </div>
                </div>
              </div>
            </section>
            
            <h2 className="text-2xl font-semibold mb-6">Program Duration & Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              {pricingOptions.slice(0, 2).map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">{option.duration}</h3>
                  <p className="text-2xl font-bold text-azhizen-darkPurple mb-2">₹{option.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Full {domain.title} internship program for {option.duration}
                  </p>
                  <button
                    onClick={() => handleApplyWithDuration(option.duration)}
                    className="bg-azhizen-darkPurple text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors w-full"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingOptions.slice(2).map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">{option.duration}</h3>
                  <p className="text-2xl font-bold text-azhizen-darkPurple mb-2">₹{option.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Full {domain.title} internship program for {option.duration}
                  </p>
                  <button
                    onClick={() => handleApplyWithDuration(option.duration)}
                    className="bg-azhizen-darkPurple text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors w-full"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => handleScrollToSection('domains')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Back to All Domains
              </button>
              
              <button
                onClick={() => handleApplyWithDuration('apply')}
                className="bg-azhizen-darkPurple text-white px-6 py-2 rounded hover:bg-purple-800 transition-colors"
              >
                Apply for {domain.title}
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 bg-azhizen-darkPurple text-white">
        <div className="azhizen-container text-center">
          <p>© {new Date().getFullYear()} Azhizen. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Summer Internship Program</p>
        </div>
      </footer>
    </>
  );
};

export default DomainDetails;
