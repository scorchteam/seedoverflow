import { faEdit, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useContext } from "react"
import { ToastStoreContext, UserStoreContext } from "../../../pages/_app"
import { createSeedTag, Seed } from "../../Seed"
import { CopyToClipboard } from "react-copy-to-clipboard";
import PictureWheel, { PictureWheelSlide } from "../PictureWheel/PictureWheel"
import SeedTag from "./SeedTag"
import { SeedTagEnum } from "../../Seed";

interface props {
    seed: Seed,
    listType?: "minimal" | "full",
    onClickDelete?: any,
    onClickEdit?: any
}

const SeedCard = (props: props) => {
    const { userData } = useContext(UserStoreContext);
    const { toastSuccess } = useContext(ToastStoreContext);

    const generatePictureSlides = () => {
        let slides : PictureWheelSlide[] = [];
        for (let x = 0; x < 10; x++) {
            let newPicWidth = Math.floor((Math.random() * (240 - 100) + 100) * 6);
            let newPicHeight = Math.floor(newPicWidth * .5625);
            slides.push({
                imageLink: `https://source.unsplash.com/random/${newPicWidth}x${newPicHeight}`,
                description: `New Random Image: ${x}`
            })
        }
        return slides;
    }
    const pictureWheelSlides = generatePictureSlides();

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
                    <div className="w-full h-auto aspect-video">
                        <PictureWheel slides={pictureWheelSlides} />
                    </div>
                }
                {
                    props.listType === "full" &&
                    <div className="w-full h-auto flex flex-wrap gap-1 bg-dark-comp px-3 pt-3">
                        <SeedTag seedTag={createSeedTag(SeedTagEnum.Mountain)} />
                        <SeedTag seedTag={createSeedTag(SeedTagEnum.Desert)} />
                        <SeedTag seedTag={createSeedTag(SeedTagEnum.Flat)} />
                        <SeedTag seedTag={createSeedTag(SeedTagEnum.Ocean)} />
                        <SeedTag seedTag={createSeedTag(SeedTagEnum.Stronghold)} />
                    </div>
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
            {
                props.seed.submitted_by === userData?.uuid &&
                <div className="absolute right-0 top-0 w-auto h-auto flex bg-danger rounded-tr-lg rounded-bl-lg">
                    <div className="bg-darker-green dark:bg-turquoise p-1 px-2 rounded-bl-lg cursor-pointer">
                        <FontAwesomeIcon icon={faEdit} className='text-light dark:text-dark'/>
                    </div>
                    <div className="p-1 px-2 rounded-tr-lg cursor-pointer" onClick={() => props.onClickDelete(props.seed.seed)}>
                        <FontAwesomeIcon icon={faTrash} className='text-light dark:text-dark' />
                    </div>
                </div>
            }
            
        </li>
    )
}

export default SeedCard