import Image from "next/image"
import { useContext } from "react"
import { UserStoreContext } from "../../../pages/_app"
import { Seed } from "../../Seed"

interface props {
    seed: Seed,
    index?: number,
}

/* TODO: Add copy seed button */
const SeedCard = (props: props) => {
    const { userData } = useContext(UserStoreContext);

    return (
        <li key={props.index} className="group">
            <div className="dark:bg-dark-comp rounded-lg transition ease-in-out group-hover:scale-[1.01] cursor-pointer z-50 relative">
                <div className="pt-3 px-3 seed-card-header flex justify-start items-end gap-2 mb-3">
                    <div className="h-11 w-11 rounded-lg bg-purple"></div>
                    <div className="flex flex-col">
                        <p>{props.seed.submitted_by_username}</p>
                        <p className="italic text-sm">{props.seed.seed_creation_date.toLocaleDateString()}</p>
                    </div>
                </div>
                <img className="w-full max-h-48 object-cover" src={"/seedcard.jpg"} />
                <div className="seed-card-body px-3 pb-3 mt-3">
                    <p>{props.seed.seed}</p>
                </div>
            </div>
            {
                userData?.username &&
                userData.username === props.seed.submitted_by_username &&
                <div className="bg-purple z-10 -mt-8 group-hover:-mt-2 rounded-b-lg p-1 pt-2 pb-0 text-center bold transition-all ease-in-out duration-150 cursor-pointer">
                    Edit
                </div>
            }
        </li>
    )
}

export default SeedCard