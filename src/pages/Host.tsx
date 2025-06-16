import StepFive from "@/components/HostPageComponents/StepFive";
import StepFour from "@/components/HostPageComponents/StepFour";
import StepOne from "@/components/HostPageComponents/StepOne";
import StepSix from "@/components/HostPageComponents/StepSix";
import StepThree from "@/components/HostPageComponents/StepThree";
import StepTwo, {
  type CountrySelectorValue,
} from "@/components/HostPageComponents/StepTwo";
import { useState } from "react";

interface FormDataProps {
  category: string;
  loaction: CountrySelectorValue | null;
  guestcount: number;
  roomcount: number;
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
    guestcount: 1,
    roomcount: 1,
    bathroomCount: 1,
    imageSrc: [],
    price: 0,
    title: "",
    description: "",
  });

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
            guestcount: form.guestcount,
            roomcount: form.roomcount,
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
          onSubmit={()=>{}}
        />
      )}
    </div>
  );
}

export default Host;
