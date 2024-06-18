import {JobItem} from "../lib/types.ts";
import JobListItem from "./JobListItem.tsx";
import Spinner from "./Spinner.tsx";

export function JobList({
    jobItems,
    isLoading,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
}) {
    return <ul className="job-list">
        {
            isLoading
                ? <Spinner/>
                : jobItems.map((jobItem) => (
                    <JobListItem key={jobItem.id} jobItem={jobItem}/>
                ))
        }
    </ul>;
}

export default JobList;
