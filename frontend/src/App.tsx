// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App

// import { useEffect, useState } from "react";
//
// export default function App() {
//     const [msg, setMsg] = useState("...");
//
//     useEffect(() => {
//         fetch("http://localhost:3001/test")
//             .then((res) => res.json())
//             .then((data) => setMsg(data.message))
//             .catch(() => setMsg("Failed to reach backend"));
//     }, []);
//
//     return <h1>{msg}</h1>;
// }

import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import { useState } from "react";
import "./App.css";

export default function App() {
    const [refresh, setRefresh] = useState(0);

    // return (
    //     <div className="container">
    //         <h1>Photo Album</h1>
    //
    //         <UploadForm onUpload={() => setRefresh(refresh + 1)} />
    //
    //         <Gallery key={refresh} />
    //     </div>
    // );

    return (
        <div className="page">
            <header className="hero">
                <div>
                    <p className="year">2026</p>
                    <h1 className="hero-title">PHOTO ALBUM</h1>
                </div>

                <div className="hero-side">
                    <h2>Upload</h2>
                    <p>Store, view, and delete your uploaded photos.</p>
                    <UploadForm onUpload={() => setRefresh((r) => r + 1)} />
                </div>
            </header>

            <section className="section-heading">
                <h2>Gallery</h2>
            </section>

            <Gallery key={refresh} />
        </div>
    );
}