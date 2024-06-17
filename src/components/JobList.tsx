import {Job} from "../types.ts";
import JobListItem from "./JobListItem.tsx";

export function JobList({
    jobItems
}: {
    jobItems: Job[];
}) {
    console.log(jobItems);

    return <ul className="job-list">
        {jobItems.map((jobItem) => (
            <JobListItem key={jobItem.id} jobItem={jobItem}/>
        ))}
    </ul>;
}

export default JobList;
