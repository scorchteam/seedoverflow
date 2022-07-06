import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react"
import Spinner from "../Spinner/Spinner";

interface PictureWheelProps {
    slides: PictureWheelSlide[],
}

export interface PictureWheelSlide {
    imageLink: string,
    description?: string,
    visited?: boolean
}

const PictureWheel = (props: PictureWheelProps) => {
    const { slides } = props;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(slides[0]);
    const [disableSwitch, setDisableSwitch] = useState(true);
    const [cachedIndeces, updateCachedIndeces] = useState<number[]>([]);

    useEffect(() => {
        setCurrentImage(slides[currentImageIndex]);
    }, [currentImageIndex]);

    const switchSlides = (amount: number) => {
        if (disableSwitch)
            return
        let newIndex = getNewIndex(amount);
        setCurrentImageIndex(newIndex)
        if (newIndex in cachedIndeces)
            return
        setDisableSwitch(true)
    }

    const getNewIndex = (amount: number) : number => {
        if (amount > (slides.length - 1))
            return 0
        let indexPlusAmount = currentImageIndex + amount;
        if (indexPlusAmount < 0)
            return slides.length - (-1 * amount)
        return indexPlusAmount % slides.length
    }

    const imageLoadingComplete = () => {
        setDisableSwitch(false);
        let newCachedIndeces = [...cachedIndeces];
        newCachedIndeces.push(currentImageIndex);
        updateCachedIndeces(newCachedIndeces);
    }

    const renderAllImages = () => {
        let index = 0;
        return slides.map((image) => {
            return <Image
                    className="hidden"
                    src={image.imageLink}
                    layout="fill"
                    key={index++}></Image>
        })
    }

    return (
        <div className="w-full h-full relative select-none">
            {renderAllImages()}
            <div className="w-full h-full relative">
                <Image
                    src={currentImage.imageLink}
                    // className={`${nextImageLoading ? 'hidden' : ''}`}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    onLoadingComplete={() => {imageLoadingComplete()}}></Image>
            </div>
            {/* <div className="w-full h-auto p-4 block md:hidden bg-dark-comp text-center">
                {currentImage.description}
            </div> */}
            <div className="absolute w-full h-full top-0 left-0 grid grid-cols-[auto_1fr_auto] md:grid-cols-[100px_1fr_100px] z-40">
                <div className="p-4 text-4xl h-full w-auto flex items-center justify-center cursor-pointer z-50 opacity-100 md:opacity-0 hover:opacity-100 bg-gradient-to-r from-light-comp dark:from-dark transition-all ease-in-out duration-250" onClick={() => switchSlides(-1)}>
                    <FontAwesomeIcon className="text-dark dark:text-light-comp" icon={faChevronLeft}></FontAwesomeIcon>
                </div>
                <div className="w-full h-full">
                    {
                        disableSwitch &&
                        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-dark/75">
                            </div>
                            <Spinner height="h-12" width="w-12" />
                        </div>
                    }
                </div>
                <div className="absolute w-full h-full grid grid-cols-[1fr_80%_1fr]">
                    <div className=""></div>
                    <div className=""></div>
                    <div className=""></div>
                </div>
                <div className="w-full h-full z-30 flex items-end justify-end absolute">
                    <div className="w-full h-auto p-4 hidden sm:block bg-light-comp/60 dark:bg-dark/90 text-center">
                        {currentImage.description}
                    </div>
                </div>
                <div className="p-4 text-4xl h-full w-auto flex items-center justify-center cursor-pointer z-50 opacity-100 md:opacity-0 hover:opacity-100 bg-gradient-to-l from-light-comp dark:from-dark transition-all ease-in-out duration-250" onClick={() => switchSlides(1)}>
                    <FontAwesomeIcon className="text-dark dark:text-light-comp" icon={faChevronRight}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}

export default PictureWheel