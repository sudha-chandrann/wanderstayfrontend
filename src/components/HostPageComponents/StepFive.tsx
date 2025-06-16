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
import { AlertCircle, MapPin, FileText } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface StepFiveProps {
  setStepNo: (no: number) => void;
  value: {
    title: string;
    description: string;
  };
  Onclick: (field: string, value: string) => void;
}

function StepFive({ setStepNo, value, Onclick }: StepFiveProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!value.title || !value.description) {
      setError("Please describe your place");
      return;
    }
    setError('');
    setStepNo(6);
  };

  const handleprev = () => {
    setStepNo(4);
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          How would you describe yourplace?
        </CardTitle>
        <CardDescription>Short and sweet works best</CardDescription>
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
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="title"
              value={value.title}
              onChange={(e) => Onclick('title', e.target.value)}
              placeholder="Enter title for your place"
              className="pl-10 pr-10 current-password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="Description"
              value={value.description}
              onChange={(e) => Onclick('description', e.target.value)}
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
        <Button className="text-white" onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepFive;
