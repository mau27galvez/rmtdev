import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
  const [bookmarksPopoverIsOpen, setBookmarksPopoverIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement
        && !buttonRef.current?.contains(e.target)
        && !popoverRef.current?.contains(e.target)
      ) {
        setBookmarksPopoverIsOpen(false);
      }
    }

    document.addEventListener("click", handle);

    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);

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
