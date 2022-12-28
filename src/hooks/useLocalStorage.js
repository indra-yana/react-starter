import { useEffect, useState } from "react";
import { getItem, setItem } from "src/core/datasource/local/local-storage";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = getItem(key);
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
            setItem(key, JSON.stringify(res));
            return res;
        })
    }

    return [value, setValueInLocalStorage]
}