import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosconfig";
import { authlogin } from "@/redux/userslice";
import { Loader2Icon } from "lucide-react";
import Categories from "./Categories";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/register";
  const ishomepage= location.pathname === "/";


  const [IsLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/users/currentuser");
      if (response?.data?.success) {
        const user = response.data.data;
        dispatch(authlogin(user));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(" the error during geting currentuser", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (IsLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <nav className="bg-background/95  fixed top-0 z-50 left-0 right-0">
      <div className="border-b flex h-16 items-center justify-center">
        <div className="flex items-center justify-between w-full px-5 md:px-10">
          <Link to={"/"} className="flex items-center space-x-2">
            <Logo />
          </Link>
          {!(isLoginPage || isSignUpPage) && <SearchComponent />}
          <UserMenu />
        </div>
      </div>
      {ishomepage && <Categories />}
    </nav>
  );
}
