import { useState } from "react";
import {
  AlignJustify,
  Calendar,
  Heart,
  Home,
  LogInIcon,
  LogOutIcon,
  Plane,
  Table,
  User,
  User2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";
import { ThemeToggle } from "./ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { authlogout } from "@/redux/userslice";
import axiosInstance from "@/utils/axiosconfig";

interface RootState {
  user: {
    email: string;
    avatar?: string;
    fullName: string;
    _id: string;
    phone: string;
  };
}

function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const router = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const HandleAuth = (url: string) => {
    setMenuOpen(false);
    router(`${url}`);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/api/users/logout");
      if (response?.data?.success) {
        dispatch(authlogout());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(" the error during geting logout", error);
    }
  };

  const handleGuest=()=>{
    if(!user?.email){
      router('/login')
    }
    else{
      router('host')
    }
    setMenuOpen(false);
  }

  return (
    <div className="relative flex items-center gap-2">
      <ThemeToggle />
      <div className="flex">
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
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <AlignJustify className="h-4 w-4" />
            )}

            <UserAvatar
              email={user?.email}
              userimage={user?.avatar}
              username={user?.fullName}
            />
          </Button>

          {menuOpen && (
            <div
              className="fixed right-0 top-20 mt-2 w-56 bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50"
              role="menu"
              aria-orientation="vertical"
            >
              <Button
                variant="ghost"
                className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                onClick={handleGuest}
                role="menuitem"
              >
              <User2 className="text-rose-500 size-4" />
                Become a host
              </Button>
              {user?.email && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {}}
                    role="menuitem"
                  >
                    <Plane className="text-rose-500 size-4" />
                    My trips
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {}}
                    role="menuitem"
                  >
                    <Heart className="text-rose-500 size-4" />
                    My favorites
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {}}
                    role="menuitem"
                  >
                    <Calendar className="text-rose-500 size-4" />
                    My reservations
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {}}
                    role="menuitem"
                  >
                    <Home className="text-rose-500 size-4" />
                    My Properties
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {}}
                    role="menuitem"
                  >
                    <Table className="text-rose-500 size-4" />
                    Airbnb my home
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <LogOutIcon className="text-rose-500 size-4" />
                    Logout
                  </Button>
                </>
              )}
              {!user?.email && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4  items-center justify-start px-4 py-2 text-sm font-medium"
                    onClick={() => {
                      HandleAuth("/login");
                    }}
                    role="menuitem"
                  >
                    <LogInIcon className="text-rose-500 size-4" />
                    Login
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full flex gap-x-4 items-center justify-start px-4 py-2 text-sm font-medium"
                    role="menuitem"
                    onClick={() => {
                      HandleAuth("/register");
                    }}
                  >
                    <User className="text-rose-500 size-4" />
                    Sign up
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
