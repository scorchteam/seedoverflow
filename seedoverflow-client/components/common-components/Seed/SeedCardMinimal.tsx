import Image from "next/image"
import { Seed } from "../../Seed"

interface props {
    seed: Seed,
    index?: number,
}

/* TODO: Add copy seed button */
const SeedCard = (props: props) => {
    return (
        <li key={props.index} className="group will-change-transform flex flex-col items-center justify-center">
            <div className="dark:bg-dark-comp rounded-lg transition ease-in-out cursor-pointer w-full relative">
                <div className="group w-full h-auto pt-3 px-3 seed-card-header flex justify-start items-center gap-2 mb-3">
                    <p>{props.seed.submitted_by}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" className="">
                    <circle cx="2" cy="2" r="2"/>
                    </svg>
                    <p className="italic text-sm">{props.seed.seed_creation_date && new Date(props.seed.seed_creation_date).toLocaleDateString()}</p>
                </div>
                <div className="seed-card-body px-3 pb-3 mt-3">
                    <p>{props.seed.seed}</p>
                </div>
            </div>
            <div className="bg-purple hidden md:block w-[99%] -mt-10 group-hover:-mt-2 rounded-b-lg p-1 pt-2 pb-0 text-center bold transition-all ease-in-out duration-150 cursor-pointer">
                Edit
            </div>
            {/* <div className="absolute right-0 top-0 z-100 p-1 w-16 bg-purple rounded-tr-lg rounded-bl-lg justify-center items-center text-center bold transition-all ease-in-out duration-150 cursor-pointer hidden md:flex md:scale-x-0 group-hover:scale-x-100 origin-right">
                Edit
            </div>
            <div className="absolute right-0 bottom-0 z-100 p-1 w-16 bg-danger rounded-br-lg rounded-tl-lg justify-center items-center text-center bold transition-all ease-in-out duration-150 cursor-pointer hidden md:flex md:scale-x-0 group-hover:scale-x-100 origin-right">
                Delete
            </div> */}
        </li>
    )
}

export default SeedCard