import { ForwardedRef, forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => {
  const {bookmarkedJobItems, isLoading} = useBookmarksContext();

  return createPortal(
        <div>
          <div ref={ref} className="bookmarks-popover">
            <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
          </div>
        </div>,
        document.body
      );
});

export default BookmarksPopover;
