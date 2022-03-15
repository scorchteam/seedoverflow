import { API_URL } from "../pages/_app"

export interface User {
    uuid?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    username?: string
}

export interface UserRegistrationDto {
    email: string,
    username: string,
    password: string,
    first_name?: string,
    last_name?: string
}

export interface UserLoginDto {
    email: string,
    password: string
}

export const mockUserRegistrationDto: UserRegistrationDto = {
    email: "user@domain.com",
    username: "user",
    password: "password",
    first_name: "First",
    last_name: "Last"
}

export const mockUserLoginDto: UserLoginDto = {
    email: "user@domain.com",
    password: "password"
}

export const RegisterNewUserPromise = async (newUserInfo: UserRegistrationDto) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo)
    }
    const url = `${API_URL}/user/auth/register`
    return fetch(url, requestOptions);
}

export const LoginUserPromise = async (userLoginInfo: UserLoginDto) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginInfo)
    }
    const url = `${API_URL}/user/auth/login`
    return fetch(url, requestOptions);
}

export const GetUserDataPromise = async (userAccessToken: string) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userAccessToken}`
        }
    }
    const url = `${API_URL}/user`
    return fetch(url, requestOptions);
}