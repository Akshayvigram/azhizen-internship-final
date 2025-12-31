import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import DomainsSection from "@/components/sections/DomainsSection";
import ApplicationForm from "@/components/sections/ApplicationForm";
import PaymentSection from "@/components/sections/PaymentSection";
import { useEffect } from "react";

const Index = () => {
  // Initialize intersection observer for scroll animations
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

    // Observe all elements with reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DomainsSection />
        <PaymentSection />
        <ApplicationForm />
      </main>
      <footer className="py-8 bg-azhizen-darkPurple text-white">
        <div className="azhizen-container text-center">
          <p>© {new Date().getFullYear()} Azhizen. All rights reserved.</p>
           <div className="mt-3 space-x-4">
      <a
        href="https://academy.azhizen.com"
        className="text-azhizen-lightPurple hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Azhizen Academy
      </a>
      <span className="text-azhizen-neutralGray">|</span>
      <a
        href="https://media.azhizen.com"
        className="text-azhizen-lightPurple hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
       Azhizen Media
      </a>
    </div>
    <p className="text-sm text-azhizen-neutralGray mt-3">
      Internship Program 2026
    </p>
  </div>
      </footer>
    </>
  );
};

export default Index;