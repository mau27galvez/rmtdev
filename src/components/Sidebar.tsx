import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {JobItem} from "../types.ts";

export default function Sidebar({
    jobItems,
    isLoading,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
}) {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ResultsCount/>
                <SortingControls/>
            </div>

            <JobList jobItems={jobItems} isLoading={isLoading}/>
            <PaginationControls/>
        </div>
    );
}
