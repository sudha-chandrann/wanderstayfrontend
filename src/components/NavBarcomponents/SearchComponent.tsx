import { SearchIcon } from 'lucide-react'

function SearchComponent() {
  return (
    <div className='cursor-pointer  flex items-center justify-center  '>
      <div className='flex flex-row gap-2 items-center'>
        <div className='items-center justify-between gap-2 lg:gap-5 hidden sm:flex '>
           <div className='flex rounded-full items-center justify-center  px-2 py-1 hover:bg-muted-foreground/20'>
            Anywhere
           </div>
           <div className='flex rounded-full items-center justify-center  px-2 py-1 hover:bg-muted-foreground/20'>
            Anyweek
           </div>
           <div className='flex rounded-full items-center justify-center  px-2 py-1 hover:bg-muted-foreground/20'>
            Add guest
           </div>
        </div>
            <span className='p-1 text-white rounded-full bg-rose-400 dark:bg-rose-500 hover:bg-rose-600 transition-colors'>
            <SearchIcon className="text-bold  size-6 "/>
           </span>

      </div>
    </div>
  )
}

export default SearchComponent
