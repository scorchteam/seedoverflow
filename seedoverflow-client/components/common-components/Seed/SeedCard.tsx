import { faEdit, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useContext } from "react"
import { ToastStoreContext, UserStoreContext } from "../../../pages/_app"
import { Seed } from "../../Seed"
import { CopyToClipboard } from "react-copy-to-clipboard";

interface props {
    seed: Seed,
    listType?: "minimal" | "full",
    onClickDelete?: any,
    onClickEdit?: any
}

const SeedCard = (props: props) => {
    const { userData } = useContext(UserStoreContext);
    const { toastSuccess } = useContext(ToastStoreContext);

    return (
        <li className="group w-full will-change-transform flex flex-col items-center justify-center">
            <div className="bg-light-comp dark:bg-dark-comp rounded-lg transition ease-in-out  w-full relative">
                <div className="pt-3 px-3 seed-card-header flex justify-start items-end gap-2 mb-3 w-full">
                    {
                        props.listType === "full" &&
                        <>
                            <div className="h-11 w-11 rounded-lg bg-darker-green dark:bg-turquoise"></div>
                            <div className="flex flex-col">
                                <p className="w-[12ch] xs:w-auto overflow-hidden">{props.seed.submitted_by_username}</p>
                                <p className="italic text-sm">{props.seed.seed_creation_date && new Date(props.seed.seed_creation_date).toUTCString()}</p>
                            </div>
                        </>
                    }
                    {
                        props.listType === "minimal" &&
                        <>
                            <div className="flex flex-col xs:flex-row xs:justify-center xs:items-center xs:gap-2">
                                <p className="w-auto max-w-[12ch] sm:max-w-max overflow-clip">{props.seed.submitted_by_username}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" className="fill-darker-green dark:fill-turquoise hidden xs:block">
                                    <circle cx="2" cy="2" r="2" />
                                </svg>
                                <p className="italic text-sm">{props.seed.seed_creation_date && new Date(props.seed.seed_creation_date).toUTCString()}</p>
                            </div>
                        </>
                    }
                </div>
                {
                    props.listType === "full" &&
                    <img className="w-full max-h-96 object-cover" src={"/seedcard.jpg"} />
                }
                <div className="seed-card-body px-3 pb-3 mt-3 w-full max-w-[calc(100vw-16px)] md:max-w-full">
                    <CopyToClipboard
                        text={props.seed.seed}
                        onCopy={() => { toastSuccess("Copied seed successfully!") }}>
                            <div className="grid justify-center items-center grid-cols-[auto_1fr] cursor-pointer">
                                <div className="p-2 bg-darker-green dark:bg-turquoise rounded-l-lg">
                                    <FontAwesomeIcon icon={faCopy} className='text-light dark:text-dark' />
                                </div>
                                <div className="block overflow-hidden overflow-ellipsis whitespace-nowrap bg-light dark:bg-dark p-2 rounded-r-lg">{props.seed.seed}</div>
                            </div>
                    </CopyToClipboard>
                </div>
            </div>
            {/* {
                userData?.username &&
                userData.username === props.seed.submitted_by_username &&
                <div className="bg-turquoise hidden md:block w-[99%] -mt-10 group-hover:-mt-2 rounded-b-lg p-1 pt-2 pb-0 text-center bold transition-all ease-in-out duration-150 cursor-pointer">
                    Edit
                </div>
            } */}
            <div className="absolute right-0 top-0 w-auto h-auto flex bg-danger rounded-tr-lg rounded-bl-lg">
                <div className="bg-darker-green dark:bg-turquoise p-1 px-2 rounded-bl-lg cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} className='text-light dark:text-dark'/>
                </div>
                <div className="p-1 px-2 rounded-tr-lg cursor-pointer" onClick={() => props.onClickDelete(props.seed.seed)}>
                    <FontAwesomeIcon icon={faTrash} className='text-light dark:text-dark' />
                </div>
            </div>
            {/* <div className="absolute right-0 top-0 z-100 p-1 w-16 bg-turquoise rounded-tr-lg rounded-bl-lg justify-center items-center text-center bold transition-all ease-in-out duration-150 cursor-pointer flex md:hidden scale-x-0 group-hover:scale-x-100 origin-right">
                Edit
            </div>
            <div className="absolute right-0 bottom-0 z-100 p-1 w-16 bg-danger rounded-br-lg rounded-tl-lg justify-center items-center text-center bold transition-all ease-in-out duration-150 cursor-pointer flex md:hidden scale-x-0 group-hover:scale-x-100 origin-right">
                Delete
            </div> */}
        </li>
    )
}

export default SeedCard