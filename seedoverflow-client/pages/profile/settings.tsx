import { useFormik } from "formik";
import { useContext, useState } from "react";
import { GetUserDataPromise, User } from "../../components/Auth";
import Button from "../../components/common-components/Button/Button";
import Heading from "../../components/common-components/Heading/Heading";
import FormikTextInput from "../../components/common-components/Input/FormikTextInput";
import { ButtonType } from "../../components/CommonEnums";
import { handleResponseError, handleResponseSuccess } from "../../components/ResponseHandling";
import { updateUser } from "../../components/User";
import { ToastStoreContext, UserStoreContext } from "../_app";

const Settings = () => {

    const { userData, updateUserData, userAccessToken } = useContext(UserStoreContext);
    const { toastError, toastSuccess } = useContext(ToastStoreContext)

    const [updatingUserData, setUpdatingUserData] = useState<boolean>(false);

    const validate = (values: User) => {
        const errors: User = {};

        if (values.first_name) {
            if (!/^[a-zA-Z]+$/i.test(values.first_name) && values.first_name !== '') {
                errors.first_name = 'First name must only contain alphanumeric characters'
            } else if (values.first_name.length > 64) {
                errors.first_name = 'First name must be 64 characters or less'
            }
        }

        if (values.last_name) {
            if (!/^[a-zA-Z]+$/i.test(values.last_name) && values.last_name !== '') {
                errors.last_name = 'Last name must only contain alphanumeric characters'
            } else if (values.last_name.length > 64) {
                errors.last_name = 'Last name must be 64 characters or less'
            }
        }

        if (!values.username) {
            errors.username = 'Username cannot be blank'
        } else if (!/^[0-9a-zA-Z ]+$/i.test(values.username)) {
            errors.username = 'Username must only contain alphanumeric characters'
        } else if (values.username.length > 32) {
            errors.username = 'Username must be 32 characters or less'
        } else if (values.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            username: userData?.username ? userData?.username : '',
            first_name: userData?.first_name ? userData?.first_name : '',
            last_name: userData?.last_name ? userData?.last_name : '',
        },
        validate,
        enableReinitialize: true,
        onSubmit: async values => {
            setUpdatingUserData(true);
            if (!userAccessToken) {
                toastError("User authentication token could not be found")
                return;
            }
            const response = await updateUser(values, userAccessToken)
                .then(response => response.json())
                .then(data => {
                    setUpdatingUserData(false);
                    return data;
                })
                .catch((error) => {
                    toastError("Unable to update user details")
                    formik.resetForm()
                    setUpdatingUserData(false);
                })
            let errorResult = handleResponseError(response, toastError);
            if (errorResult) {
                toastError("An error occurred")
                formik.resetForm()
            }
            console.log(response)
            let successResult = handleResponseSuccess(response, toastSuccess)
            console.log(successResult)
            if (successResult) {
                toastSuccess("Updated user details successfully")
                if (userAccessToken) {
                    GetUserDataPromise(userAccessToken)
                        .then(response => response.json())
                        .then(data => updateUserData(data))
                }
            }
        },

    })

    return (
        <div className="w-full h-auto rounded-xl p-4 bg-dark-comp flex flex-col gap-4">
            <Heading type="h3" className="font-bold text-center md:text-left">Settings</Heading>
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-2">
                <FormikTextInput
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    type="text"
                    error={formik.errors.username}
                    required={true}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.username} />

                <FormikTextInput
                    name="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    type="text"
                    error={formik.errors.first_name}
                    required={false}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.first_name} />

                <FormikTextInput
                    name="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    type="text"
                    error={formik.errors.last_name}
                    required={false}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.last_name} />

                <div className='mt-4 w-fit mx-auto md:mx-0 md:ml-auto flex gap-4'>
                    <Button type={ButtonType.reset} disabled={!formik.dirty} responsive={true} buttonText="Cancel" className='w-auto' onClick={formik.resetForm} danger={true} />
                    <Button type={ButtonType.submit} disabled={!formik.dirty} responsive={true} loading={updatingUserData} buttonText="Update" className='w-auto' />
                </div>
                <p className='text-danger text-center'></p>
            </form>
        </div>
    )
}

export default Settings