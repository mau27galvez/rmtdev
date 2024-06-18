import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {useState} from "react";
import {useJobItems} from "../lib/hooks.ts";

function App() {
    const [searchText, setSearchText] = useState("");
    const [jobItemsSlice, isLoading] = useJobItems(searchText);

    return <>
        <Background/>
        <Header setSearchText={setSearchText} searchText={searchText}/>
        <Container jobItems={jobItemsSlice} isLoading={isLoading}/>
        <Footer/>
    </>;
}

export default App;
