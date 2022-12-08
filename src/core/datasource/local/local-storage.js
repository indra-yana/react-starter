import { useLocalStorage } from "../../../hooks/useLocalStorage";

export function authSession() {
    const [auth, setAuth] = useLocalStorage('auth', {});
    return [auth, setAuth];
}