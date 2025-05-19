import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ActiveSectionContextProvider from "./context/active-section-context";
import ThemeContextProvider from "./context/theme-context";
import LanguageContextProvider from "./context/language-context";
import DirectionContextProvider from "./context/direction-context";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>
          <DirectionContextProvider>
            <LanguageContextProvider>
              <ActiveSectionContextProvider>
                <Routes>
                  <Route path="/muhhmdss-portfolio" element={<Home />}></Route>
                  <Route path="/imprint" element={<Home />}></Route>
                  <Route path="/privacy" element={<Home />}></Route>
                </Routes>
              </ActiveSectionContextProvider>
            </LanguageContextProvider>
          </DirectionContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
