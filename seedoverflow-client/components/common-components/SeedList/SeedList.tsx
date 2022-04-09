import { useEffect, useState } from "react"
import SeedCard from "../../../components/common-components/Seed/SeedCard"
import { Seed } from "../../Seed"
interface props {
    seedList: Seed[],
    listType: 'minimal' | 'full',
    onClickDelete?: any,
    sortBy?: 'dateAscending' | 'dateDescending'
}

const SeedList = (props: props = {seedList: [], listType: 'full', sortBy: 'dateDescending'}) => {
    const [sortedSeedList, updateSortedSeedList] = useState<Seed[]>([]);
    
    const getSortedSeedList = (seedList: Seed[], sortBy: 'dateAscending' | 'dateDescending') : Seed[] => {
        if (!seedList)
            return []
        let copyOfSeedlist = [...seedList];
        if (sortBy === "dateAscending") {
            copyOfSeedlist.sort((a, b) => {
                let aDate = new Date(a.seed_creation_date).getTime()
                let bDate = new Date(b.seed_creation_date).getTime()
                return aDate - bDate;
            })
            return copyOfSeedlist
        }
        if (sortBy === "dateDescending") {
            copyOfSeedlist.sort((a, b) => {
                let aDate = new Date(a.seed_creation_date).getTime()
                let bDate = new Date(b.seed_creation_date).getTime()
                return bDate - aDate;
            })
            return copyOfSeedlist
        }
        return []
    }
    

    useEffect(() => {
        updateSortedSeedList(getSortedSeedList(props.seedList, props.sortBy ?? "dateDescending"))
    }, [props.seedList])

    let index = 0;
    return (
        <ul className={`flex flex-col ${props.listType === 'minimal' ? "gap-2" : "gap-4"}`}>
            {
                sortedSeedList &&
                sortedSeedList.map(seed => <SeedCard onClickDelete={props.onClickDelete} key={seed.seed} listType={props.listType} seed={seed}></SeedCard>)
            }
        </ul>
    )
}

export default SeedList