import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [bookmarksPopoverIsOpen, setBookmarksPopoverIsOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setBookmarksPopoverIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {bookmarksPopoverIsOpen && <BookmarksPopover />}
    </section>
  );
}
