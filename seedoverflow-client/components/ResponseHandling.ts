/** Possible successes given by API */
export enum SuccessResponse {
    Success = "Success",
    RegisterUserSuccess = "RegisterUserSuccess",
    LoginUserSuccess = "LoginUserSuccess",
}

/** Possible errors thrown by API */
export enum ErrorResponse {
    Error = "Error",
    EmptyRequestBodyError = "EmptyRequestBodyError",
    MissingRequiredFieldsError = "MissingRequiredFieldsError",
    UserNotFoundError = "UserNotFoundError",
    UserEmailTakenError = "UserEmailTakenError",
}

/**
 * Handles successful http responses and spawns specific toasts
 * @param response response data
 * @param toastSuccess function to spawn new successful toasts
 * @returns n/a
 */
export const handleResponseSuccess = (response: any, toastSuccess: Function) => {
    if (!response)
        return
    switch (Object.keys(response)[0]) {
        case SuccessResponse.Success:
            toastSuccess("Success!")
            break;
        case SuccessResponse.RegisterUserSuccess:
            toastSuccess("User registered successfully!")
            break;
        case SuccessResponse.LoginUserSuccess:
            toastSuccess("User logged in successfully!")
            break;
    }
}

/**
 * Checks for response errors and returns true if found
 * @param response response data
 * @param toastError function to submit error toasts
 * @returns true if error found
 */
export const handleResponseError = (response: any, toastError: Function) => {
    if (!response)
        return
    switch (Object.keys(response)[0]) {
        case ErrorResponse.Error:
            toastError("Server is having issues :(");
            return true;
        case ErrorResponse.UserEmailTakenError:
            toastError("Email already taken");
            return true;
        case ErrorResponse.EmptyRequestBodyError:
            toastError("Unable to complete request. Invalid body");
            return true;
        case ErrorResponse.UserNotFoundError:
            toastError("Unable to login user. User not found");
            return true;
        case ErrorResponse.MissingRequiredFieldsError:
            var key = ErrorResponse.MissingRequiredFieldsError;
            toastError(`Missing required field(s): ${response[key].MissingKeys}`);
            return true;
    }
}