import SeedCard from "../../../components/common-components/Seed/SeedCard"
import { Seed } from "../../Seed"
import SeedCardMinimal from "../Seed/SeedCardMinimal"

interface props {
    seedList: Seed[]
}

const SeedList = (props: props) => {

    const renderSeedCards = () => {
        const rends = props.seedList.map((seed) => {
            return <SeedCard seed={seed} />
        })
        return rends;
    }

    return (
        <ul className="flex flex-col gap-4">
            {renderSeedCards()}
        </ul>
    )
}

export default SeedList