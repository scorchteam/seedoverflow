import type { NextPage } from 'next'
import Container from '../components/common-components/Container/Container'
import Spinner from '../components/common-components/Spinner/Spinner'

/**
 * Home page
 * @returns Home page
 */
const Home: NextPage = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default Home
