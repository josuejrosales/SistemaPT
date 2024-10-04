
import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProviderContext from "./context/app";
import RootApp from "./components/root-app/root-app";

function App() {

    const container = useRef();

    return (
        <BrowserRouter>
            <AppProviderContext page={container}>
                <div className="container" ref={container}>
                    <Routes>
                        <Route
                            path="/"
                            element={<RootApp SectionUrl={'/getSectionRootHeader'} ItemsUrl={'/getSectionRoot'} />}
                        />

                        <Route
                            path="/select/:id_param"
                            element={<RootApp SectionUrl={'/getContentSectionHeader'} ItemsUrl={`/getContentSection`} />}
                        />
                    </Routes>
                </div>
            </AppProviderContext>
        </BrowserRouter>

    );
}
{/* <a href="/login-close">cerrar session</a> */ }

export default App;