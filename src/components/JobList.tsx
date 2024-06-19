import {JobItem} from "../lib/types.ts";
import JobListItem from "./JobListItem.tsx";
import Spinner from "./Spinner.tsx";
import {useActiveJobItemId} from "../lib/hooks.ts";

export function JobList({
    jobItems,
    isLoading,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
}) {
    const activeJobId = useActiveJobItemId();

    return <ul className="job-list">
        {
            isLoading
                ? <Spinner/>
                : jobItems.map((jobItem) => (
                    <JobListItem key={jobItem.id} jobItem={jobItem} isActive={activeJobId === jobItem.id}/>
                ))
        }
    </ul>;
}

export default JobList;
