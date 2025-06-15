import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  
  return (
    <div className="flex items-center justify-center  min-h-screen pt-32">
      Homepage {currentCategory}
    </div>
  )
}

export default Homepage
