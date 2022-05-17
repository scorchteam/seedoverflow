import Button from "../../components/common-components/Button/Button"
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserStoreContext } from "../_app";
import Heading from "../../components/common-components/Heading/Heading";
import PictureWheel, { PictureWheelSlide } from "../../components/common-components/PictureWheel/PictureWheel";
import Image from "next/image";

interface props {

}

const MainSection = (props: props) => {

    const router = useRouter();

    const { userLoggedIn } = useContext(UserStoreContext);

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
        <div className="w-full h-full">
            <div className="w-full flex flex-col gap-4 justify-center items-center pt-8 p-4">
                <Heading type="h1" center={true}>
                    Welcome to SeedOverflow
                </Heading>
                <Button
                    responsive={true}
                    buttonText={
                        userLoggedIn ? 
                        "Make some seeds" :
                        "Login/Register"
                    } 
                    onClick={
                    userLoggedIn ? 
                    () => {router.push("/profile/seeds")} :
                    () => {router.push("/login")}
                } />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
                <path className="fill-dark-comp"
                 d="M 0 64 L 80 64 C 160 64 320 64 480 96 C 640 128 800 192 960 186.7 C 1120 181 1280 107 1360 69.3 L 1440 32 L 1440 200 L 1360 200 C 1280 200 1120 200 960 200 C 800 200 640 200 480 200 C 200 200 160 200 80 200 L 0 200 Z">
                </path>
            </svg>
            <div className="w-full py-12 h-[300px] sm:h-[300px] md:h-[650px] lg-[750px] xl:h-[850px] bg-dark-comp">
                {/* <PictureWheel slides={pictureWheelSlides} /> */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" className="bg-lava-2"><path className="fill-dark-comp" d="M 0 32 L 1440 112 L 1440 0 L 0 0 Z"></path></svg>
            <div className="w-full h-96 bg-lava-2"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" className="bg-lava-2"><path className="fill-dark" d="M 0 32 L 1440 112 L 1440 160 L 0 160 Z"></path></svg>
            <div className="w-full h-96 bg-dark"></div>
        </div>
    )
}

export default MainSection