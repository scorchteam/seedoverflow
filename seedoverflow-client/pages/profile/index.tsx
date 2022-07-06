import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import withAuth from "../../components/withAuthProvider"
import Container from "../../components/common-components/Container/Container"
import { SeedStoreContext, ToastStoreContext, UserStoreContext } from "../_app"
import Button from "../../components/common-components/Button/Button"
import Router, { useRouter } from "next/router"
import PageGridLayout from "../../components/PageGridLayout"
import { useFormik } from "formik"
import { GetUserDataPromise, User } from "../../components/Auth"
import FormikTextInput from "../../components/common-components/Input/FormikTextInput"
import { ButtonType } from "../../components/CommonEnums"
import Heading from "../../components/common-components/Heading/Heading"
import { DeleteUser, updateUser } from "../../components/User"
import { handleResponseError, handleResponseSuccess } from "../../components/ResponseHandling"
import toast from "react-hot-toast"
import Settings from "./settings"
import UserContent from "./UserContent"
import NewSeedForm from "../../components/common-components/Seed/NewSeedForm"
import { DeleteAllSeeds, GetSeedsPromise, Seed } from "../../components/Seed"

const Profile: NextPage = () => {

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady)
            return
        if (Object.keys(router.query).length < 1) {
            router.push({
                pathname: "/profile",
                query: { 'tab': 'settings'}
            },
            undefined,
            {shallow: true})
        }
    }, [router])

    const { userData, updateUserData, userAccessToken } = useContext(UserStoreContext);
    const { updateSeeds } = useContext(SeedStoreContext);

    const renderProfileCenter = () => {
        if (!router.isReady)
            return <div className="w-full h-full flex justify-center">Loading...</div>
        else {
            if (router.query.tab === "settings")
                return <Settings />
            else if (router.query.tab === "content")
                return <UserContent />
            else if (router.query.tab === "makeseed")
                return <div className="rounded-xl bg-light-comp dark:bg-dark-comp p-4">
                    <NewSeedForm />
                </div>
        }
        return <div className="w-full h-full flex justify-center">Loading...</div>
    }

    const switchToTab = (tab: string) => {
        if (!router.isReady)
            return
        if (router.query.tab === tab)
            return
        router.push({
            pathname: "/profile",
            query: { 'tab': tab}
        },
        undefined)
    }

    const deleteAllSeeds = () => {
        if (!userAccessToken)
            return
        DeleteAllSeeds(userAccessToken)
            .then(response => response.json())
            .then(async data => {
                let userSeeds = await GetSeedsPromise(userAccessToken)
                    .then(response => response.json())
                updateSeeds(userSeeds.GetSeedsSuccess.Seeds as Seed[]);
            })
    }

    const deleteUser = async () => {
        if (!userAccessToken)
            return
        let deleteResponse = DeleteUser(userAccessToken)
            .then(response => response.json())
            .then(data => {
                router.push("/logout")
            })
    }

    return (
        <Container>
            <PageGridLayout
                gap={true}
                left={
                    <>
                        <div className="w-full h-auto flex justify-center items-center">
                            <div className="w-20 md:flex-grow md:max-w-[5rem] aspect-square bg-green rounded-full"></div>
                        </div>
                        <div className="w-full pt-2">
                            <p className="text-center italic">{userData?.username}</p>
                            <p className="text-center">{userData?.first_name} {userData?.last_name}</p>
                        </div>
                        <div className="w-full mt-8">
                            <ul className="flex flex-col justify-center items-center gap-2">
                                <li className={`cursor-pointer text-lg w-full text-center p-1 rounded-lg font-bold ${router.query.tab === 'settings' ? 'bg-turquoise dark:bg-darker-turquoise' : 'bg-light-comp dark:bg-dark-comp'}`} onClick={() => switchToTab("settings")}>Settings</li>
                                <li className={`cursor-pointer text-lg w-full text-center p-1 rounded-lg font-bold ${router.query.tab === 'content' ? 'bg-turquoise dark:bg-darker-turquoise' : 'bg-light-comp dark:bg-dark-comp'}`} onClick={() => switchToTab("content")}>My Content</li>
                                <li className={`cursor-pointer text-lg w-full text-center p-1 rounded-lg font-bold ${router.query.tab === 'makeseed' ? 'bg-turquoise dark:bg-darker-turquoise' : 'bg-light-comp dark:bg-dark-comp'}`} onClick={() => switchToTab("makeseed")}>Make Seed</li>
                            </ul>
                        </div>
                    </>
                }

                center={renderProfileCenter()}
            
                right={
                    <div className="w-full h-auto p-4 rounded-xl bg-light-comp dark:bg-dark-comp flex flex-col gap-4">
                        <p className="font-bold text-center text-lg">Common Functions</p>
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => deleteAllSeeds()} buttonText="Delete All Seeds" danger={true} className="w-full"></Button>
                            <Button onClick={() => deleteUser()} buttonText="Delete User" danger={true} className="w-full "></Button>
                        </div>
                    </div>
                } />
        </Container>
    )
}

export default withAuth(Profile)