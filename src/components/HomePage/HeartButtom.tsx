/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import type { UserType } from "@/redux/userslice";
import axiosInstance from "@/utils/axiosconfig";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeartButtonProps {
  currentUser: UserType | null;
  placeId: string;
}

function HeartButton({ currentUser, placeId }: HeartButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!placeId) return;
      
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/places/getliked/${placeId}`
        );
        if (response.data.success) {
          setIsLiked(response.data.data);
        }
      } catch (error: any) {
        console.error("Error fetching like status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeStatus();
  }, [placeId]);

  const toggleLike = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser?.email) {
      navigate("/login");
      return;
    }

    if (isLoading) {
      return;
    }

    const previousState = isLiked;
    try {
      setIsLoading(true);
      setIsLiked(!isLiked);
      await axiosInstance.post(`/api/places/getliked/${placeId}`);
    } catch (error: any) {
      console.error("Error toggling like:", error);
      setIsLiked(previousState);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.email, navigate, isLoading, isLiked, placeId]);

  return (
    <div
      className={cn(
        "rounded-full p-2 transition-colors hover:bg-gray-100 cursor-pointer inline-block",
        isLoading && "cursor-not-allowed opacity-50"
      )}
      onClick={toggleLike}
      style={{ pointerEvents: 'auto', zIndex: 10 }}
    >
      <Heart 
        className={cn(
          "size-6 text-rose-500 transition-colors", 
          isLiked && "fill-rose-600"
        )} 
      />
    </div>
  );
}

export default HeartButton;