import Sidebar from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";
import {JobItem} from "../lib/types.ts";

export default function Container({
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
    return <div className="container">
        <Sidebar
            jobItems={jobItems}
            totalJobItemsCount={totalJobItemsCount}
            isLoading={isLoading}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            totalPagesCount={totalPagesCount}
        />
        <JobItemContent/>
    </div>;
}
