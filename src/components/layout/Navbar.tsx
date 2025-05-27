
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (section: string) => {
    if (isHomePage) {
      // If on home page, use smooth scroll
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on another page, navigate to home with hash
      navigate(`/#${section}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="azhizen-container flex justify-between items-center">
        <RouterLink to="/" className="group font-poppins font-bold text-2xl">
          <img src="/lovable-uploads/2edc367a-e160-4dc6-a27f-ca10733ce63d.png" alt="Azhizen Logo" className="h-8" />
        </RouterLink>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-1">
            <NavigationMenuItem>
              <RouterLink 
                to="/" 
                className="font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-all cursor-pointer"
              >
                Home
              </RouterLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <button 
                onClick={() => handleNavigation('domains')}
                className="font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-all cursor-pointer"
              >
                Domains
              </button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <button
                onClick={() => handleNavigation('payment')}
                className="font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-all cursor-pointer"
              >
                Pricing
              </button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <button
                onClick={() => handleNavigation('apply')}
                className="btn-primary flex items-center gap-1"
              >
                Join Program
                <ChevronDown className="w-4 h-4" />
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <button 
          className="md:hidden text-azhizen-darkPurple p-2 rounded-md hover:bg-azhizen-lavender/50 transition-colors" 
          onClick={toggleMobileMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md px-4 py-5 border-t border-gray-100 animate-fade-in-up">
          <nav className="flex flex-col space-y-4">
            <RouterLink 
              to="/" 
              className="font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </RouterLink>
            <button 
              onClick={() => handleNavigation('domains')}
              className="text-left font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-colors cursor-pointer"
            >
              Domains
            </button>
            <button 
              onClick={() => handleNavigation('payment')}
              className="text-left font-medium px-4 py-2 rounded-md text-azhizen-darkPurple hover:bg-azhizen-lavender/50 hover:text-azhizen-purple transition-colors cursor-pointer"
            >
              Payment
            </button>
            <button 
              onClick={() => handleNavigation('apply')}
              className="btn-primary text-center"
            >
              Join Program
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
