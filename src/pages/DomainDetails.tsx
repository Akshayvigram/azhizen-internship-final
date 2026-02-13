import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

/* =========================
   DOMAINS DATA
========================= */
const domains = [
  {
    title: "Frontend Development",
    description:
      "Learn to create responsive and interactive user interfaces using modern frameworks and libraries.",
    iconClass: "fa-solid fa-code",
    longDescription:
      "Dive deep into the world of frontend development and learn to build beautiful, responsive user interfaces. Master HTML5, CSS3, JavaScript, and popular frameworks like React.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Responsive Design",
      "UI UX Principles",
    ],
  },
  {
    title: "Web Development",
    description:
      "Build and maintain websites and web applications using modern technologies and best practices.",
    iconClass: "fa-solid fa-globe",
    longDescription:
      "From static websites to dynamic web applications, learn comprehensive web development skills including backend integration and deployment.",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "Backend Technologies",
      "CMS Systems",
      "Web Security",
    ],
  },
  {
    title: "Full Stack Development",
    description:
      "Master both client and server-side development to build complete, end-to-end applications.",
    iconClass: "fa-solid fa-layer-group",
    longDescription:
      "Become a versatile developer capable of handling frontend, backend, databases, APIs, and deployments.",
    skills: [
      "Frontend",
      "Backend",
      "Database Design",
      "API Integration",
      "Authentication",
    ],
  },

  /* ✅ NEW UI/UX DESIGN DOMAIN */
  {
    title: "UI UX Design",
    description:
      "Design intuitive, user-friendly digital experiences using modern UI/UX principles and tools.",
    iconClass: "fa-solid fa-pen-nib",
    longDescription:
      "Learn the complete UI/UX design process including user research, wireframing, prototyping, usability testing, and visual design. Build portfolio-ready case studies using real-world problems.",
    skills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Figma",
      "Usability Testing",
      "Design Systems",
      "UX Case Studies",
      "Interaction Design",
    ],
  },

  {
    title: "Gen AI",
    description:
      "Build intelligent applications using artificial intelligence and machine learning technologies.",
    iconClass: "fa-solid fa-brain",
    longDescription:
      "Learn how to integrate AI models into modern web applications and build intelligent systems.",
    skills: [
      "Machine Learning",
      "AI Integration",
      "Neural Networks",
      "Data Processing",
    ],
  },
  {
    title: "Robotics and Automation",
    description:
      "Design, build, and program robots and automated systems for various applications.",
    iconClass: "fa-solid fa-robot",
    longDescription:
      "Learn to develop robotic systems, automation solutions, and intelligent control mechanisms used in industries such as manufacturing, healthcare, and space exploration.",
    skills: [
      "Robot Programming",
      "Automation Systems",
      "Control Systems",
      "Industrial Robotics",
    ],
  },
  {
    title: "Embedded Systems & IoT",
    description:
      "Connect devices to the internet and develop smart solutions for the connected world.",
    iconClass: "fa-solid fa-microchip",
    longDescription:
      "Build embedded hardware and IoT-enabled systems that communicate over networks, enabling smart homes, smart cities, and intelligent industrial applications.",
    skills: [
      "Microcontrollers",
      "IoT Development",
      "Sensor Integration",
      "Firmware Programming",
    ],
  },
  {
    title: "PCB Design and Hardware Prototyping",
    description:
      "Design printed circuit boards and create hardware prototypes for electronic systems.",
    iconClass: "fa-solid fa-circuit-board",
    longDescription:
      "Master PCB layout design, schematic creation, and hardware prototyping to develop reliable and efficient electronic systems for real-world applications.",
    skills: [
      "PCB Layout Design",
      "Circuit Design",
      "Hardware Testing",
      "Electronic Prototyping",
    ],
  },
  {
    title: "AI Hardware",
    description:
      "Design specialized hardware for artificial intelligence and machine learning applications.",
    iconClass: "fa-solid fa-memory",
    longDescription:
      "Explore the development of AI accelerators, edge AI devices, and optimized hardware architectures for high-performance machine learning workloads.",
    skills: [
      "AI Accelerators",
      "Edge Computing",
      "Hardware Optimization",
      "FPGA Development",
    ],
  },
  {
    title: "Power Electronics and Energy Systems",
    description:
      "Design and develop efficient power systems and energy management solutions.",
    iconClass: "fa-solid fa-bolt",
    longDescription:
      "Learn to design inverters, converters, renewable energy systems, and smart energy management solutions for sustainable power applications.",
    skills: [
      "Power Converters",
      "Renewable Energy Systems",
      "Energy Management",
      "Electrical System Design",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Learn strategies to promote brands and products in the digital landscape to reach target audiences.",
    iconClass: "fa-solid fa-chart-line",
    longDescription:
      "Develop expertise in online marketing strategies including SEO, social media marketing, paid advertising, and analytics to grow businesses digitally.",
    skills: [
      "SEO",
      "Social Media Marketing",
      "Content Strategy",
      "Digital Analytics",
    ],
  },
  {
    title: "Research and Development",
    description:
      "Engage in cutting-edge research and develop innovative solutions to complex problems.",
    iconClass: "fa-solid fa-flask",
    longDescription:
      "Participate in advanced research initiatives, innovation projects, and technology development to solve real-world engineering and scientific challenges.",
    skills: [
      "Problem Solving",
      "Innovation Strategy",
      "Technical Research",
      "Prototype Development",
    ],
  },

];

/* =========================
   PRICING
========================= */
const pricingOptions = [
  { duration: "7 days", price: "999" },
  { duration: "15 days", price: "1,999" },
  { duration: "1 month", price: "2,499" },
  { duration: "2 months", price: "3,999" },
];

const DomainDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState<any>(null);

  useEffect(() => {
    const currentDomain = domains.find(
      (d) => d.title.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (currentDomain) {
      setDomain(currentDomain);
      document.title = `${currentDomain.title} - Azhizen Internship`;
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const handleApplyWithDuration = (duration: string) => {
    navigate(
      `/?domain=${encodeURIComponent(
        domain.title
      )}&duration=${encodeURIComponent(duration)}#apply`
    );
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  if (!domain) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16 bg-gray-50">
        <div className="azhizen-container">
          <div className="bg-white rounded-xl shadow-sm p-8">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-azhizen-lavender/30">
                <i
                  className={`${domain.iconClass} text-xl text-azhizen-darkPurple`}
                ></i>
              </div>
              <h1 className="heading-lg">{domain.title}</h1>
            </div>

            <p className="text-gray-700 mb-8">{domain.description}</p>

            {/* WHAT YOU'LL LEARN */}
            <h2 className="heading-md mb-4">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {domain.skills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <i className="fa-solid fa-check text-azhizen-darkPurple"></i>
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {/* PRICING */}
            <h2 className="heading-md mb-6">Program Duration & Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pricingOptions.map((option, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {option.duration}
                  </h3>
                  <p className="text-2xl font-bold text-azhizen-darkPurple mb-3">
                    ₹{option.price}
                  </p>
                  <button
                    onClick={() => handleApplyWithDuration(option.duration)}
                    className="w-full bg-azhizen-darkPurple text-white py-2 rounded hover:bg-purple-800"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex justify-between mt-10">
              <button
                onClick={() => navigate("/#domains")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Back to Domains
              </button>

              <button
                onClick={() => handleApplyWithDuration("apply")}
                className="px-6 py-2 bg-azhizen-darkPurple text-white rounded"
              >
                Apply for {domain.title}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-azhizen-darkPurple text-white py-6 text-center">
        © {new Date().getFullYear()} Azhizen. All rights reserved.
      </footer>
    </>
  );
};

export default DomainDetails;
