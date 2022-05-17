import { useEffect, useState } from "react";
import SeedList from "../../components/common-components/SeedList/SeedList";
import { GetRecentSeeds, Seed } from "../../components/Seed";

const RecentSeeds = () => {
    const [seedList, updateSeedList] = useState<Seed[]>([]);
    const [pageIndex, updatePageIndex] = useState<number>(1);

    useEffect(() => {
        const getRecentSeeds = async () => {
            let newSeeds = await GetRecentSeeds(pageIndex)
                .then(response => response.json())
            updateSeedList(newSeeds as Seed[])
        }
        getRecentSeeds();
    }, [pageIndex])

    useEffect(() => {
        const getRecentSeeds = async () => {
            let seeds = await GetRecentSeeds(1)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data
                })
            if (!seeds)
                return
            updateSeedList(seeds as Seed[])
        }
        getRecentSeeds();
    }, [])

    const getNextPageIndex = (amount: number) => {
        if (amount < 0) {
            if (pageIndex <= 1)
                return 
        }
        if (amount > 0)
            if (seedList.length < 8)
                return
        return pageIndex + amount;
    }

    const switchPages = (amount: number) => {
        if (amount === 0)
            return
        let newPage = getNextPageIndex(amount)
        if (!newPage)
            return
        updatePageIndex(newPage);
    }

    return (
        <div>
            <div className="flex justify-between">
                <p>Showing results: {pageIndex*8 - 8}-{pageIndex*8}</p>
                <div className="flex gap-2">
                    <p className="text-xl cursor-pointer" onClick={() => {switchPages(-1)}}>{"<"}</p>
                    <p className="text-xl cursor-pointer" onClick={() => {switchPages(1)}}>{">"}</p>
                </div>
            </div>
            <SeedList listType="full" seedList={seedList} />
            <div className="flex justify-between">
                <p>Showing results: {pageIndex*8 - 8}-{pageIndex*8}</p>
                <div className="flex gap-2">
                    <p className="text-xl cursor-pointer" onClick={() => {switchPages(-1)}}>{"<"}</p>
                    <p className="text-xl cursor-pointer" onClick={() => {switchPages(1)}}>{">"}</p>
                </div>
            </div>
        </div>
    )
}

export default RecentSeeds;