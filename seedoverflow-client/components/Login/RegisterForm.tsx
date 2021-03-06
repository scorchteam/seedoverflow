import { useFormik } from 'formik';
import Router from 'next/router';
import { useContext, useState } from 'react';
import { ToastStoreContext, UserStoreContext } from '../../pages/_app';
import { LoginUserPromise, RegisterNewUserPromise, UserLoginDto, UserRegistrationDto } from '../Auth';
import Button from '../common-components/Button/Button';
import FormikTextInput from '../common-components/Input/FormikTextInput';
import { ButtonType } from '../CommonEnums';
import { handleResponseError, handleResponseSuccess } from '../ResponseHandling';

interface errors {
    email?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    username?: string
}

interface RegisterDetails {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string
}

const validate = (values: RegisterDetails) => {
    const errors: errors = {};

    if (!/^[a-zA-Z]+$/i.test(values.first_name) && values.first_name !== '') {
        errors.first_name = 'First name must only contain alphanumeric characters'
    } else if (values.first_name.length > 64) {
        errors.first_name = 'First name must be 64 characters or less'
    }

    if (!/^[a-zA-Z]+$/i.test(values.last_name) && values.last_name !== '') {
        errors.last_name = 'Last name must only contain alphanumeric characters'
    } else if (values.last_name.length > 64) {
        errors.last_name = 'Last name must be 64 characters or less'
    }

    if (!values.username) {
        errors.username = 'Username cannot be blank'
    } else if (!/^[0-9a-zA-Z]+$/i.test(values.username)) {
        errors.username = 'Username must only contain alphanumeric characters'
    } else if (values.username.length > 32) {
        errors.username = 'Username must be 32 characters or less'
    } else if (values.username.length < 3)  {
        errors.username = 'Username must be at least 3 characters long'
    }

    if (!values.email) {
        errors.email = 'Email address cannot be blank';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    } else if (values.email.length > 320) {
        errors.email = 'Email address must be 320 characters or less'
    }

    if (!values.password) {
        errors.password = 'Password cannot be blank'
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
    } else if (values.password.length > 128) {
        errors.password = 'Password must 128 characters or less'
    } else if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/i.test(values.password)) {
        errors.password = 'Password must contain a special character'
    }

    return errors;
}

const RegisterForm = () => {

    const { updateUserAccessToken, logout, userLoggedIn } = useContext(UserStoreContext);
    const { toastSuccess, toastError } = useContext(ToastStoreContext);
    const [registerLoading, setRegisterLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>()

    const registerUser = async (userDetails: UserRegistrationDto) => {
        if (userLoggedIn && userLoggedIn === true) {
            toastError("Please log out before registering");
            return;
        }
        if (userDetails.first_name === '') {
            userDetails.first_name = undefined;
        }
        if (userDetails.last_name === '') {
            userDetails.last_name = undefined;
        }
        const response = await RegisterNewUserPromise(userDetails)
            .then(response => response.json())
            .then(data => {
                setRegisterLoading(false);
                return data;
            })
            .catch((error) => {
                toastError("Unable to register user");
                setRegisterLoading(false);
            });
        var result = handleResponseError(response, toastError);
        if (result) {
            if (Object.keys(response).includes("UserEmailTakenError")) {
                setSubmitError('The email provided has been taken')
                return;
            }
            setSubmitError('An error occured');
            return;
        }
        const success = handleResponseSuccess(response, toastSuccess);
        if (success) {
            window.location.reload()
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            username: ''
        },
        validate,
        onSubmit: values => {
            setRegisterLoading(true);
            registerUser(values);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-2">
            <div className='flex flex-col sm:flex-row gap-2'>
                <div className='flex flex-col w-full gap-2'>
                    <FormikTextInput
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        type="text"
                        error={formik.errors.first_name}
                        required={false}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.first_name} />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <FormikTextInput
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        type="text"
                        error={formik.errors.last_name}
                        required={false}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.last_name} />
                </div>
            </div>
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
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                error={formik.errors.email}
                required={true}
                onBlur={formik.handleBlur}
                touched={formik.touched.email} />
            <FormikTextInput
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                error={formik.errors.password}
                required={true}
                onBlur={formik.handleBlur}
                touched={formik.touched.password} />
            <div className='mt-4 max-w-[12rem] w-full mx-auto'>
                <Button loading={registerLoading} type={ButtonType.submit} buttonText="Submit" className='w-full' />
            </div> 
            <p className='text-danger text-center'>{submitError && submitError}</p>
        </form>
    )
}

export default RegisterForm