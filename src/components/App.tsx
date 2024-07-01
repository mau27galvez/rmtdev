import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {useState} from "react";
import {useDebounce, useJobItems} from "../lib/hooks.ts";
import { Toaster } from "react-hot-toast";

function App() {
    const PAGE_SIZE = 7;
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500);
    const {jobItems, isLoading} = useJobItems(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const jobItemsSlice = jobItems.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE);
    const totalPagesCount = Math.ceil(jobItems.length / PAGE_SIZE);

    const handleNextPage = () => {
        const optimisticNextPage = currentPage + 1;
        if (jobItems.slice(optimisticNextPage * PAGE_SIZE - PAGE_SIZE, optimisticNextPage * PAGE_SIZE).length === 0) return;

        setCurrentPage((prev) => prev + 1);
    }

    const handlePreviousPage = () => {
        if (currentPage === 1) return;

        setCurrentPage((prev) => prev - 1);
    }

    return <>
        <Background/>
        <Header setSearchText={setSearchText} searchText={searchText}/>
        <Container
            jobItems={jobItemsSlice}
            isLoading={isLoading}
            totalJobItemsCount={jobItems.length}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            totalPagesCount={totalPagesCount}
        />
        <Footer/>
        <Toaster position="top-right" />
    </>;
}

export default App;
