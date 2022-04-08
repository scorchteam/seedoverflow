import SeedCard from "../../../components/common-components/Seed/SeedCard"
import { Seed } from "../../Seed"
interface props {
    seedList: Seed[],
    listType: 'minimal' | 'full',
    onClickDelete?: any
}

const SeedList = (props: props = {seedList: [], listType: 'full'}) => {

    let index = 0;

    return (
        <ul className={`flex flex-col ${props.listType === 'minimal' ? "gap-2" : "gap-4"}`}>
            {
                props.seedList &&
                props.seedList.map(seed => <SeedCard onClickDelete={props.onClickDelete} key={seed.seed} listType={props.listType} seed={seed}></SeedCard>)
            }
        </ul>
    )
}

export default SeedList