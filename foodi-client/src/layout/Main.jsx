import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
    const {loading} = useContext(AuthContext)

    return (
        <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            {loading ?
                <LoadingSpinner/>
            :
                <div>
                    <Navbar/>
                    <div className="min-h-screen min-w-screen">
                        <Outlet/>
                    </div>
                    <Footer/>
                </div>
            }
        </div>
    )
}

export default Main