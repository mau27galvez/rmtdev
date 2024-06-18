import Sidebar from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";
import {JobItem} from "../lib/types.ts";

export default function Container({
    jobItems,
    isLoading,
}: {
    jobItems: JobItem[];
    isLoading: boolean;
}) {
    return <div className="container">
        <Sidebar jobItems={jobItems} isLoading={isLoading}/>
        <JobItemContent/>
    </div>;
}
