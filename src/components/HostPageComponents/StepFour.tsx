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
import ImageUploader from "./ImageUploader";

interface StepFourProps {
  setStepNo: (no: number) => void;
  value: Array<string>;
  Onclick: (value: string) => void;
}

function StepFour({ setStepNo, value, Onclick }: StepFourProps) {
  const [error, setError] = useState("");
  const handleNext = () => {
    if (!value.length) {
      setError("Please upload atleast one photo of your place");
      return;
    }
    setError('');
    setStepNo(5);
  };

  const handleprev = () => {
    setStepNo(3);
  };

  const handleFileUpload = (url: string) => {
    Onclick(url);
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Share some Photos of your place
        </CardTitle>
        <CardDescription>
          Add a photo of your place looks like !
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {value.length > 0 && (
          <div className="flex items-center gap-x-2 justify-start overflow-x-auto hide-scrollbar">
            {value.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`uploaded-${index}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
        <ImageUploader setError={setError} onFileUpload={handleFileUpload} />
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

export default StepFour;
