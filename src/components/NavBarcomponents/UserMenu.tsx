import  { useState } from 'react';
// import { ThemeToggle } from './theme-toggle';
import { AlignJustify, LogInIcon, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import UserAvatar from './UserAvatar';
import { ThemeToggle } from './ThemeToggle';

function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router =useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const HandleAuth = (url:string) => {
    setMenuOpen(false);
    router(`${url}`)
  };

  return (
    <div className="relative flex items-center gap-2">
      <ThemeToggle/>
      
      <div className="hidden sm:flex">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMenu}
            className="flex items-center gap-2 rounded-full border-gray-300 dark:border-gray-600 hover:shadow-md transition-shadow"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="User menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <AlignJustify className="h-4 w-4" />}
            <UserAvatar/>
          </Button>

          {menuOpen && (
            <div
              className="fixed right-0 top-full mt-2 w-56 bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50"
              role="menu"
              aria-orientation="vertical"
            >
              
              <Button
                variant="ghost"
                className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                onClick={()=>{HandleAuth('/login')}}
                role="menuitem"
              >
                <LogInIcon className='text-rose-500 size-4'/>
                Login
              </Button>
              
              <Button
                variant="ghost"
                 className="w-full flex gap-x-4 items-center justify-start px-4 py-2 text-sm font-medium"
                role="menuitem"
                onClick={()=>{HandleAuth('/register')}}
              >
                <User className='text-rose-500 size-4'/>
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default UserMenu;