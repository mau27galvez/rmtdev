import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextType = {
    searchText: string;
    setSearchText: (text: string) => void;
    debouncedSearchText: string;
} | null;

export const SearchTextContext = createContext<SearchTextContextType>(null);

export default function SearchTextContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500);
    const handleSetSearchText = (text: string) => setSearchText(text);


    return <SearchTextContext.Provider value={{
        searchText,
        setSearchText: handleSetSearchText,
        debouncedSearchText,
    }}>
        {children}
    </SearchTextContext.Provider>;
}
