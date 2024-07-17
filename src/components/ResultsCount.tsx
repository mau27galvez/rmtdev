import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
    const {totalJobItemsCount} = useJobItemsContext();

    return <p className="count"><span className="u-bold">{totalJobItemsCount}</span> results</p>;
}
