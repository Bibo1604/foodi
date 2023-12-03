import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FaGoogle, FaFacebook, FaGithub} from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/AuthProvider';

const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {signupWithGmail, login} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    // redirect to home page or specific page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password).then((result) => {
            const user = result.user;
            alert("Login successful!");
            document.getElementById('my_modal_5').close();
            navigate(from, {replace: true});
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Provide a correct email and password!");
        })
    };

    // Google signin
    const handleLogin = () => {
        signupWithGmail().then((result) => {
            const user = result.user;
            alert("Login successful!");
            document.getElementById('my_modal_5').close();
            navigate(from, {replace: true});
        }).carch((error) => console.log(error))
    }

    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box bg-white text-black">
                <div className="modal-action mt-0 flex flex-col justify-center">
                    <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='font-bold text-lg'>Please Login!</h3>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered bg-white" />
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password")} placeholder="password" className="input input-bordered bg-white" />
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* error text */}
                        {errorMessage ? <p className='text-red text-xs italic'>{errorMessage}</p> : ""}

                        {/* login button */}
                        <div className="form-control mt-4">
                            <input type='submit' value='Login' className="btn bg-green text-white border-none"/>
                        </div>

                        <p className='text-center my-2'>Do not have an account?{" "}<Link to="/signup" className='underline text-red ml-1'>Signup Now</Link>{" "}</p>

                        <button htmlFor="my_modal_5" onClick={()=>document.getElementById('my_modal_5').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    {/* social sign in */}
                    <div className='text-center space-x-3 mb-5'>
                        <button className="btn btn-circle hover:bg-green hover:text-white border-none" onClick={handleLogin}>
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white border-none">
                            <FaFacebook />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white border-none">
                            <FaGithub />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Modal