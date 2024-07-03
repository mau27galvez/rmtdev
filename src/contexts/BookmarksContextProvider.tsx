import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarksContextType = {
    bookmarkedJobItemIds: number[];
    handleToggleBookmark: (jobItemId: number) => void;
} | null;

export const BookmarksContext = createContext<BookmarksContextType>(null);

export default function BookmarksContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [bookmarkedJobItemIds, setBookmarkedJobItemIds] = useLocalStorage<number[]>("bookmarkedJobItemIds", []);

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
                handleToggleBookmark,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
