import type { NextPage } from 'next'
import Container from '../../components/common-components/Container/Container'
import SeedList from '../../components/common-components/SeedList/SeedList'
import Spinner from '../../components/common-components/Spinner/Spinner'
import PageGridLayout from '../../components/PageGridLayout'

/**
 * Home page
 * @returns Home page
 */
const Home: NextPage = () => {
    return (
        <Container>
            <PageGridLayout
                left={
                    <></>
                }
                center={
                    <SeedList seedList={[{"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}, {"seed": "ewfwefwefwe", submitted_by_username: "nprussen", seed_creation_date: new Date()}]} />
                }
                right={
                    <></>
                }
            />
        </Container>
    )
}

export default Home