import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItem } from "../lib/types";

type BookmarksContextType = {
    bookmarkedJobItemIds: number[];
    bookmarkedJobItems: JobItem[];
    isLoading: boolean;
    handleToggleBookmark: (jobItemId: number) => void;
} | null;

export const BookmarksContext = createContext<BookmarksContextType>(null);

export default function BookmarksContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [bookmarkedJobItemIds, setBookmarkedJobItemIds] = useLocalStorage<number[]>("bookmarkedJobItemIds", []);
    const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedJobItemIds);

    const handleToggleBookmark = (jobItemId: number) => {
        if (bookmarkedJobItemIds.includes(jobItemId)) {
            setBookmarkedJobItemIds((prev) => prev.filter((id) => id !== jobItemId));
            return;
        }

        setBookmarkedJobItemIds((prev) => [...prev, jobItemId]);
    }

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedJobItemIds,
                bookmarkedJobItems,
                isLoading: isLoading,
                handleToggleBookmark,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
