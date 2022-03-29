import { NextPage } from "next"
import withAuth from "../../../components/withAuthProvider"
import Container from "../../../components/common-components/Container/Container"
import Button from "../../../components/common-components/Button/Button"
import { useContext, useEffect, useState } from "react"
import { DeleteSeedPromise, GetSeedPromise, GetSeedsPromise, PostSeedPromise, Seed } from "../../../components/Seed"
import { ToastStoreContext, UserStoreContext } from "../../_app"

const Profile: NextPage = () => {

    const [seeds, setSeeds] = useState<Seed[]>([])
    const { userAccessToken } = useContext(UserStoreContext);
    const { toastError, toastSuccess } = useContext(ToastStoreContext);

    useEffect(async () => {
        if (!userAccessToken)
            return
        const seed_response = await GetSeedsPromise(userAccessToken)
            .then(response => response.json())
        if ("GetSeedsSuccess" in seed_response) {
            setSeeds(seed_response["GetSeedsSuccess"]["Seeds"])
        }
    }, [userAccessToken])

    useEffect(() => {
        if (!seeds)
            return
    }, [seeds])

    const makeSeed = async () => {
        if (!userAccessToken) {
            toastError("Not authenticated yet");
            return;
        }
        const new_seed_id = (Math.random() + 1).toString(36).substring(7);
        let new_seed: Seed = {
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
                    seed: get_new_seed.seed
                }
                new_seed_array.push(new_seed)
                setSeeds([...new_seed_array]);
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
            let new_seed_array: Seed[] = seeds;
            let index = seeds.findIndex((seed) => {
                return seed.seed === seedId;
            })
            new_seed_array.splice(index, 1);
            setSeeds([...new_seed_array]);
        }
    }

    const renderSeeds = () => {
        let index = 0;
        const list = seeds.map((seed) => {
            index++;
            return <li className="cursor-pointer" key={index} onClick={() => deleteSeed(seed.seed)}>{seed.seed}</li>
        })
        return list
    }

    return (
        <Container>
            <Button buttonText="Make me a seed" onClick={makeSeed}  />
            <ul>
                {renderSeeds()}
            </ul>
        </Container>
    )
}

export default withAuth(Profile)