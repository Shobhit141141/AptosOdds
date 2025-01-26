import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import AuthDetails from "./pages/authDetails";
import WalletConnectBtn from "./components/WalletConnectBtn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <WalletConnectBtn />
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListingPage />} />
          <Route path="/auth/details" element={<AuthDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
