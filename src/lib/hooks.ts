import {useEffect, useState} from "react";
import {BASE_URL} from "./constants.ts";
import {JobItem} from "./types.ts";

export function useJobItems(searchText: string) {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const jobItemsSlice = jobItems.slice(0, 7);

    useEffect(() => {
        if (!searchText.trim()) return;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}?search=${searchText}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                setJobItems(data["jobItems"]);
            } catch (error) {
                throw new Error("Failed to fetch data");
            }

            setIsLoading(false);
        }

        fetchData();
    }, [searchText]);

    return [jobItemsSlice, isLoading] as const;
}
