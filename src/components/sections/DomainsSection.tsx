import { useEffect, useRef } from 'react';
import DomainCard from '../ui/DomainCard';

const domains = [
  {
    title: "Frontend Development",
    description: "Learn to create responsive and interactive user interfaces using modern frameworks and libraries.",
    iconClass: "fa-solid fa-code"
  },
  {
    title: "Web Development",
    description: "Build and maintain websites and web applications using modern technologies and best practices.",
    iconClass: "fa-solid fa-globe"
  },
  {
    title: "Full Stack Development",
    description: "Master both client and server-side development to build complete, end-to-end applications.",
    iconClass: "fa-solid fa-layer-group"
  },
  {
    title: "AI Powered Web Dev",
    description: "Build intelligent web applications using artificial intelligence and machine learning technologies.",
    iconClass: "fa-solid fa-brain"
  },
  {
    title: "Robotics and Automation",
    description: "Design, build, and program robots and automated systems for various applications.",
    iconClass: "fa-solid fa-robot"
  },
  {
    title: "Embedded Systems & IoT",
    description: "Connect devices to the internet and develop smart solutions for the connected world.",
    iconClass: "fa-solid fa-microchip"
  },
  {
    title: "PCB Design and Hardware Prototyping",
    description: "Design printed circuit boards and create hardware prototypes for electronic systems.",
    iconClass: "fa-solid fa-microchip" // Changed from 'fas fa-microchip'
  },
  {
    title: "AI Hardware",
    description: "Design specialized hardware for artificial intelligence and machine learning applications.",
    iconClass: "fa-solid fa-microchip" // Changed from 'fa-cpu' (not in free set)
  },
  {
    title: "Power Electronics and Energy Systems",
    description: "Design and develop efficient power systems and energy management solutions.",
    iconClass: "fa-solid fa-bolt-lightning" // Changed from 'fa-bolt' for clarity
  },
  {
    title: "Digital Marketing",
    description: "Learn strategies to promote brands and products in the digital landscape to reach target audiences.",
    iconClass: "fa-solid fa-bullhorn"
  },
  {
    title: "Research and Development",
    description: "Engage in cutting-edge research and develop innovative solutions to complex problems.",
    iconClass: "fa-solid fa-flask"
  }
];

const DomainsSection = () => {
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = elementsRef.current;
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section id="domains" className="py-20 bg-azhizen-softGray">
      <div className="azhizen-container">
        <div ref={addToRefs} className="text-center mb-12 reveal-on-scroll">
          <span className="inline-block px-4 py-2 rounded-full bg-white text-azhizen-darkPurple font-medium text-sm mb-4 shadow-sm border border-gray-200">
            Opportunities
          </span>
          <h2 className="heading-lg mb-4">Internship Domains Offered</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse range of domains and kickstart your professional journey with hands-on experience in your field of interest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <div 
              key={domain.title} 
              ref={addToRefs}
              className="h-full reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <DomainCard
                title={domain.title}
                description={domain.description}
                fee={0}
                iconClass={domain.iconClass}
              />
            </div>
          ))}
        </div>

        <div ref={addToRefs} className="mt-12 p-6 bg-white rounded-lg border border-gray-200 shadow-modern reveal-on-scroll">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">All internships are paid and offered in Hybrid Mode</h3>
              <p className="text-gray-600">Choose between In-Office, Online, or Hybrid mode based on your convenience</p>
            </div>
            <a href="#apply" className="btn-primary whitespace-nowrap">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
