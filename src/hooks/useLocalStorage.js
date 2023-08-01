import { useEffect, useState } from "react";

function getFromStorage(key, initialValue) {
    const value = JSON.parse(localStorage.getItem(key));
    if (value !== null) {
        return value;
    }
    if (initialValue instanceof Function) {
        return initialValue();
    }
    return initialValue;
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() =>
        getFromStorage(key, initialValue)
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
