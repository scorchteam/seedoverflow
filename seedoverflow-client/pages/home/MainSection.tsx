import Button from "../../components/common-components/Button/Button"
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserStoreContext } from "../_app";

interface props {

}

const MainSection = (props: props) => {

    const router = useRouter();

    const { userLoggedIn } = useContext(UserStoreContext);

    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col gap-4 justify-center items-center pt-8 p-4 bg-dark-comp">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl text-center">
                    Welcome to SeedOverflow
                </h1>
                <Button
                    className="text-2xl"
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
        </div>
    )
}

export default MainSection