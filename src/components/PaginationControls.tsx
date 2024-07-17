import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const { currentPage, totalPagesCount, handleNextPage, handlePreviousPage } = useJobItemsContext();

  return <section className="pagination">
    {
      currentPage === 1
      ? <div className="pagination__spacer"></div>
      : <button className="pagination__button" onClick={(e) => {
          handlePreviousPage();
          e.currentTarget.blur();
        }}>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </button>
    }

    {
      currentPage < totalPagesCount && <button className="pagination__button" onClick={(e) => {
        handleNextPage();
        e.currentTarget.blur();
      }}>
        Page {currentPage + 1} <ArrowRightIcon />
      </button>
    }
  </section>;
}
