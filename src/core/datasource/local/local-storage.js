import { useLocalStorage } from "src/hooks/useLocalStorage";
import SecureLS from "secure-ls";

const APP_ENV = import.meta.env.VITE_APP_ENV;

const ls = new SecureLS({
    isCompression: false
});

export function authSession() {
    const [auth, setAuth] = useLocalStorage('auth', {});
    return [auth, setAuth];
}

export function setItem(key, value) {
    return APP_ENV === 'production'
        ? ls.set(key, value)
        : localStorage.setItem(key, value);
}

export function getItem(key, isJson = false) {
    return APP_ENV === 'production'
        ? (isJson ? JSON.parse(ls.get(key) || '{}') : ls.get(key) || null)
        : (isJson ? JSON.parse(localStorage.getItem(key) || '{}') : localStorage.getItem(key));
}

export function removeItem(key) {
    return APP_ENV === 'production'
        ? ls.remove(key)
        : localStorage.removeItem(key);
}