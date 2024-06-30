import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {useState} from "react";
import {useDebounce, useJobItems} from "../lib/hooks.ts";
import { Toaster } from "react-hot-toast";

function App() {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500);
    const {jobItems, isLoading} = useJobItems(debouncedSearchText);
    const jobItemsSlice = jobItems.slice(0, 7);

    return <>
        <Background/>
        <Header setSearchText={setSearchText} searchText={searchText}/>
        <Container jobItems={jobItemsSlice} isLoading={isLoading}/>
        <Footer/>
        <Toaster position="top-right" />
    </>;
}

export default App;
