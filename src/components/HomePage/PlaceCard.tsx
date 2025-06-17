/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Place } from "@/pages/Homepage";
import type { UserType } from "@/redux/userslice";
import { DollarSign } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeartButtom from "./HeartButtom";

interface PlaceCardProps {
  data: Place;
  currentUser: UserType | null;
  actionId?: string;
  actionLabel?: string;
  disabled?: string;
  onAction?: (id: string) => void;
  reservation?: any;
}

const PlaceCard = ({ data, reservation, currentUser }: PlaceCardProps) => {
  const router = useNavigate();
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  return (
    <div
      className="group w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-900"
      onClick={() => {
        router(`/places/${data._id}`);
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={data.imageSrc[0]}
          alt={data.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-0.5 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {data.category}
            </span>
          </div>
          <HeartButtom currentUser={currentUser} placeId={data._id} />
        </div>

      </div>

      <div className="p-2 space-y-1">
        <h3 className="dark:text-white/80 line-clamp-1">
          {data.location.fullAddress ? data.location.fullAddress :`${data.location.label},${data.location.region}`}
        </h3>
        <h3 className="font-semibold text-sm text-gray-500  line-clamp-1 group-hover:text-rose-600 transition-colors">
          {data.title}
        </h3>
         <div className="flex items-center text-gray-600"><DollarSign className="size-3"/>{price} per night</div>
       </div>

      </div>
  );
};

export default PlaceCard;
