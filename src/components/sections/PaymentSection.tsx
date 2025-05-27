
import { useRef, useEffect } from 'react';

const PaymentSection = () => {
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
    <section id="pricing" className="py-20 bg-azhizen-softGray">
      <div className="azhizen-container">
        <div ref={addToRefs} className="text-center mb-12 reveal-on-scroll">
          <span className="inline-block px-4 py-2 rounded-full bg-white text-azhizen-purple font-medium text-sm mb-4">
            Pricing Details
          </span>
          <h2 className="heading-lg mb-4">Payment Instructions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple and transparent pricing for our internship programs. Complete your application and payment to secure your spot.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div ref={addToRefs} className="reveal-on-scroll">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-azhizen-lavender">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-azhizen-lavender/50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-azhizen-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">How to Make Payment</h3>
                <p className="text-gray-600 mb-8">
                  Follow these simple steps to complete your payment and secure your internship spot.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-azhizen-lavender/30 rounded-xl p-6 border border-azhizen-lavender">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-azhizen-purple text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                    Choose Your Program Duration
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">7 Days</div>
                      <div className="text-azhizen-purple font-bold">₹999</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">15 Days</div>
                      <div className="text-azhizen-purple font-bold">₹1,999</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">1 Month</div>
                      <div className="text-azhizen-purple font-bold">₹3,499</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">2 Months</div>
                      <div className="text-azhizen-purple font-bold">₹6,999</div>
                    </div>
                  </div>
                </div>

                <div className="bg-azhizen-lavender/30 rounded-xl p-6 border border-azhizen-lavender">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-azhizen-purple text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                    Fill the Application Form
                  </h4>
                  <p className="text-gray-700">
                    Complete all sections of the application form with accurate information. Payment details will be provided in Step 3 of the form.
                  </p>
                </div>

                <div className="bg-azhizen-lavender/30 rounded-xl p-6 border border-azhizen-lavender">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-azhizen-purple text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                    Make Payment & Upload Proof
                  </h4>
                  <p className="text-gray-700">
                    Use the QR code or UPI ID provided in the application form to make your payment. Upload the payment screenshot and reference ID to complete your application.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">✅ All programs include:</p>
                  <ul className="text-green-700 text-sm mt-2 space-y-1">
                    <li>• Hands-on project experience</li>
                    <li>• Industry mentor guidance</li>
                    <li>• Certificate of completion</li>
                    <li>• Flexible working modes (Online/In-Office/Hybrid)</li>
                  </ul>
                </div>
                
                <a href="#apply" className="btn-primary">
                  Start Application
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
