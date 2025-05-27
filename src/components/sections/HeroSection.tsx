
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
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
    <section className="pt-24 pb-16 bg-gradient-to-br from-azhizen-purple/40 via-azhizen-lavender/20 to-white">
      <div className="azhizen-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={addToRefs} className="reveal-on-scroll">
            <h1 className="heading-xl mb-6">
              Summer Internship 2025
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Kickstart your tech career with real-world experience. Join 
              our paid internship program and work on cutting-edge 
              projects in a supportive learning environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#apply" className="btn-primary">
                Apply Now
              </a>
              <a href="#domains" className="btn-secondary">
              Explore Domains
              </a>
            </div>
            
            <div className="flex items-center mt-12">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full bg-white text-azhizen-darkPurple flex items-center justify-center border border-gray-200 font-medium">
                    {num}
                  </div>
                ))}
              </div>
              <span className="ml-4 text-gray-600">
                Join <span className="font-bold">100+</span> students who launched their careers with Azhizen
              </span>
            </div>
          </div>
          
          <div ref={addToRefs} className="reveal-on-scroll delay-300">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-azhizen-purple/30">
              <img 
                src="/lovable-uploads/8619c915-b159-4cb9-a22a-35ff8e3706d2.png" 
                alt="Code editor showing programming functions" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
