
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ConfettiEffect from '../ui/ConfettiEffect';

const ConfirmationSection = () => {
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-azhizen-lavender/30 to-white py-20">
      <ConfettiEffect />
      
      <div className="azhizen-container">
        <div ref={addToRefs} className="max-w-2xl mx-auto text-center reveal-on-scroll">
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 rounded-full bg-azhizen-lavender flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-azhizen-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="heading-lg mb-6">
            Thank You for Applying!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your application for the Azhizen Summer Internship Program 2025 has been successfully submitted.
            We'll be in touch with you shortly via email with further instructions.
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-azhizen-lavender">
            <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
            <ol className="text-left space-y-4 list-decimal ml-5">
              <li className="text-gray-700">
                Our team will review your application within 2-3 business days.
              </li>
              <li className="text-gray-700">
                You'll receive a confirmation email with your application status.
              </li>
              <li className="text-gray-700">
                If selected, you'll get an invitation for an online orientation session.
              </li>
              <li className="text-gray-700">
                Prepare to start your internship on your indicated start date.
              </li>
            </ol>
          </div>
          
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationSection;
