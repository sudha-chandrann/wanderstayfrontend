import { categories } from "@/utils/constant";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface StepOneProps {
  setStepNo: (no:number) => void;
  value: string;
  Onclick:(field:  string, value: string)=>void
}

function StepOne({ setStepNo, value ,Onclick}: StepOneProps) {
  const [error, setError] = useState("");
  const handleNext = () => {
    if (!value) {
      setError("Please first select the category");
      return;
    }
    setStepNo(2);
  };

  return (
    <Card className="w-full md:w-1/2 mx-4">
      <CardHeader>
        <CardTitle className="font-bold text-2xl ">
          Which of these best describes your place ?
        </CardTitle>
        <CardDescription>Pick a Category</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "flex items-center justify-start bg-neutral-100 hover:bg-slate-200 dark:text-black dark:hover:bg-slate-200",
                  (value ===item.label)&&"bg-rose-200 border border-rose-600"
                )}
                onClick={() => {
                    setError('');
                    Onclick("category",item.label)
                }}
              >
                <Icon className="text-rose-500" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-white" onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepOne;
