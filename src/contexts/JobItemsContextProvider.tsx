import { createContext, useCallback, useMemo, useState } from "react";
import {useSearchJobItems, useSearchTextContext } from "../lib/hooks";
import { PAGE_SIZE } from "../lib/constants";
import { JobItem, JobItemsSortingCriteria } from "../lib/types";

type JobItemsContextType = {
    jobItems: JobItem[];
    totalJobItemsCount: number;
    isLoading: boolean;
    currentPage: number;
    jobItemsSlice: JobItem[];
    totalPagesCount: number;
    jobItemsActiveSortingCriteria: JobItemsSortingCriteria;
    setJobItemsActiveSortingCriteria: (criteria: JobItemsSortingCriteria) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
} | null;

export const JobItemsContext = createContext<JobItemsContextType>(null);

export default function JobItemsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        debouncedSearchText,
    } = useSearchTextContext();

    const {jobItems, isLoading} = useSearchJobItems(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobItemsActiveSortingCriteria, setJobItemsActiveSortingCriteria] = useState<JobItemsSortingCriteria>("relevant");
    useMemo(() => {
        jobItems.sort((a, b) => {
            if (jobItemsActiveSortingCriteria === "relevant") {
                return b.relevanceScore - a.relevanceScore;
            }

            return b.daysAgo - a.daysAgo;
        });
    }, [jobItemsActiveSortingCriteria, jobItems]);

    const jobItemsSlice = jobItems.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE);
    const totalPagesCount = Math.ceil(jobItems.length / PAGE_SIZE);

    const handleNextPage = useCallback(() => {
        const optimisticNextPage = currentPage + 1;
        if (jobItems.slice(optimisticNextPage * PAGE_SIZE - PAGE_SIZE, optimisticNextPage * PAGE_SIZE).length === 0) return;

        setCurrentPage((prev) => prev + 1);
    }, [currentPage, jobItems]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage === 1) return;

        setCurrentPage((prev) => prev - 1);
    }, [currentPage]);

    const contextValue = useMemo(() => ({
        jobItems,
        totalJobItemsCount: jobItems.length,
        isLoading,
        currentPage,
        jobItemsSlice,
        totalPagesCount,
        jobItemsActiveSortingCriteria,
        setJobItemsActiveSortingCriteria,
        handleNextPage,
        handlePreviousPage,
    }), [
        currentPage,
        handleNextPage,
        handlePreviousPage,
        isLoading,
        jobItems,
        jobItemsActiveSortingCriteria,
        jobItemsSlice,
        totalPagesCount
    ]);

    return <JobItemsContext.Provider value={contextValue}>
        {children}
    </JobItemsContext.Provider>;
}
