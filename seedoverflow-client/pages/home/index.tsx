import type { NextPage } from 'next'
import Container from '../../components/common-components/Container/Container'
import SeedList from '../../components/common-components/SeedList/SeedList'
import Spinner from '../../components/common-components/Spinner/Spinner'
import PageGridLayout from '../../components/PageGridLayout'
import MainSection from './MainSection'

/**
 * Home page
 * @returns Home page
 */
const Home: NextPage = () => {
    return (
        <Container noMargin={true}>
            <PageGridLayout
                center={
                    <MainSection />
                }
            />
        </Container>
    )
}

export default Home