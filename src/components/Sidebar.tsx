import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {JobItem} from "../lib/types.ts";

export default function Sidebar({
    jobItems,
    isLoading,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
}) {
    const jobItemsCount = jobItems.length;

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ResultsCount count={jobItemsCount}/>
                <SortingControls/>
            </div>

            <JobList jobItems={jobItems} isLoading={isLoading}/>
            <PaginationControls/>
        </div>
    );
}
