
import { ArrowRight, User, CheckCircle } from 'lucide-react';
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
<section id='home' className="pt-24 pb-16 bg-gradient-to-br from-azhizen-purple/40 via-azhizen-lavender/20 to-white">
  <div className="azhizen-container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div ref={addToRefs} className="reveal-on-scroll">
        {/* Badge for extra professionalism */}
        <span className="inline-block px-4 py-1.5 mb-6 mt-6 text-[10px] font-semibold tracking-wide text-azhizen-darkPurple uppercase bg-azhizen-purple/10 rounded-full border border-azhizen-purple/20">
          • Paid Internship Program
        </span>

        <h1 className="heading-xl mb-6">
          <span className="text-gray-900 text-[42px] ">Build your Career with</span><br />
          <span className="bg-gradient-to-r from-azhizen-purple to-azhizen-darkPurple bg-clip-text text-transparent">
             Internships.
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Bridge the gap between academic theory and industry practice. Our 2026 paid internship 
          is designed to transform ambitious learners into industry-ready engineers through 
          hands-on mentorship.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#apply" className="btn-primary flex items-center gap-2">
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#domains" className="btn-secondary">
            View Domains
          </a>
        </div>
        
        <div className="flex items-center mt-12">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-10 h-10 rounded-full bg-white border-2 border-azhizen-purple/20 flex items-center justify-center shadow-sm overflow-hidden">
                <User className="w-6 h-6 text-azhizen-purple/60" />
              </div>
            ))}
          </div>
          <p className="ml-6 text-gray-600 text-sm">
            Join <span className="text-azhizen-darkPurple font-bold">150+</span> alumni who have successfully 
            transitioned into top tech roles.
          </p>
        </div>
      </div>
      
      <div ref={addToRefs} className="reveal-on-scroll delay-300">
        <div className="relative p-2">
          {/* Visual representation of growth/connection */}
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-azhizen-lavender/40 rounded-full blur-3xl"></div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white p-1">
            <img 
              src="/lovable-uploads/8619c915-b159-4cb9-a22a-35ff8e3706d2.png" 
              alt="Mentorship and code collaboration" 
              className="w-full h-auto rounded-xl"
            />
          </div>
          
          {/* Floating stat card for a 'professional' look */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden sm:block animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Placement Rate</p>
                <p className="text-lg font-bold text-gray-900">Industry Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default HeroSection;
