import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import jwt_decode from "jwt-decode";

export function useAuthContext() {
    let { auth, setAuth } = useOutletContext();
    if (Object.keys(auth || {}).length === 0) {
        auth = {
            isLogin: false,
            user: {},
            token: {},
        }
    }

    const token = auth?.token?.accessToken;
    const now = Date.now();
    let expired = 0;

    if (token) {
        const decoded = jwt_decode(token);
        expired = decoded.exp * 1000;
    }

    useEffect(() => {
        if (expired < now) {
            console.log('Authorization token expired!');
            if (Object.keys(auth).length !== 0) {
                setAuth({});
            }
        }
    }, []);

    return {
        auth,
        setAuth
    };
}