import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { GetUserDataPromise, User, UserStore } from '../components/Auth'
import { createContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ErrorResponse, handleResponseError } from '../components/ResponseHandling'
import { ToastStore } from '../components/Toast'
import { ThemeStore } from '../components/Theme'
import { GetSeedsPromise, Seed, SeedStore } from '../components/Seed'
import { useRouter } from 'next/router'

export const API_URL = process.env.NODE_ENV === "development" ? process.env.DEV_API : process.env.PROD_API;

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
const seedStore: SeedStore = {
  seeds: [],
  seedStoreUpdateTime: undefined,
  updateSeeds: ()=>{}
}
export const UserStoreContext = createContext(userStore);
export const ToastStoreContext = createContext(toastStore);
export const ThemeStoreContext = createContext(themeStore);
export const SeedStoreContext = createContext(seedStore);

function MyApp({ Component, pageProps }: AppProps) {
  const [userData, applyUserData] = useState<User>();
  const [userAccessToken, applyUserAccessToken] = useState<string>("");
  const [userLoggedIn, applyUserLoggedIn] = useState<boolean>(false);
  const [darkModeEnabled, updateDarkModeEnabled] = useState<boolean>();
  const [seeds, applySeeds] = useState<Seed[]>([]);
  const [seedStoreUpdateTime, updateSeedStoreUpdateTime] = useState<Date>();
  const router = useRouter();

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
        if (data) {
          const responseError = handleResponseError(data, toastError);
          if (responseError && responseError === ErrorResponse.UserNotFoundError) {
            localStorage.removeItem("token")
            return
          }
          if (Object.keys(data).includes("msg")) {
            if (data["msg"] === "Signature verification failed")
                return
          }
        } else {
          toastError("An unknown error occured");
          return
        }
        applyUserData(data as User);
        applyUserLoggedIn(true);
      })
      .catch(error => {
        toastError("Unable to grab user data");
      })
  }, [userAccessToken])

  useEffect(() => {
    if (!userLoggedIn || !userAccessToken) 
      return
    GetSeedsPromise(userAccessToken)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const responseError = handleResponseError(data, toastError);
          if (responseError && responseError === ErrorResponse.UserNotFoundError) {
            
            return
          }
        } else {
          toastError("An internal error occurred")
          return
        }
        applySeeds(data.GetSeedsSuccess.Seeds as Seed[])
        updateSeedStoreUpdateTime(new Date());
      })
  }, [userLoggedIn])

  const updateUserData = (userData: User) => {
    applyUserData({...userData});
  }

  const updateUserAccessToken = (userAccessToken: string) => {
    applyUserAccessToken(userAccessToken);
  }

  const updateSeeds = (seeds: Seed[] | undefined) => {
    if (!seeds)
      return
    applySeeds([...seeds]);
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
          <SeedStoreContext.Provider value={{updateSeeds, seeds, seedStoreUpdateTime}}>
            <Layout>
              <Component {...pageProps}/>
              <Toaster />
            </Layout>
          </SeedStoreContext.Provider>
        </ThemeStoreContext.Provider>
      </ToastStoreContext.Provider>
    </UserStoreContext.Provider>
  )
}

export default MyApp
