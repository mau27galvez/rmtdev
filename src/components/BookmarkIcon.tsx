import { BookmarkFilledIcon } from "@radix-ui/react-icons";

export default function BookmarkIcon({
  isBookmarked,
  onToggleBookmark,
}: {
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  return (
    <button className="bookmark-btn" onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleBookmark();
    }}>
      <BookmarkFilledIcon className={`${isBookmarked ? 'filled' : ''}`} />
    </button>
  );
}
