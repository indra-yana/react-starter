import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? initialValue : JSON.parse(storedValue);
    });

    useEffect(() => {
        const listener = (e) => {
            if (e.storageArea === localStorage && e.key === key) {
                setValue(JSON.parse(e.newValue));
            }
        };

        window.addEventListener("storage", listener);
        return () => {
            window.removeEventListener("storage", listener);
        };
    }, [key]);

    const setValueInLocalStorage = (newValue) => {
        setValue((currentValue) => {
            const res = typeof newValue === 'function' ? newValue(currentValue) : newValue;
            localStorage.setItem(key, JSON.stringify(res));
            return res;
        })
    }

    return [value, setValueInLocalStorage]
}