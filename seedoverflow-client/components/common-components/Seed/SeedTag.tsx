import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SeedTag } from "../../Seed"

interface SeedTagProps {
    seedTag: SeedTag
}

const SeedTag = (props: SeedTagProps) => {

    const { seedTag } = props;

    return (
        <div className={`h-auto ${seedTag.icon ? '' : 'hidden md:block'} w-fit px-2 py-1 md:py-0 flex gap-1 justify-center items-center ${seedTag.bgColor ? `${seedTag.bgColor}` : `bg-blue`} rounded-xl text-dark`}>
            {
                seedTag.icon &&
                <FontAwesomeIcon icon={seedTag.icon} />
            }
            <span className="hidden md:block font-sans">{seedTag.tag}</span>
        </div>
    )
}

export default SeedTag