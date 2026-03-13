import Gallery from "./components/Gallery";
import "./App.css";

export default function App() {
    return (
        <div className="page">
            <header className="header">
                <div>
                    <h1 className="header-title">SOEN 487- A2</h1>
                </div>
            </header>
            <Gallery />
        </div>
    );
}