import { getItem, setItem } from "src/core/datasource/local/local-storage";
import { parseJsonOrString } from "src/utils/utility";
import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = getItem(key);
        return storedValue === null ? initialValue : parseJsonOrString(storedValue);
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