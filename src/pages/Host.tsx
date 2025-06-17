import ResultStatusCard from "@/components/HostPageComponents/ResultStatusCard";
import StepFive from "@/components/HostPageComponents/StepFive";
import StepFour from "@/components/HostPageComponents/StepFour";
import StepOne from "@/components/HostPageComponents/StepOne";
import StepSix from "@/components/HostPageComponents/StepSix";
import StepThree from "@/components/HostPageComponents/StepThree";
import StepTwo, {
  type CountrySelectorValue,
} from "@/components/HostPageComponents/StepTwo";
import axiosInstance from "@/utils/axiosconfig";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormDataProps {
  category: string;
  loaction: CountrySelectorValue | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: Array<string>;
  price: number;
  title: string;
  description: string;
}

function Host() {
  const [stepNo, setstepNo] = useState(1);
  const [form, setForm] = useState<FormDataProps>({
    category: "",
    loaction: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: [],
    price: 0,
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const router = useNavigate();

  const handleInputChange = (
    field: string,
    value: string | number | CountrySelectorValue
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (value: string) => {
    setForm((prev) => ({
      ...prev,
      imageSrc: [...prev.imageSrc, value],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(
        "/api/places/createnewplace",
        form
      );
      if (!response?.data?.success) {
             setError(response.data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(" the error during creating new place", error);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      setstepNo(7);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-20">
        <Loader2 className="animate-spin size-8 text-rose-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 bg-background pt-20 flex items-center justify-center px-3">
      {stepNo === 1 && (
        <StepOne
          setStepNo={setstepNo}
          value={form.category}
          Onclick={handleInputChange}
        />
      )}
      {stepNo === 2 && (
        <StepTwo
          setStepNo={setstepNo}
          value={form.loaction}
          onChange={handleInputChange}
        />
      )}
      {stepNo === 3 && (
        <StepThree
          setStepNo={setstepNo}
          value={{
            guestCount: form.guestCount,
            roomCount: form.roomCount,
            bathroomCount: form.bathroomCount,
          }}
          Onclick={handleInputChange}
        />
      )}
      {stepNo === 4 && (
        <StepFour
          setStepNo={setstepNo}
          value={form.imageSrc}
          Onclick={handleImageUpload}
        />
      )}
      {stepNo === 5 && (
        <StepFive
          setStepNo={setstepNo}
          value={{
            title: form.title,
            description: form.description,
          }}
          Onclick={handleInputChange}
        />
      )}
      {stepNo === 6 && (
        <StepSix
          setStepNo={setstepNo}
          value={form.price}
          Onclick={handleInputChange}
          onSubmit={handleSubmit}
        />
      )}
      {error && (
        <ResultStatusCard
          status="error"
          error="Failed to create listing. Please check your internet connection and try again."
          onRetry={() => setstepNo(1)} 
          onGoHome={() => router("/")}
          loading={loading}
        />
      )}
      {!error && stepNo === 7 && (
        <ResultStatusCard
          status="success"
          onContinue={() => setstepNo(1)} 
          onGoHome={() => router("/")}
        />
      )}
    </div>
  );
}

export default Host;
