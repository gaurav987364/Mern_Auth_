import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Navigation from "./pages/Auth/Navigation";
import "react-toastify/dist/ReactToastify.css"
import React from "react"

const App:React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-gradient-to-b from-[#fb7185] via-[#a21caf] to-[#6366f1] w-full h-[calc(100vh-70px)] ">
        <Outlet />
      </main>
    </>
  )
}

export default App;