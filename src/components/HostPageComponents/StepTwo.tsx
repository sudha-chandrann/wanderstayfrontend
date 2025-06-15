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
import { AlertCircle } from "lucide-react";
import useCountries from "@/hooks/useCountries";
import Select from "react-select"
import Map from "./Map";


export type CountrySelectorValue = {
    flag:string;
    label:string;
    latlng:number[];
    region:string;
    value:string;
}

interface CountrySelectorProps {
    value:CountrySelectorValue | null;
    setStepNo: (no:number) => void;
    onChange :(field: string,value:CountrySelectorValue)=>void;
}

function StepTwo({ setStepNo,value , onChange}: CountrySelectorProps) {
  const [error, setError] = useState("");
  const {getAll}= useCountries();

  const handleNext = () => {
    if (!value) {
      setError("Please first select the location");
      return;
    }
    setStepNo(3);
  };

  const handleprev=()=>{
     setStepNo(1);
  }

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Where is your place located  ?
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
       onChange={(value)=>onChange("loaction", value as CountrySelectorValue)}
       value={value}
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       formatOptionLabel={(option:any)=>(
        <div className="flex flex-row items-center gap-3 text-black">
          <div>{option.flag}</div>
           <div>{option.label},
            <span className="text-neutral-800 ml-1">
                {option.region}
            </span>
            </div>
        </div>
       )}
       theme={(theme)=>({
        ...theme,
        borderRadius:6,
        colors:{
            ...theme.colors,
            primary:'#E3889D',
            primary25:'#ffe4e6'
        }
       })}
       />
       <Map center={value?.latlng}/>
   
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-x-4">
        <Button variant="ghost" className="border border-border" onClick={handleprev}>
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
