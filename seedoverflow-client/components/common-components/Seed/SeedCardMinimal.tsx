import Image from "next/image"
import { Seed } from "../../Seed"

interface props {
    seed: Seed,
    index?: number,
}

/* TODO: Add copy seed button */
const SeedCard = (props: props) => {
    return (
        <li key={props.index} className="group">
            <div className="dark:bg-dark-comp rounded-lg transition ease-in-out group-hover:scale-[1.01] cursor-pointer z-50 relative">
                <div className="group w-full h-auto pt-3 px-3 seed-card-header flex justify-start items-center gap-2 mb-3">
                    <p>{props.seed.submitted_by_username}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" className="">
                    <circle cx="2" cy="2" r="2"/>
                    </svg>
                    <p className="italic text-sm">{props.seed.seed_creation_date.toLocaleDateString()}</p>
                </div>
                <div className="seed-card-body px-3 pb-3 mt-3">
                    <p>{props.seed.seed}</p>
                </div>
            </div>
            <div className="bg-purple z-10 -mt-8 group-hover:-mt-2 rounded-b-lg p-1 pt-2 pb-0 text-center bold transition-all ease-in-out duration-150 cursor-pointer">
                Edit
            </div>
        </li>
    )
}

export default SeedCard