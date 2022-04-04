import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import Container from '../components/common-components/Container/Container'
import Spinner from '../components/common-components/Spinner/Spinner'

/**
 * Home page
 * @returns Home page
 */
const Home: NextPage = () => {

  useEffect(() => {
    Router.push("/home")
  }, [])

  return (
    <Container>
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    </Container>
  )
}

export default Home
