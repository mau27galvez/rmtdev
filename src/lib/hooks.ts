import {useEffect, useState} from "react";
import {BASE_URL} from "./constants.ts";
import {JobItem, JobItemContent} from "./types.ts";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useJobItems(searchText: string) {
    const { data, error, isLoading } = useQuery<JobItem[]>({
        queryKey: ["jobItemSearchText", searchText],
        queryFn: async () => {
            if (!searchText.trim()) return [] as JobItem[];

            const res = await fetch(`${BASE_URL}?search=${searchText}`);
            if (!res.ok) {
                const data = await res.json();

                throw new Error(data.description);
            }
            console.log("Successful request");

            const data = await res.json();

            return data["jobItems"] as JobItem[];
        },
        enabled: searchText !== null,
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);


    return {jobItems: data || [], isLoading} as const;
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
    const {data, error, isLoading} = useQuery<JobItemContent>({
        queryKey: ["jobItemContent", id],
        queryFn: id ? async () => {
            const res = await fetch(`${BASE_URL}/${id}`)

            if (!res.ok) {
                const data = await res.json();

                throw new Error(data["message"]);
            }

            const data = await res.json();

            return data["jobItem"] as JobItemContent;
        }: undefined,
        enabled: id !== null,
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (error) {
        toast.error(error.message);
    }

    return {jobItemContent: data || null, isLoading} as const;
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
