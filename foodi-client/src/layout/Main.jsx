import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <Navbar/>
            <div className="min-h-screen min-w-screen">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default Main