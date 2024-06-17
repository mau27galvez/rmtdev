import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {useEffect, useState} from "react";
import {Job} from "../types.ts";
import {BASE_URL} from "./constants.ts";

function App() {
    const [jobItems, setJobItems] = useState<Job[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (!searchText.trim()) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}?search=${searchText}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                setJobItems(data["jobItems"]);
            } catch (error) {
                throw new Error("Failed to fetch data");
            }
        }

        fetchData();
    }, [searchText]);

    return <>
        <Background/>
        <Header setSearchText={setSearchText} searchText={searchText}/>
        <Container jobItems={jobItems}/>
        <Footer/>
    </>;
}

export default App;
