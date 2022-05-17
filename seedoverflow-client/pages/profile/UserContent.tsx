import { useContext, useState } from "react";
import AnimateHeight from "react-animate-height";
import Button from "../../components/common-components/Button/Button";
import NewSeedForm from "../../components/common-components/Seed/NewSeedForm";
import SeedList from "../../components/common-components/SeedList/SeedList";
import { GetSeedPromise, NewSeedDto, PostSeedPromise, Seed } from "../../components/Seed";
import { SeedStoreContext, ToastStoreContext, UserStoreContext } from "../_app";

interface UserContentProps {
    listMode?: 'minimal' | 'full',
    unrenderAddButton?: boolean
}

const UserContent = (props: UserContentProps = {listMode: 'minimal'}) => {

    const { seeds, updateSeeds } = useContext(SeedStoreContext);
    const { userAccessToken, userData } = useContext(UserStoreContext);
    const { toastError, toastSuccess } = useContext(ToastStoreContext);
    const [makingSeed, updateMakingSeed] = useState<boolean>(false);
    const [animateHeightHeight, updateAnimateHeightHeight] = useState<number | string>(0);

    const makeSeed = async () => {
        if (!userAccessToken) {
            toastError("Not authenticated yet");
            return;
        }
        updateMakingSeed(true);
        const new_seed_id = (Math.random() + 1).toString(36).substring(3);
        let new_seed: NewSeedDto = {
            seed: new_seed_id
        }
        const seed_response = await PostSeedPromise(userAccessToken, new_seed)
            .then(response => response.json())
        if ("AddNewSeedSuccess" in seed_response) {
            toastSuccess("Created new seed successfully")
            const get_new_seed = await GetSeedPromise(new_seed_id)
                .then(response => response.json())
            if (Object.keys(get_new_seed).length > 0) {
                let new_seed_array: Seed[] = seeds;
                let new_seed: Seed = {
                    seed: get_new_seed.seed,
                    seed_creation_date: new Date(),
                    submitted_by: userData?.uuid ?? "unknown",
                    submitted_by_username: userData?.username ?? "unknown"
                }
                new_seed_array.push(new_seed)
                updateSeeds([...new_seed_array]);
                updateMakingSeed(false);
            }
        }
    }

    return (
        <div className="flex flex-col gap-2">       
            {
                seeds &&
                <SeedList listType={props.listMode} seedList={seeds} />
            }
        </div>
    )
}

export default UserContent;