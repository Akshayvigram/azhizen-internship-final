import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormSteps from '../ui/FormSteps';
import { useToast } from '@/hooks/use-toast'; 
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { time } from 'console';

// Domain options from our data - updated to match new domains
const domainOptions = [
  "Frontend Development",
  "Web Development", 
  "Full Stack Development",
  "AI Powered Web Dev",
  "Robotics and Automation",
  "Embedded Systems & IoT",
  "PCB Design and Hardware Prototyping", 
  "AI Hardware",
  "Power Electronics and Energy Systems",
  "Digital Marketing",
  "Research and Development"
];

// Duration options
const durationOptions = [
  "7 days",
  "15 days",
  "1 month",
  "2 months"
];

// Study year options - updated as requested
const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "Final Year",
  "Graduated"
];

const ApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const formRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const preselectedDomain = searchParams.get("domain") || "";
  const preselectedDuration = searchParams.get("duration") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeName: "",
    degree: "",
    yearOfStudy: "",
    location: "",
    domain: preselectedDomain,
    duration: preselectedDuration,
    preferredMode: "",
    startDate: "",
    hasExperience: "",
    experienceDetails: "",
    applyingReason: "",
    resume: null as File | null,
    paymentReferenceId: "",
    paymentScreenshot: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = elementsRef.current;
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target.files[0] });
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!formData.collegeName.trim())
        newErrors.collegeName = "College name is required";
    } else if (step === 2) {
      if (!formData.degree.trim()) newErrors.degree = "Degree is required";
      if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.domain) newErrors.domain = "Please select a domain";
      if (!formData.duration) newErrors.duration = "Please select a program duration";
      if (!formData.preferredMode) newErrors.preferredMode = "Please select mode";
      if (!formData.startDate.trim()) newErrors.startDate = "Start date is required";
    } else if (step === 3) {
      if (!formData.hasExperience) newErrors.hasExperience = "Specify experience";
      if (
        formData.hasExperience === "Yes" &&
        !formData.experienceDetails.trim()
      ) {
        newErrors.experienceDetails = "Provide experience details";
      }
      if (!formData.applyingReason.trim())
        newErrors.applyingReason = "Reason is required";
      if (!formData.paymentReferenceId.trim())
        newErrors.paymentReferenceId = "Reference ID required";
      if (!formData.paymentScreenshot)
        newErrors.paymentScreenshot = "Screenshot required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setErrors({});
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    try {
      let resumeBase64 = "";
      let paymentScreenshotBase64 = "";

      if (formData.resume) {
        resumeBase64 = await fileToBase64(formData.resume);
      }

      if (formData.paymentScreenshot) {
        paymentScreenshotBase64 = await fileToBase64(formData.paymentScreenshot);
      }

      const submissionData = {
        ...formData,
        resume: resumeBase64,
        paymentScreenshot: paymentScreenshotBase64,
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, "internship-form"), submissionData);

      await fetch("https://azhizen-internship-final.onrender.com/slack-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          domain: formData.domain,
          duration: formData.duration,
          timestamp: submissionData.timestamp.toDate().toISOString(),
          college: formData.collegeName,
          department: formData.degree,
          reason: formData.applyingReason,
        }),
      });

      toast({
        title: "Application Submitted!",
        description: "Your application has been received successfully.",
      });

      navigate("/confirmation");
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="apply" className="py-20">
      <div className="azhizen-container">
        <div ref={addToRefs} className="text-center mb-12 reveal-on-scroll">
          <span className="inline-block px-4 py-2 rounded-full bg-azhizen-lavender text-azhizen-darkPurple font-medium text-sm mb-4 shadow-sm border border-gray-200">
            Join Us
          </span>
          <h2 className="heading-lg mb-4">Apply for Azhizen Summer Internship</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the application form below to start your journey with us. Make sure to provide accurate information.
          </p>
        </div>

        <div ref={addToRefs} className="max-w-3xl mx-auto reveal-on-scroll">
          <div className="bg-white rounded-lg shadow-modern border border-gray-200 p-6 md:p-8" ref={formRef}>
            <FormSteps currentStep={currentStep} totalSteps={totalSteps} />
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your 10-digit phone number"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
                        College Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="collegeName"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.collegeName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your college name"
                      />
                      {errors.collegeName && <p className="mt-1 text-sm text-red-500">{errors.collegeName}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Academic & Internship Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Academic & Internship Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                        Degree <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.degree ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., B.Tech, BCA, MCA"
                      />
                      {errors.degree && <p className="mt-1 text-sm text-red-500">{errors.degree}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Study <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="yearOfStudy"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select year of study</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.yearOfStudy && <p className="mt-1 text-sm text-red-500">{errors.yearOfStudy}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your city and state"
                      />
                      {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                        Selected Internship Domain <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="domain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.domain ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select domain</option>
                        {domainOptions.map(domain => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                      {errors.domain && <p className="mt-1 text-sm text-red-500">{errors.domain}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Program Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.duration ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select duration</option>
                        {durationOptions.map(duration => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                      {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="preferredMode" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Mode <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferredMode"
                        name="preferredMode"
                        value={formData.preferredMode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.preferredMode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select mode</option>
                        <option value="Online">Online</option>
                        <option value="In-Office">In-Office</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      {errors.preferredMode && <p className="mt-1 text-sm text-red-500">{errors.preferredMode}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Availability Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Resume (Optional)
                      </label>
                      <div className={`border-2 border-dashed rounded-md p-6 text-center ${
                        errors.resume ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        <label htmlFor="resume" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {formData.resume ? (
                              <span className="text-azhizen-darkPurple font-medium">{formData.resume.name}</span>
                            ) : (
                              <>
                                <p className="font-medium">Click to upload resume (optional)</p>
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                      {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Experience & Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Experience & Payment</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience in Selected Domain <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="experienceYes"
                            name="hasExperience"
                            value="Yes"
                            checked={formData.hasExperience === 'Yes'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label htmlFor="experienceYes">Yes</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="experienceNo"
                            name="hasExperience"
                            value="No"
                            checked={formData.hasExperience === 'No'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label htmlFor="experienceNo">No</label>
                        </div>
                      </div>
                      {errors.hasExperience && <p className="mt-1 text-sm text-red-500">{errors.hasExperience}</p>}
                    </div>
                    
                    {formData.hasExperience === 'Yes' && (
                      <div>
                        <label htmlFor="experienceDetails" className="block text-sm font-medium text-gray-700 mb-1">
                          Please explain your experience <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="experienceDetails"
                          name="experienceDetails"
                          value={formData.experienceDetails}
                          onChange={handleChange}
                          rows={3}
                          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                            errors.experienceDetails ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Briefly describe your experience in this domain"
                        />
                        {errors.experienceDetails && <p className="mt-1 text-sm text-red-500">{errors.experienceDetails}</p>}
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="applyingReason" className="block text-sm font-medium text-gray-700 mb-1">
                        Why are you applying? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="applyingReason"
                        name="applyingReason"
                        value={formData.applyingReason}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.applyingReason ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Share your motivation for applying to this internship"
                      />
                      {errors.applyingReason && <p className="mt-1 text-sm text-red-500">{errors.applyingReason}</p>}
                    </div>
                    
                    {/* Payment QR Code and UPI ID Section */}
                    <div className="bg-azhizen-lavender/30 rounded-xl p-6 border border-azhizen-lavender">
                      <h4 className="text-lg font-semibold mb-4 text-center">Payment Information</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="text-center">
                          <h5 className="font-medium mb-3">Scan QR Code to Pay</h5>
                          <img 
                            src="/lovable-uploads/77ee2501-3744-4418-b298-572b6809c0bf.png" 
                            alt="UPI QR Code for Payment" 
                            className="w-40 h-auto mx-auto"
                          />
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3">Payment Details</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">UPI ID:</span>
                              <span className="font-medium">idofbharath-2@okaxis</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Accepted Apps:</span>
                              <span className="font-medium">GPay, PhonePe, Paytm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">As per selected duration</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-xs">
                              💡 After making payment, enter the reference ID and upload screenshot below
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="paymentReferenceId" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Reference ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="paymentReferenceId"
                        name="paymentReferenceId"
                        value={formData.paymentReferenceId}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400 outline-none transition ${
                          errors.paymentReferenceId ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your payment reference ID"
                      />
                      {errors.paymentReferenceId && <p className="mt-1 text-sm text-red-500">{errors.paymentReferenceId}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="paymentScreenshot" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Payment Screenshot <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-md p-6 text-center ${
                        errors.paymentScreenshot ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        <input
                          type="file"
                          id="paymentScreenshot"
                          name="paymentScreenshot"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <label htmlFor="paymentScreenshot" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formData.paymentScreenshot ? (
                              <span className="text-azhizen-darkPurple font-medium">{formData.paymentScreenshot.name}</span>
                            ) : (
                              <>
                                <p className="font-medium">Click to upload</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, or JPEG (max 10MB)</p>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                      {errors.paymentScreenshot && <p className="mt-1 text-sm text-red-500">{errors.paymentScreenshot}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-10">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn-secondary"
                  >
                    Previous
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`btn-primary ${currentStep === 1 ? 'ml-auto' : ''}`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
