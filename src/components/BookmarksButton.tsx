import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  const [bookmarksPopoverIsOpen, setBookmarksPopoverIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setBookmarksPopoverIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setBookmarksPopoverIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {bookmarksPopoverIsOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
