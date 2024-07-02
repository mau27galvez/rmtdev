import {JobItemsSortingCriteria} from "../lib/types";

export default function SortingControls({
    setJobItemsSorting,
    jobItemsActiveSortingCriteria
}: {
    setJobItemsSorting: (criteria: JobItemsSortingCriteria) => void,
    jobItemsActiveSortingCriteria: JobItemsSortingCriteria
}) {
    return (
        <section className="sorting">
            <i className="fa-solid fa-arrow-down-short-wide"></i>

            <button
                onClick={() => setJobItemsSorting('relevant')}
                className={`${jobItemsActiveSortingCriteria === 'relevant' ? 'sorting__button--active' : ''}  sorting__button sorting__button--relevant`}
            >
                Relevant
            </button>

            <button
                onClick={() => setJobItemsSorting('recent')}
                className={`${jobItemsActiveSortingCriteria === 'recent' ? 'sorting__button--active' : ''} sorting__button sorting__button--recent`}
            >
                Recent
            </button>
        </section>
    );
}
