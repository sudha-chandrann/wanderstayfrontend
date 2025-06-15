import { 
    FanIcon, 
    HousePlugIcon, 
    TreePalmIcon, 
    MountainIcon,
    WavesIcon,
    TentIcon,
    BuildingIcon,
    CarIcon,
    SnowflakeIcon,
    FlameIcon,
    TreesIcon,
    CameraIcon,
    HeartHandshakeIcon,
    BedIcon,
    HomeIcon,
    MapPinIcon,
    type LucideIcon 
} from "lucide-react"

export interface CategoryProps {
    label: string;
    icon: LucideIcon;
    description: string;
}


export const categories: CategoryProps[] = [
    {
        label: 'Beach',
        icon: TreePalmIcon,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: FanIcon,
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: HousePlugIcon,
        description: 'This property is modern'
    },
    {
        label: 'Mountains',
        icon: MountainIcon,
        description: 'This property is in the mountains'
    },
    {
        label: 'Lakefront',
        icon: WavesIcon,
        description: 'This property is by a lake or water'
    },
    {
        label: 'Camping',
        icon: TentIcon,
        description: 'This property offers camping experience'
    },
    {
        label: 'City',
        icon: BuildingIcon,
        description: 'This property is in the city center'
    },
    {
        label: 'Parking',
        icon: CarIcon,
        description: 'This property includes parking'
    },
    {
        label: 'Ski-in/out',
        icon: SnowflakeIcon,
        description: 'This property offers ski access'
    },
    {
        label: 'Fireplace',
        icon: FlameIcon,
        description: 'This property has a fireplace'
    },
    {
        label: 'Forest',
        icon: TreesIcon,
        description: 'This property is surrounded by forest'
    },
    {
        label: 'Scenic Views',
        icon: CameraIcon,
        description: 'This property has amazing views'
    },
    {
        label: 'Family Friendly',
        icon: HeartHandshakeIcon,
        description: 'This property is great for families'
    },
    {
        label: 'Luxurious',
        icon: BedIcon,
        description: 'This property offers luxury amenities'
    },
    {
        label: 'Countryside',
        icon: HomeIcon,
        description: 'This property is in a rural setting'
    },
    {
        label: 'Unique Stay',
        icon: MapPinIcon,
        description: 'This property offers a unique experience'
    }
]
