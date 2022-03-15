import { User } from "./Auth";

export interface UserStore {
    userData?: User,
    userAccessToken?: string,
    userLoggedIn?: boolean,
    updateUserData(userData: User): any,
    updateUserAccessToken(userAccessToken: string): any,
    logout(): any
}

export interface ToastStore {
    toastSuccess(message: string): any,
    toastError(message: string): any,
}