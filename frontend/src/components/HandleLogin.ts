import { authActions } from "../store/slices/authSlice";
import { useAppDispatch } from "../hooks/store";
import { validateLogin } from "../api/getUserPassword";
import { useSnackbar } from "notistack";

export const handleLogin = async (
    username: string,
    password: string,
    enqueueSnackbar: ReturnType<typeof useSnackbar>['enqueueSnackbar'],
    dispatch: ReturnType<typeof useAppDispatch>
):Promise<boolean> => {
    
    const res = await validateLogin(username, password);
        if (res) {
            dispatch(
                authActions.login({
                    id: res["id"],
                    first_name: res["first_name"],
                    last_name: res["last_name"],
                    username: res["username"],
                    password: res["password"],
                })
            );
            localStorage.setItem("logedIn", JSON.stringify(true));
            return true;
        } else {
            enqueueSnackbar("Invalid Username or Password!", {
                variant: "error",
            });
            return false;
        }
    
};