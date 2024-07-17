import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import { useJobItemsContext } from "../lib/hooks.ts";

export default function Sidebar() {
    const {jobItemsSlice, isLoading} = useJobItemsContext();

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ResultsCount/>
                <SortingControls/>
            </div>

            <JobList jobItems={jobItemsSlice} isLoading={isLoading} />

            <PaginationControls/>
        </div>
    );
}
