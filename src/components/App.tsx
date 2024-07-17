import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Container from "./Container.tsx";
import {Toaster} from "react-hot-toast";

function App() {
    return <>
        <Background/>
        <Header/>
        <Container/>
        <Footer/>
        <Toaster position="top-right"/>
    </>;
}

export default App;
