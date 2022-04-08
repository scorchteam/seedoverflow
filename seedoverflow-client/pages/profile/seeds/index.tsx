import { NextPage } from "next"
import withAuth from "../../../components/withAuthProvider"
import Container from "../../../components/common-components/Container/Container"
import Button from "../../../components/common-components/Button/Button"
import { useContext, useEffect, useState } from "react"
import { DeleteSeedPromise, GetSeedPromise, GetSeedsPromise, NewSeedDto, PostSeedPromise, Seed } from "../../../components/Seed"
import { SeedStoreContext, ToastStoreContext, UserStoreContext } from "../../_app"
import SeedList from "../../../components/common-components/SeedList/SeedList"

const Profile: NextPage = () => {

    const [makingSeed, updateMakingSeed] = useState<boolean>(false);
    const { userAccessToken, userData } = useContext(UserStoreContext);
    const { toastError, toastSuccess } = useContext(ToastStoreContext);
    const { seeds, updateSeeds } = useContext(SeedStoreContext);
    

    useEffect(() => {
        console.log(seeds);
    }, [seeds])

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
                    submitted_by: userData?.uuid,
                    submitted_by_username: userData?.username ?? "undefined"
                }
                new_seed_array.push(new_seed)
                updateSeeds([...new_seed_array]);
                updateMakingSeed(false);
            }
        }
    }

    const deleteSeed = async (seedId: string) => {
        if (!userAccessToken) {
            toastError("Not authenticated yet");
            return;
        }
        const delete_response = await DeleteSeedPromise(userAccessToken, seedId)
            .then(response => response.json())
        if ("DeletingSeedSuccess" in delete_response) {
            toastSuccess(`Deleted seed: ['${seedId}']`)
            let new_seed_array: Seed[] = seeds;
            let index = seeds.findIndex((seed) => {
                return seed.seed === seedId;
            })
            new_seed_array.splice(index, 1);
            updateSeeds([...new_seed_array]);
        }
    }

    const renderSeeds = () => {
        console.log(seeds);
        if (!seeds)
            return <></>
        let index = 0;
        const list = seeds.map((seed) => {
            index++;
            return <li className="cursor-pointer" key={index} onClick={() => deleteSeed(seed.seed)}>{seed.seed}</li>
        })
        return list
    }

    return (
        <Container>
            <Button buttonText="Make me a seed" onClick={makeSeed} loading={makingSeed} />
            <br></br>
            {
                seeds &&
                <SeedList listType={'minimal'} seedList={seeds} onClickDelete={deleteSeed} />
            }
        </Container>
    )
}

export default withAuth(Profile)