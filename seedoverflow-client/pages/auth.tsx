import type { NextPage } from 'next'
import { useContext, useState } from 'react';
import { LoginUserPromise, mockUserLoginDto, mockUserRegistrationDto, RegisterNewUserPromise} from '../components/Auth'
import Button from '../components/common-components/Button/Button';
import Container from '../components/common-components/Container/Container';
import { handleResponseError, handleResponseSuccess } from '../components/ResponseHandling';
import { ToastStoreContext, UserStoreContext } from './_app';

/**
 * Home page
 * @returns Home page
 */
const Auth: NextPage = () => {

    const { updateUserAccessToken, logout, userLoggedIn } = useContext(UserStoreContext);
    const { toastSuccess, toastError } = useContext(ToastStoreContext);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    const registerUser = async () => {
        if (userLoggedIn && userLoggedIn === true) {
            toastError("Please log out before registering");
            return;
        }
        const response = await RegisterNewUserPromise(mockUserRegistrationDto)
            .then(response => response.json())
            .catch((error) => {
                toastError("Unable to register user");
            });
        var result = handleResponseError(response, toastError);
        if (result)
            return
        handleResponseSuccess(response, toastSuccess);
    }

    const loginUser = async () => {
        if (userLoggedIn && userLoggedIn === true) {
            toastError("Already logged in");
            return;
        } 
        setLoginLoading(true);
        const response = await LoginUserPromise(mockUserLoginDto)
            .then(response => response.json())
            .catch((error) => {
                toastError("Unable to login user");
            })
        var result = handleResponseError(response, toastError);
        if (result)
            return
        handleResponseSuccess(response, toastSuccess);
        setLoginLoading(false);
        updateUserAccessToken(response?.LoginUserSuccess?.Token);
    }

    return (
        <Container>
            <div className='grid grid-rows-[auto_auto_auto] gap-4 w-fit'>
                <Button buttonText='Register new user' onClick={registerUser}/>
                <Button buttonText='Login User' loading={loginLoading} onClick={loginUser}/>
                <Button buttonText='Logout' onClick={logout}/>
            </div>
        </Container>
    )
}

export default Auth