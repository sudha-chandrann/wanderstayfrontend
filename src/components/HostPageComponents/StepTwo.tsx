import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import useCountries from "@/hooks/useCountries";
import Select from "react-select";
import Map from "./Map";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";

export type CountrySelectorValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
  fullAddress?: string;
};

interface CountrySelectorProps {
  value: CountrySelectorValue | null;
  setStepNo: (no: number) => void;
  onChange: (field: string, value: CountrySelectorValue) => void;
}

function StepTwo({ setStepNo, value, onChange }: CountrySelectorProps) {
  const [error, setError] = useState("");
  const { getAll } = useCountries();
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [loading, setloading] = useState(false);

  const handleNext = () => {
    if (!value) {
      setError("Please first select the location");
      return;
    }
    setError("");
    setStepNo(3);
  };

  const handleprev = () => {
    setStepNo(1);
  };

  const handlegetAdress = async () => {
    if (!state || !city) {
      return;
    }
    const address = `${city},${state},${value?.label}`;
    setloading(true);
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${import.meta.env.VITE_API_KEY}`
      );
      const result = response.data.results[0];
      if (result.geometry) {
        const { lat, lng } = result.geometry;
        const newCoordinates = [lat, lng];
        const updatedValue: CountrySelectorValue = {
          flag: value?.flag ?? "",
          label: value?.label ?? "",
          region: value?.region ?? "",
          value: value?.value ?? "",
          fullAddress: address,
          latlng: newCoordinates,
        };
        onChange("loaction", updatedValue);
        setError("");
      } else {
        setError("Invalid country selection.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error during geting latlang", error);
      setError(error?.response?.data?.error || "Something Went Wrong!");
    } finally {
      setloading(false);
    }
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Where is your place located ?
        </CardTitle>
        <CardDescription>Help guests find you!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Select
          placeholder="Anywhere"
          isClearable
          options={getAll().map(({ latlang, ...rest }) => ({
            ...rest,
            latlng: latlang,
          }))}
          onChange={(value) =>
            onChange("loaction", value as CountrySelectorValue)
          }
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3 text-black">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-neutral-800 ml-1">{option.region}</span>
              </div>
            </div>
          )}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "#E3889D",
              primary25: "#ffe4e6",
            },
          })}
        />

        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-y-1  ">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="enter your state"
                  value={state}
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="enter your city"
                  value={city}
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button className="" onClick={handlegetAdress}>
                Get Address
              </Button>
            </div>
          </div>
        )}

        <Map center={value?.latlng} />
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-x-4">
        <Button
          variant="ghost"
          className="border border-border"
          onClick={handleprev}
        >
          Prev
        </Button>
        <Button className="text-white" onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepTwo;
