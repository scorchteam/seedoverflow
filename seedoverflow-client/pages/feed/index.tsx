import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../../components/common-components/Button/Button'
import Container from '../../components/common-components/Container/Container'
import Heading from '../../components/common-components/Heading/Heading'
import PageGridLayout from '../../components/PageGridLayout'
import { GetRecentSeeds, Seed } from '../../components/Seed'
import UserContent from '../profile/UserContent'
import RecentSeeds from './RecentSeeds'

const Feed: NextPage = () => {

    const router = useRouter();
    const [trendingSeeds, updateTrendingSeeds] = useState<Seed[]>([]);

    useEffect(() => {
        const getTrendingSeeds = async () => {
            let newSeeds = await GetRecentSeeds(1)
            .then(response => response.json())
            updateTrendingSeeds(newSeeds as Seed[])
        }
        getTrendingSeeds();
    }, [])

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

    const renderTrendingSeeds = () => {
        let key = 0;
        if (!trendingSeeds)
            return <></>
        return trendingSeeds.map((seed, index) => {
            return <p key={key}>{seed.seed}</p>
        })
    }

    return (
        <Container>
            <PageGridLayout
                gap={true}
                center={
                    <>
                        <Heading type='h2'>
                            Recent Seeds
                        </Heading>
                        <RecentSeeds />
                    </>
                }
                right={
                    <div className='w-full h-auto flex flex-col gap-4 mt-4'>
                        <Button onClick={() => {router.push({pathname: "/profile", query: {"tab": "makeseed"}})}} buttonText='Add a Seed' className='w-full' />
                        {/* <div className='p-4 rounded-xl w-full h-auto bg-dark-comp'>
                            <Heading type='h3'>Trending Seeds</Heading>
                            <ul className='flex flex-col text-blue underline'>
                                {renderTrendingSeeds()}
                            </ul>
                        </div> */}
                    </div>
                }
            />
        </Container>
    )
}

export default Feed