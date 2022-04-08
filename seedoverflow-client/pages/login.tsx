import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Container from "../components/common-components/Container/Container";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import withoutAuth from "../components/withoutAuthProvider";

const Login: NextPage = () => {
    const [registerFormView, setRegisterFormView] = useState(false);

    return (
        <Container>
            <div className="max-w-lg mx-auto bg-light-comp dark:bg-dark-comp rounded-lg p-4">
                <h1 className="text-center text-2xl">{registerFormView ? <>Register</> : <>Login</>}</h1>
                {
                    registerFormView ?
                    <RegisterForm /> :
                    <LoginForm />
                }
                <div className="w-full justify-center flex flex-row gap-1 mt-4">
                    {!registerFormView ? <>Not registered?</> : <>Already registered?</>} 
                    <a onClick={() => {setRegisterFormView(!registerFormView)}} className="text-turquoise cursor-pointer">
                        {
                            registerFormView ?
                            <>Login Now</> :
                            <>Register Now</>
                        }
                    </a>
                </div>
                
            </div>
        </Container>
    )
}

export default withoutAuth(Login);