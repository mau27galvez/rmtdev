import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {JobItem} from "../lib/types.ts";

export default function Sidebar({
    jobItems,
    isLoading,
    totalJobItemsCount,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    totalPagesCount,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
    totalJobItemsCount: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    currentPage: number;
    totalPagesCount: number;
}) {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ResultsCount count={totalJobItemsCount}/>
                <SortingControls/>
            </div>

            <JobList jobItems={jobItems} isLoading={isLoading}/>
            <PaginationControls
                currentPage={currentPage}
                totalPagesCount={totalPagesCount}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
            />
        </div>
    );
}
