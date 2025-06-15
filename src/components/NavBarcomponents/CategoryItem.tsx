import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import type { CategoryProps } from "@/utils/constant";

interface CategoryItemProps {
  item: CategoryProps;
}

function CategoryItem({ item }: CategoryItemProps) {
  const Icon = item.icon;

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("category");

  const isSelected = currentCategory === item.label;

  const handleClick = () => {
    
    const currentQuery = qs.parse(location.search); 

    const updatedQuery = {
      ...currentQuery,
      category: item.label,
    };

    if (isSelected) {
      delete (updatedQuery as { category?: string }).category;
    }

    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    navigate(url);
  };

  return (
    <div
      className={`flex px-3 py-2 rounded-full items-center gap-x-2 cursor-pointer transition-all duration-200 whitespace-nowrap ${
        isSelected ? "bg-rose-400 hover:bg-rose-500 border-rose-700 text-white " : "bg-neutral-100 dark:text-black hover:bg-neutral-200"
      }`}
      onClick={handleClick}
    >
      <Icon className="h-5 w-5 inline-block mr-2" />
      {item.label}
    </div>
  );
}

export default CategoryItem;

