import type { NextPage } from 'next'
import Container from '../components/common-components/Container/Container'
import Heading from '../components/common-components/Heading/Heading'

/**
 * Home page
 * @returns Home page
 */
const HeadingDemo: NextPage = () => {

    return (
        <div className='break-words'>
            <Heading type='h1'>Heading 1 wefaawefffffffffffffffffffffffffffffffffffffffffffffffffffffff</Heading>
            <Heading type='h2'>Heading 2</Heading>
            <Heading type='h3'>Heading 3</Heading>
        </div>
    )
}

export default HeadingDemo