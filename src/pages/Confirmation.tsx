
import ConfirmationSection from "@/components/sections/ConfirmationSection";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center justify-center">
      <div className="absolute top-4 left-6">
        <Link to="/" className="font-poppins font-bold text-2xl text-azhizen-darkPurple">
          Azhizen<span className="text-azhizen-purple">.</span>
        </Link>
      </div>
      <ConfirmationSection />
    </main>
  );
};

export default Confirmation;
