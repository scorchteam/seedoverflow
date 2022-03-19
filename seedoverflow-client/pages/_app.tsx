import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { GetUserDataPromise, User, UserStore } from '../components/Auth'
import { createContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { handleResponseError } from '../components/ResponseHandling'
import { ToastStore } from '../components/Toast'
import { ThemeStore } from '../components/Theme'

export const API_URL = "http://localhost:5000/api/v1"
const userStore: UserStore = {
  updateUserData: (userData: User)=>{},
  updateUserAccessToken: (userAccessToken: string)=>{},
  logout: ()=>{},
  userData: undefined,
  userAccessToken: undefined,
  userLoggedIn: undefined
}
const toastStore: ToastStore = {
  toastSuccess: (message: string)=>{},
  toastError: (message: string)=>{}
}
const themeStore: ThemeStore = {
  darkModeEnabled: undefined,
  invertDarkMode: ()=>{}
};
export const UserStoreContext = createContext(userStore);
export const ToastStoreContext = createContext(toastStore);
export const ThemeStoreContext = createContext(themeStore);

function MyApp({ Component, pageProps }: AppProps) {
  const [userData, applyUserData] = useState<User>();
  const [userAccessToken, applyUserAccessToken] = useState<string>("");
  const [userLoggedIn, applyUserLoggedIn] = useState<boolean>(false);
  const [darkModeEnabled, updateDarkModeEnabled] = useState<boolean>();

  const toastStyles = `bg-green text-light-text dark:bg-dark-comp dark:text-dark-text`;

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      updateUserAccessToken(accessToken);
    }
  }, [])

  useEffect(() => {
    if (!userAccessToken)
      return
    localStorage.setItem("token", userAccessToken);
    GetUserDataPromise(userAccessToken)
      .then(response => response.json())
      .then(data => {
        if (handleResponseError(data, toastError))
          return
        applyUserData(data as User);
        applyUserLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
        toastError("Unable to grab user data");
      })
  }, [userAccessToken])

  const updateUserData = (userData: User) => {
    applyUserData(userData);
  }

  const updateUserAccessToken = (userAccessToken: string) => {
    applyUserAccessToken(userAccessToken);
  }

  const logout = () => {
    applyUserAccessToken("");
    applyUserData(undefined);
    applyUserLoggedIn(false);
    localStorage.removeItem("token");
    toastSuccess("Logged out successfully!")
  }

  const toastSuccess = (message: string) => {
    toast.success(message, {className: toastStyles})
  }

  const toastError = (message: string) => {
    toast.error(message, {className: toastStyles})
  }

  const invertDarkMode = () => {
    updateDarkModeEnabled(!darkModeEnabled);
  }

  return (
    <UserStoreContext.Provider value={{updateUserData, updateUserAccessToken, logout, userData, userLoggedIn, userAccessToken}}>
      <ToastStoreContext.Provider value={{toastSuccess, toastError}}>
        <ThemeStoreContext.Provider value={{
          ...themeStore,
          invertDarkMode}}>
          <Layout>
            <Component {...pageProps}/>
            <Toaster />
          </Layout>
        </ThemeStoreContext.Provider>
      </ToastStoreContext.Provider>
    </UserStoreContext.Provider>
  )
}

export default MyApp
