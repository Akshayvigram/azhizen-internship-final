
import { Link } from 'react-router-dom';

interface DomainCardProps {
  title: string;
  description: string;
  fee: number;
  iconClass: string;
}

const DomainCard = ({ title, description, iconClass }: DomainCardProps) => {
  // Remove fee from props usage since we're not displaying it anymore
  const slug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/domain/${slug}`} className="block h-full">
      <div className="domain-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
        <div className="rounded-full bg-azhizen-lavender w-12 h-12 flex items-center justify-center mb-4 shadow-md">
          <i className={`${iconClass} text-azhizen-darkPurple text-xl`}></i>
        </div>
        <h3 className="text-xl font-semibold font-poppins mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <div className="flex justify-end">
            <div className="bg-azhizen-softGray px-3 py-1 rounded-full text-xs font-medium text-azhizen-darkPurple border border-gray-200">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DomainCard;
