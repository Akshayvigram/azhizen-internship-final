
interface FormStepsProps {
  currentStep: number;
  totalSteps: number;
}

const FormSteps = ({ currentStep, totalSteps }: FormStepsProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`relative flex flex-col items-center ${
              step < totalSteps ? "w-full" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors z-10 ${
                step <= currentStep
                  ? "bg-azhizen-purple text-white"
                  : "bg-azhizen-softGray text-gray-500"
              }`}
            >
              {step < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            
            {step < totalSteps && (
              <div
                className={`absolute top-5 w-full h-0.5 transition-colors ${
                  step < currentStep ? "bg-azhizen-purple" : "bg-azhizen-softGray"
                }`}
              />
            )}
            
            <span
              className={`mt-2 text-xs font-medium ${
                step <= currentStep
                  ? "text-azhizen-darkPurple"
                  : "text-gray-500"
              }`}
            >
              Step {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSteps;
