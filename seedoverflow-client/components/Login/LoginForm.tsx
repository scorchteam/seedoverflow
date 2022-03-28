import { useFormik } from 'formik';
import Router from 'next/router';
import { useContext, useState } from 'react';
import { ToastStoreContext, UserStoreContext } from '../../pages/_app';
import { LoginUserPromise, UserLoginDto } from '../Auth';
import Button from '../common-components/Button/Button';
import FormikTextInput from '../common-components/Input/FormikTextInput';
import { ButtonType } from '../CommonEnums';
import { handleResponseError, handleResponseSuccess } from '../ResponseHandling';

interface errors {
    email?: string,
    password?: string
}

interface LoginDetails {
    email: string,
    password: string
}

const validate = values => {
    const errors: errors = {};
    if (!values.email) {
        errors.email = 'Email address cannot be blank';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password cannot be blank'
    }

    return errors;
}

const LoginForm = () => {

    const { updateUserAccessToken, logout, userLoggedIn } = useContext(UserStoreContext);
    const { toastSuccess, toastError } = useContext(ToastStoreContext);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>();

    const loginUser = async (loginDetails: UserLoginDto) => {
        if (userLoggedIn && userLoggedIn === true) {
            toastError("Already logged in");
            return;
        } 
        setLoginLoading(true);
        const response = await LoginUserPromise(loginDetails)
            .then(response => response.json())
            .catch((error) => {
                toastError("Unable to login user");
            })
        var result = handleResponseError(response, toastError);
        if (result) {
            setLoginLoading(false);
            if (Object.keys(response).includes("UserNotFoundError")) {
                setSubmitError('User with these credentials not found')
                return;
            }
            setSubmitError('Unknown Error')
            return
        }
        handleResponseSuccess(response, toastSuccess);
        updateUserAccessToken(response?.LoginUserSuccess?.Token);
        Router.push("/")
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            setLoginLoading(true);
            loginUser(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-2">
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
                touched={formik.touched.password}/>
            <div className='mt-4 max-w-[12rem] w-full mx-auto'>
                <Button loading={loginLoading} type={ButtonType.submit} buttonText="Submit" className='w-full' />
            </div> 
            <p className='text-danger text-center'>{submitError && submitError}</p>
        </form>
    )
}

export default LoginForm