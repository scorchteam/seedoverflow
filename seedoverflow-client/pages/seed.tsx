import { NextPage } from "next";
import withAuth from "../components/AuthProvider";
import Container from "../components/common-components/Container/Container";

const Seed: NextPage = () => {
    return (
        <Container>
            Seed
        </Container>
    )
}

export default withAuth(Seed);