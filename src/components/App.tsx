import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {useEffect, useState} from "react";
import {JobItem} from "../types.ts";
import {BASE_URL} from "./constants.ts";

function App() {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!searchText.trim()) return;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}?search=${searchText}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                setJobItems(data["jobItems"] as JobItem[]);
            } catch (error) {
                throw new Error("Failed to fetch data");
            }

            setIsLoading(false);
        }

        fetchData();
    }, [searchText]);

    return <>
        <Background/>
        <Header setSearchText={setSearchText} searchText={searchText}/>
        <Container jobItems={jobItems} isLoading={isLoading}/>
        <Footer/>
    </>;
}

export default App;
