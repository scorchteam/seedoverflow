import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { IsUserAuthenticated } from "./Auth";
import Container from "./common-components/Container/Container";
import Spinner from "./common-components/Spinner/Spinner";
import { handleResponseSuccess } from "./ResponseHandling";

const withAuth = (WrappedComponent: FunctionComponent) => {

    const checkUserAuth = async (userAccessToken: string) => {
        const response = await IsUserAuthenticated(userAccessToken)
            .then(response => response.json())
            .then(data => data);
        return response;
    }

    return (props: any) => {
        const Router = useRouter();
        const [verified, setVerified] = useState(false);
        const [connectionError, setConnectionError] = useState(false);
        const [countdown, setCountdown] = useState(30);

        var timer = 30;

        useEffect(async () => {
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                Router.push("/login");
                return
            }
            const data = await checkUserAuth(accessToken)
                .catch(error => {
                    if (!error.response) {
                        setConnectionError(true);
                        console.log(error);
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
                                console.log(newTimer);
                            }, 1000)
                            localStorage.setItem("retry", (retryNum + 1).toString());
                        }
                    }
                })
            if (data && handleResponseSuccess(data[0])) {
                setVerified(true);
                localStorage.removeItem("retry")
            }
        }, []);

        if (verified) {
            return <WrappedComponent {...props} />;
        } else {
            return (
                <Container>
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        {
                            connectionError &&
                            <>
                                <p className="mb-2 text-xl text-center">Looks like we're having trouble... Try refreshing :)</p>
                                {
                                    countdown > 0 &&
                                    <p className="mb-2 text-md text-center">Auto-refreshing in {countdown}...</p>
                                }
                            </>
                        }
                        <Spinner />
                    </div>
                </Container>
            ) ;
        }
    }
}

export default withAuth;