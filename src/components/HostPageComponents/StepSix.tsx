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
import { AlertCircle, DollarSignIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface StepSixProps {
  setStepNo: (no: number) => void;
  value:number
  Onclick: (field: string, value: number) => void;
  onSubmit:()=>void;
}

function StepSix({ setStepNo, value, Onclick, onSubmit}: StepSixProps) {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!value) {
      setError("Please first set the price for one night stay at  your place");
      return;
    }
    setError('');
    onSubmit();
  };

  const handleprev = () => {
    setStepNo(5);
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Now, set your price
        </CardTitle>
        <CardDescription>How much do you charge per night</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm font-medium">
              Price
            </Label>
          </div>
          <div className="relative">
            <DollarSignIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="Price"
              type="number"
              value={value}
              onChange={(e) => Onclick('price', Number(e.target.value))}
              placeholder="Enter description  your place "
              className="pl-10 pr-10"
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
        <Button className="text-white" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepSix;
