import { useJobItemsContext } from "../lib/hooks";

export default function SortingControls() {
    const { setJobItemsActiveSortingCriteria, jobItemsActiveSortingCriteria } = useJobItemsContext();

    return (
        <section className="sorting">
            <i className="fa-solid fa-arrow-down-short-wide"></i>

            <button
                onClick={() => setJobItemsActiveSortingCriteria('relevant')}
                className={`${jobItemsActiveSortingCriteria === 'relevant' ? 'sorting__button--active' : ''}  sorting__button sorting__button--relevant`}
            >
                Relevant
            </button>

            <button
                onClick={() => setJobItemsActiveSortingCriteria('recent')}
                className={`${jobItemsActiveSortingCriteria === 'recent' ? 'sorting__button--active' : ''} sorting__button sorting__button--recent`}
            >
                Recent
            </button>
        </section>
    );
}
