
import { categories } from "@/utils/constant";
import CategoryItem from "./CategoryItem";





function Categories() {



    return (
        <div className="h-16 w-full flex items-center gap-x-4 overflow-x-auto px-4 hide-scrollbar">
            {
                categories.map((item) => (
                    <CategoryItem key={item.label} item={item} />
                ))
            }
        </div>
    )
}

export default Categories