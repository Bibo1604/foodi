import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaUser, FaShoppingBag, FaPlusCircle, FaEdit, FaRegUser, FaShoppingCart, FaLocationArrow, FaQuestionCircle } from "react-icons/fa";
import logo from "/logo.png"
import Login from "../components/Login"
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li className='mt-3'><Link to="/"><MdDashboard /> Home</Link></li>
        <li><Link to="/menu"><FaShoppingCart /> Menu</Link></li>
        <li><Link to="/menu"><FaLocationArrow /> Orders Tracking</Link></li>
        <li><Link to="/menu"><FaQuestionCircle /> Customer Support</Link></li>
    </>
)

const DashboardLayout = () => {
    const { loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    console.log(isAdmin);
    // const isAdmin = true;
    return (
        <div>
            {isAdmin ?
                <div className='section-bg-color'>
                    <div className="drawer sm:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                            {/* Page content here */}
                            <div className='flex items-center justify-between mx-4'>
                                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboardCustomize /></label>
                                <button className='btn flex items-center gap-2 border-none rounded-full px-6 bg-green text-white sm:hidden'><FaRegUser /> Logout</button>
                            </div>
                            <div className='mt-5 md:mt-2 mx-4'>
                                <Outlet />
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-slate-100 text-black">
                                {/* Sidebar content here */}
                                <li><Link to="/dashboard" className='flex justify-start mb-3'>
                                    <img src={logo} alt='' className='w-20' />
                                    <div className="badge badge-primary">admin</div>
                                </Link></li>
                                <hr />
                                <li className='mt-3'><Link to="/dashboard"><MdDashboard /> Dashboard</Link></li>
                                <li><Link to="/dashboard"><FaShoppingBag /> Manage Bookings</Link></li>
                                <li><Link to="/dashboard/add-menu"><FaPlusCircle /> Add Menu</Link></li>
                                <li><Link to="/dashboard/manage-items"><FaEdit /> Manage Items</Link></li>
                                <li className='mb-3'><Link to="/dashboard/users"><FaUser /> All Users</Link></li>

                                <hr />
                                {/* shared nav link */}
                                {sharedLinks}
                            </ul>

                        </div>
                    </div>
                </div>
                :
                <Login />
            }
        </div>
    )
}

export default DashboardLayout