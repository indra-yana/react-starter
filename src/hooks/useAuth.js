import { useLocalStorage } from "./useLocalStorage";

export function useAuth() {
    const [auth, setAuth] = useLocalStorage('auth', {});
    return [auth, setAuth];
}