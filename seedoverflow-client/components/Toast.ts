export interface ToastStore {
    toastSuccess(message: string): any,
    toastError(message: string): any,
}