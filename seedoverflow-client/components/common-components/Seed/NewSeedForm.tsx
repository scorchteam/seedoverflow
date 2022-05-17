import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SeedStoreContext, UserStoreContext } from "../../../pages/_app";
import { ButtonType } from "../../CommonEnums";
import { GetSeedsPromise, PostSeedPromise, Seed } from "../../Seed";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import FormikTextInput from "../Input/FormikTextInput";

interface errors {
    seed?: string
}

const validate = (values: errors) => {
    const errors: errors = {};
    if (!values.seed) {
        errors.seed = 'Seed cannot be blank'
    } else if (values.seed.trim() === "") {
        errors.seed = 'Seed cannot be blank'
    }
}


const NewSeedForm = () => {

    const router = useRouter();

    const { updateSeeds } = useContext(SeedStoreContext);
    const { userAccessToken } = useContext(UserStoreContext);

    const formik = useFormik({
        initialValues: {
            'seed': ''
        },
        validate,
        onSubmit: async values => {
            if (!userAccessToken)
                return
            let post = await PostSeedPromise(userAccessToken, values)
                .then(response => response.json())
                .then(async () => {
                    let updatedSeeds = await GetSeedsPromise(userAccessToken)
                        .then(response => response.json())
                        .then(data => updateSeeds(data["GetSeedsSuccess"]["Seeds"]))
                    router.push({
                        pathname: "/profile",
                        query: {'tab': "content"}
                    }, undefined)
                })
            
        }
    })


    
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-2">
            <Heading type="h3">
                Make Seed
            </Heading>
            <FormikTextInput
                name="seed"
                onChange={formik.handleChange}
                value={formik.values.seed}
                type="text"
                error={formik.errors.seed}
                required={true}
                onBlur={formik.handleBlur}
                touched={formik.touched.seed} />
            <div className='mt-4 max-w-[12rem] w-full mx-auto'>
                <Button type={ButtonType.submit} buttonText="Submit" className='w-full' />
            </div>
        </form>
    )
}

export default NewSeedForm;