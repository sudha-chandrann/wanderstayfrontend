import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import defaultuserImage from "../../assets/defaultuser.png";

interface UserAvatarProps {
  userimage?: string;
  username?: string;
  email?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function UserAvatar({ 
  userimage, 
  username, 
  email,
  size = "md",
  className = ""
}: UserAvatarProps) {
  
  const getInitials = () => {
    if (username) {
      return username
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    
    if (email) {
      return email[0].toUpperCase();
    }
    
    return 'U'; // Default fallback
  };

  // Size classes for different avatar sizes
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
    xl: "h-12 w-12 text-lg"
  };


  const initials = getInitials();

  return (
    <div className={`relative inline-block ${className}`}>
      <Avatar 
        className={`${sizeClasses[size]} transition-all duration-200 hover:ring-2 hover:ring-rose-400 hover:ring-offset-2`}
        aria-label={username ? `${username}'s avatar` : 'User avatar'}
      >
        <AvatarImage 
          src={userimage || defaultuserImage} 
          alt={username ? `${username}'s profile picture` : 'User profile picture'}
          className="object-cover"
        />
        <AvatarFallback 
          className="bg-gradient-to-br from-rose-400 to-rose-600 text-white font-medium flex items-center justify-center"
          aria-label={`Initials: ${initials}`}
        >
          {initials || <User className="h-1/2 w-1/2" />}
        </AvatarFallback>
      </Avatar>
      
    </div>
  );
}

export default UserAvatar;