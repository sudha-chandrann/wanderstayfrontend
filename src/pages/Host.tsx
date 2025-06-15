import StepOne from "@/components/HostPageComponents/StepOne";
import StepTwo, { type CountrySelectorValue } from "@/components/HostPageComponents/StepTwo";
import { useState } from "react";

interface FormDataProps {
  category: string;
  loaction:CountrySelectorValue | null
  guestcount: number;
  roomcount: number;
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
    imageSrc: [],
    price: 0,
    title: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string | CountrySelectorValue) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pt-20 flex items-center justify-center px-3">
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
    </div>
  );
}

export default Host;
