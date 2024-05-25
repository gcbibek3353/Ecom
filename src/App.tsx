import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import { router } from "./router";
import { ThemeProvider } from "@material-tailwind/react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider>
          <ToastContainer />
          <Router>{router}</Router>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
