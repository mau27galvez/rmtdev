import {createContext} from "react";
import {useActiveJobItemId} from "../lib/hooks";

type ActiveJobItemIdContextType = {
    activeJobItemId: number | null;
} | null;

export const ActiveJobItemIdContext = createContext<ActiveJobItemIdContextType>(null);

export default function ActiveJobItemIdContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const activeJobItemId = useActiveJobItemId();

    return (
        <ActiveJobItemIdContext.Provider value={{activeJobItemId}}>
            {children}
        </ActiveJobItemIdContext.Provider>
    );
}
