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
import { AlertCircle, MinusCircle, PlusCircle } from "lucide-react";

interface StepThreeProps {
  setStepNo: (no: number) => void;
  value: {
    guestcount: number;
    roomcount: number;
    bathroomCount:number;
  };
  Onclick: (field: string, value: number) => void;
}

function StepThree({ setStepNo, value, Onclick }: StepThreeProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!value.roomcount || !value.guestcount || !value.bathroomCount ) {
      setError("Please share basics about your place");
      return;
    }
    setError('');
    setStepNo(4);
  };

  const handleprev = () => {
    setStepNo(2);
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Share some Basics about your place
        </CardTitle>
        <CardDescription>What amenties do you have</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="w-full mx-3  px-2  py-2 flex items-center justify-between rounded-xl bg-neutral-100 dark:bg-background">
          <div>
            <h4 className="text-rose-400">Guests</h4>
            <span className="dark:text-gray-400">How many guests do you allow ?</span>
          </div>
          <div className="flex items-center justify-center gap-x-2 ">
            <MinusCircle
            className="text-rose-400"
              onClick={() => {
                Onclick(
                  "guestcount",
                  value.guestcount > 1 ? value.guestcount - 1 : value.guestcount
                );
              }}
            />
            {value.guestcount}
            <PlusCircle
              className="text-rose-400"
              onClick={() => {
                Onclick("guestcount", value.guestcount + 1);
              }}
            />
          </div>
        </div>

      <div className="w-full mx-3  px-2  py-2 flex items-center justify-between rounded-xl bg-neutral-100 dark:bg-background">
          <div>
            <h4 className="text-rose-400">Rooms</h4>
            <span className="dark:text-gray-400">How many rooms do you have ?</span>
          </div>
          <div className="flex items-center justify-center gap-x-2 ">
            <MinusCircle
            className="text-rose-400"
              onClick={() => {
                Onclick(
                  "roomcount",
                  value.roomcount > 1 ? value.roomcount - 1 : value.roomcount
                );
              }}
            />
            {value.roomcount}
            <PlusCircle
              className="text-rose-400"
              onClick={() => {
                Onclick("roomcount", value.roomcount + 1);
              }}
            />
          </div>
        </div>

        <div className="w-full mx-3  px-2  py-2 flex items-center justify-between rounded-xl bg-neutral-100 dark:bg-background">
          <div>
            <h4 className="text-rose-400">Bathrooms</h4>
            <span className="dark:text-gray-400">How many bathroom do you have ?</span>
          </div>
          <div className="flex items-center justify-center gap-x-2 ">
            <MinusCircle
            className="text-rose-400"
              onClick={() => {
                Onclick(
                  "bathroomCount",
                  value.bathroomCount > 1 ? value.bathroomCount - 1 : value.bathroomCount
                );
              }}
            />
            {value.bathroomCount}
            <PlusCircle
              className="text-rose-400"
              onClick={() => {
                Onclick("bathroomCount", value.bathroomCount + 1);
              }}
            />
          </div>
        </div>
        
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

export default StepThree;
