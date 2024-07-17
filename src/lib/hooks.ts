import {MutableRefObject, useContext, useEffect, useState} from "react";
import {BASE_URL} from "./constants.ts";
import {JobItem, JobItemContent} from "./types.ts";
import {useQueries, useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {BookmarksContext} from "../contexts/BookmarksContextProvider.tsx";

async function fetchJobItemContentById(id: number) {
    const res = await fetch(`${BASE_URL}/${id}`)

    if (!res.ok) {
        const data = await res.json();

        throw new Error(data["message"]);
    }

    const data = await res.json();
    const jobItemContent = data["jobItem"] as JobItemContent;

    return jobItemContent;
}

export function useSearchJobItems(searchText: string) {
    const {data, error, isLoading} = useQuery<JobItem[]>({
        queryKey: ["jobItemSearchText", searchText],
        queryFn: async () => {
            if (!searchText.trim()) return [] as JobItem[];

            const res = await fetch(`${BASE_URL}?search=${searchText}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.description);
            }

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

export function useJobItems(ids: number[]) {
    const jobItemsQueries = useQueries({
        queries: ids.map(id => ({
            queryKey: ["jobItemById", id],
            queryFn: () => fetchJobItemContentById(id),
            enabled: ids.length > 0,
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
        })),
    });

    const jobItems = jobItemsQueries
        .map((query) => query.data)
        .filter((jobItem) => jobItem !== undefined);
    const isLoading = jobItemsQueries.some(jobItemQuery => jobItemQuery.isLoading);

    return {jobItems, isLoading: isLoading} as const;
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
        queryFn: id ? () => fetchJobItemContentById(id) : undefined,
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

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key);

        if (savedValue) {
            return JSON.parse(savedValue);
        }

        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

export function useBookmarksContext() {
    const context = useContext(BookmarksContext);

    if (!context) {
        throw new Error("useBookmarksContext must be used within a BookmarksContextProvider.");
    }

    const {
        bookmarkedJobItemIds,
        bookmarkedJobItems,
        isLoading,
        handleToggleBookmark,
    } = context;

    return {
        bookmarkedJobItemIds,
        bookmarkedJobItems,
        isLoading,
        handleToggleBookmark
    } as const;
}

export function useOnClickOutside(refs: MutableRefObject<HTMLElement | null>[], handler: () => void) {
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (
                e.target instanceof HTMLElement
                && !refs.some(ref => ref.current?.contains(e.target as HTMLElement))
            ) {
                handler();
            }
        }

        document.addEventListener("click", handle);

        return () => document.removeEventListener("click", handle);
    }, [handler, refs]);
}
