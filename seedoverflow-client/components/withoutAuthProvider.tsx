import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { IsUserAuthenticated } from "./Auth";
import Container from "./common-components/Container/Container";
import Spinner from "./common-components/Spinner/Spinner";
import { ErrorResponse, handleResponseError, handleResponseSuccess } from "./ResponseHandling";

const withoutAuth = (WrappedComponent: FunctionComponent) => {

    const checkUserAuth = async (userAccessToken: string) => {
        const response = await IsUserAuthenticated(userAccessToken)
            .then(response => response.json())
            .then(data => data);
        return response;
    }

    return (props: any) => {
        const Router = useRouter();
        const [verified, setVerified] = useState(true);
        const [connectionError, setConnectionError] = useState(false);
        const [countdown, setCountdown] = useState(30);

        var timer = 30;

        useEffect(() => {
            const asyncDetermineAuth = async () => {
                const accessToken = localStorage.getItem("token");
                if (!accessToken) {
                    setVerified(false);
                    return
                }
                const data = await checkUserAuth(accessToken)
                    .catch(error => {
                        if (!error.response) {
                            handleBadConnection();
                        }
                    })
                if (data && Object.keys(data).length > 0) {
                    if (handleResponseSuccess(data)) {
                        setVerified(true);
                        localStorage.removeItem("retry");
                        Router.replace("/")
                        return;
                    }
                    const responseError = handleResponseError(data);
                    if (responseError) {
                        if (responseError === ErrorResponse.UserNotFoundError) {
                            localStorage.removeItem("token");
                            setVerified(false);
                            return;
                        }
                    }
                }
            }
            asyncDetermineAuth();
        }, []);

        const handleBadConnection = (error: any = null) => {
            setConnectionError(true);
            var retry = localStorage.getItem("retry");
            if (!retry) {
                retry = "1"
                localStorage.setItem("retry", retry);
            }
            if (retry) {
                const retryNum = parseInt(retry);
                if (retryNum >= 3) {
                    setCountdown(-1);
                    return;
                }
                setInterval( function () {
                    const newTimer = timer - 1;
                    if (newTimer <= 0)
                        window.location.reload();
                    timer = newTimer;
                    setCountdown(newTimer);
                }, 1000)
                localStorage.setItem("retry", (retryNum + 1).toString());
            }
        }

        if (!verified) {
            return <WrappedComponent {...props} />;
        } else {
            return (
                <Container>
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        {
                            connectionError &&
                            <>
                                <p className="block mr-2 mb-2 text-xl text-center">Looks like we're having trouble... Try refreshing :)</p>
                                {
                                    countdown > 0 &&
                                    <p className="mr-2 mb-2 text-md text-center">Auto-refreshing in {countdown}</p>
                                }
                            </>
                        }
                        {
                            !connectionError &&
                            <p className="mr-2 mb-2 text-md text-center">Checking for login credentials...</p>
                        }
                        <Spinner width="w-5" height="w-5"/>
                    </div>
                </Container>
            ) ;
        }
    }
}

export default withoutAuth;