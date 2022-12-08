import { useOutletContext } from "react-router-dom";

export function useAuthContext() {
    const { auth, setAuth } = useOutletContext();
    return { auth: auth || {}, setAuth };
}