import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosconfig";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertCircle,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlaceCard from "@/components/HomePage/PlaceCard";
import { useSelector } from "react-redux";

export interface Place {
  _id: string;
  title: string;
  description: string;
  imageSrc: string[];
  price: number;
  category: string;
  location: {
    fullAddress: string;
    value: string;
    label: string;
    flag: string;
    region:string;
    latlng:number[];
  };
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  rating?: number;
  reviewCount?: number;
  host: {
    name: string;
    avatar?: string;
  };
}

function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentuser = useSelector((state: any) => state.user);
  useEffect(() => {

    const fetchPlaces = async () => {
      setLoading(true);
      setError("");
      try {
        // Fixed the URL construction logic
        const url = currentCategory 
          ? `/api/places/get?category=${encodeURIComponent(currentCategory)}`
          : '/api/places/get';
        
        const res = await axiosInstance.get(url);
        
        if (res.data && res.data.data) {
          setPlaces(res.data.data);
          setFilteredPlaces(res.data.data);
        } else {
          setPlaces([]);
          setFilteredPlaces([]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to load places", error);
        setError(
          error.response?.data?.message || 
          "Failed to load places. Please try again later."
        );
        setPlaces([]);
        setFilteredPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [currentCategory]);

  useEffect(() => {

    if (!searchTerm.trim()) {
      setFilteredPlaces(places);
      return;
    }

    const filtered = places.filter(place =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredPlaces(filtered);
  }, [searchTerm, places]);

  const clearCategory = () => {
    setSearchParams({});
  };



  if (loading) {
    return (
      <div className="pt-32 px-4 md:px-8 flex items-center justify-center h-screen">
             <Loader2 className="animate-spin size-10 text-rose-500"/>
      </div>
    );
  }

  return (
    <div className="pt-32 px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-rose-400">
              {currentCategory 
                ? `${currentCategory} Places` 
                : "Discover Amazing Places"
              }
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {filteredPlaces.length === 0 && !loading && !error ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No places found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No places match "${searchTerm}". Try adjusting your search.`
                : currentCategory 
                ? `No places found in category "${currentCategory}".`
                : "No places are available at the moment."
              }
            </p>
            {(searchTerm || currentCategory) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  clearCategory();
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place._id} data={place}  currentUser={currentuser}/>
            ))}
          </div>
        )}

        {filteredPlaces.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPlaces.length} of {places.length} places
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;