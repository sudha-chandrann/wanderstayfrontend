import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import UserMenu from "./UserMenu";


export default function NavBar() {


  return (

      <nav className="border-b bg-background/95 backdrop-blur fixed top-0 z-50 left-0 right-0">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center justify-between w-full px-5 md:px-10">
             <Link to={'/'}  className="flex items-center space-x-2">
               <Logo/>
            </Link>
            <SearchComponent/>
            <UserMenu/> 
          </div>
        </div>
      </nav>

  );
}
