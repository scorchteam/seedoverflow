import { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Container from "../components/common-components/Container/Container";
import Spinner from "../components/common-components/Spinner/Spinner";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import withAuth from "../components/withAuthProvider";
import { UserStoreContext } from "./_app";
import { useRouter } from "next/router";

const Logout: NextPage = () => {
    const { logout } = useContext(UserStoreContext);
    const router = useRouter();

    useEffect(() => {
        logout();
        router.push("/")
    }, [])

    return (
        <Container>
            <div className="w-full h-full flex items-center justify-center gap-2">
                <p>Logging out user...</p>
                <Spinner width="w-5" height="w-5"/>
            </div>
        </Container>
    )
}

export default withAuth(Logout);