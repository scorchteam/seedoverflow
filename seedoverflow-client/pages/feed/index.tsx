import type { NextPage } from 'next'
import Link from 'next/link'
import Button from '../../components/common-components/Button/Button'
import Container from '../../components/common-components/Container/Container'
import Heading from '../../components/common-components/Heading/Heading'
import PageGridLayout from '../../components/PageGridLayout'
import UserContent from '../profile/UserContent'

const Feed: NextPage = () => {

    const renderFilters = () => {
        const filters = ['Mountain', 'Flat', 'Desert', 'Ocean', 'Stronghold']
        const lis = filters.map((filter, index) => {
            return  <li key={index} className="flex gap-2 items-center">
                        <input type={'checkbox'}></input>
                        {filter}
                    </li>
        })
        return lis;
    }

    return (
        <Container>
            <PageGridLayout
                gap={true}
                left={
                    <div className='p-4 rounded-xl bg-dark-comp w-full h-auto'>
                        <Heading type='h3'>Filters</Heading>
                        <ul>
                            {renderFilters()}
                        </ul>
                    </div>
                }
                center={
                    <UserContent listMode='full' unrenderAddButton={true} />
                }
                right={
                    <div className='w-full h-auto flex flex-col gap-4'>
                        <Button buttonText='Add a Seed' className='w-full' />
                        <div className='p-4 rounded-xl w-full h-auto bg-dark-comp'>
                            <Heading type='h3'>Trending Seeds</Heading>
                            <ul className='flex flex-col text-blue underline'>
                                <Link href={'#'}>jfjweiofjwej</Link>
                                <Link href={'#'}>jfjweiofjwej</Link>
                                <Link href={'#'}>jfjweiofjwej</Link>
                                <Link href={'#'}>jfjweiofjwej</Link>
                                <Link href={'#'}>jfjweiofjwej</Link>
                                <Link href={'#'}>jfjweiofjwej</Link>
                            </ul>
                        </div>
                    </div>
                }
            />
        </Container>
    )
}

export default Feed