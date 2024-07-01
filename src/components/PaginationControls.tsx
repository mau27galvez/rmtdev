import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationControls({
  currentPage,
  totalPagesCount,
  onNextPage,
  onPreviousPage,
}: {
  currentPage: number;
  totalPagesCount: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) {
  console.log(currentPage);
  console.log(totalPagesCount);
  return <section className="pagination">
    {
      currentPage === 1
      ? <div className="pagination__spacer"></div>
      : <button className="pagination__button" onClick={(e) => {
          onPreviousPage();
          e.currentTarget.blur();
        }}>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </button>
    }

    {
      currentPage < totalPagesCount && <button className="pagination__button" onClick={(e) => {
        onNextPage();
        e.currentTarget.blur();
      }}>
        Page {currentPage + 1} <ArrowRightIcon />
      </button>
    }
  </section>;
}
