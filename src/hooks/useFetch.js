import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error(`Error code: ${res.status}`);
                }

                return res.json();
            })
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, [url]);

    return [data, isLoading, error];
}
