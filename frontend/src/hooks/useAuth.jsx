import { useContext } from "react";
import useLocalStorage from "./useLocalStorage";
import NotificationContext from "../store/NotificationContext";
import AuthenticationContext from "../store/AuthenticationContext";

export default function useAuth() {
    const notificationCtx = useContext(NotificationContext);
    const authenticationCtx = useContext(AuthenticationContext);
    const { updatePersonalDetails } = useLocalStorage();

    async function Auth(data, type) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${type}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const responsedata = await response.json();
            notificationCtx.message(responsedata.message);

            if (responsedata.type === "Success" && (type === "signin" || type === "signup")) {
                updatePersonalDetails(responsedata.response);
                authenticationCtx.setDetails(responsedata.id);
            }
            return responsedata.type;
        } catch (err) {
            console.log(err);
            notificationCtx.message("Check your connection!");
            return "false";
        }
    }

    return Auth;
}