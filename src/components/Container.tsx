import Sidebar from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";
import {Job} from "../types.ts";

export default function Container({
    jobItems,
}: {
    jobItems: Job[];
}) {
    return <div className="container">
        <Sidebar jobItems={jobItems}/>
        <JobItemContent/>
    </div>;
}
