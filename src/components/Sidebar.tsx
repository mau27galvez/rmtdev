import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {Job} from "../types.ts";

export default function Sidebar({
    jobItems,
}: {
    jobItems: Job[];
}) {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ResultsCount/>
                <SortingControls/>
            </div>

            <JobList jobItems={jobItems}/>
            <PaginationControls/>
        </div>
    );
}
