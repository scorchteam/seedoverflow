import { NextPage } from "next"
import { useContext } from "react"
import withAuth from "../../components/withAuthProvider"
import Container from "../../components/common-components/Container/Container"
import { UserStoreContext } from "../_app"
import Button from "../../components/common-components/Button/Button"
import Router from "next/router"

const Profile: NextPage = () => {

    const { userData } = useContext(UserStoreContext);

    return (
        <Container>
            <div className="flex flex-col">
                <p>{userData?.email}</p>
                <p>{userData?.first_name} {userData?.last_name}</p>
                <p>{userData?.username}</p>
                <p>{userData?.uuid}</p>
            </div>
            <Button buttonText="Take me to seeds" onClick={() => {Router.push("/profile/seeds")}} />
        </Container>
    )
}

export default withAuth(Profile)