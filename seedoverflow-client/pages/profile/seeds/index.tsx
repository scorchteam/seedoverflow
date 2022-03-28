import { NextPage } from "next"
import withAuth from "../../../components/withAuthProvider"
import Container from "../../../components/common-components/Container/Container"
import Button from "../../../components/common-components/Button/Button"
import { useEffect, useState } from "react"
import { Seed } from "../../../components/Seed"

const Profile: NextPage = () => {

    const [seeds, setSeeds] = useState<Seed[]>()

    useEffect(() => {
        
    }, [])

    const makeSeed = async () => {

    }

    return (
        <Container>
            <Button buttonText="Make me a seed"  />
        </Container>
    )
}

export default withAuth(Profile)