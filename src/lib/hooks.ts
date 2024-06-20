import {useEffect, useState} from "react";
import {BASE_URL} from "./constants.ts";
import {JobItem, JobItemContent} from "./types.ts";
import {useQuery} from "@tanstack/react-query";

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

    return {jobItemsSlice, isLoading} as const;
}

export function useActiveJobItemId() {
    const [activeId, setActiveId] = useState<number | null>(null)

    useEffect(() => {
        const handleHashChange = () => {
            const jobItemId = +window.location.hash.slice(1);

            if (jobItemId) {
                setActiveId(jobItemId);
                return;
            }

            setActiveId(null);
        }

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => window.removeEventListener("hashchange", handleHashChange)
    }, []);

    return activeId;
}

export function useJobItemContentById(id: number | null) {
    const {data, error, isPending} = useQuery<JobItemContent>({
        queryKey: ["jobItemContent", id],
        queryFn: async () => {
            if (id === null) {
                return null;
            }

            const res = await fetch(`${BASE_URL}/${id}`)
            const data = await res.json();

            return data["jobItem"];
        },
        enabled: id !== null,
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (error) {
        throw new Error("Failed to fetch data");
    }

    return {jobItemContent: data || null, isLoading: isPending};
}

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay, value]);

    return debouncedValue;
}
