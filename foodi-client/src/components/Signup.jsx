import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FaGoogle, FaFacebook, FaGithub} from "react-icons/fa";
import { useForm } from "react-hook-form"
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {createUser, login} = useContext(AuthContext);
    // redirect to home page or specific page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password).then((result) => {
            // Signed up 
            const user = result.user;
            alert("Account creation successfully done!");
            document.getElementById('my_modal_5').close();
            navigate(from, {replace: true});
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        })
    };

    return (
        <div className='h-screen bg-white text-black shadow w-full mx-auto flex items-center justify-center py-20'>
            <div className="modal-action mt-0 flex flex-col justify-center">
                <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='font-bold text-lg'>Create An Account!</h3>

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

                    {/* login button */}
                    <div className="form-control mt-6">
                        <input type='submit' value='Signup' className="btn bg-green text-white border-none"/>
                    </div>

                    <p className='text-center my-2'>Have an account?{" "}<button onClick={()=>document.getElementById('my_modal_5').showModal()} className='underline text-red ml-1'>Login</button>{" "}</p>
                    <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>
                
                {/* social sign in */}
                <div className='text-center space-x-3 mb-5'>
                    <button className="btn btn-circle hover:bg-green hover:text-white border-none">
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
            <Modal/>
        </div>
    )
}

export default Signup