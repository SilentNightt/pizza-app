import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

export const AppContext = React.createContext("");
function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="App">
      <div className="wrapper">
        <AppContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
