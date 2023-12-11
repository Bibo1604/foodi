import React, { useContext, useState } from 'react'
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signupWithGmail, login } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // react hook form
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password).then((result) => {
            const user = result.user;
            const userInfo = {
                name: data.name,
                email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((response) => {
                alert("Login successful!");
                navigate(from, { replace: true });
            });
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Please provide valid email & password!");
        });
        reset()
    }

    // login with google
    const handleRegister = () => {
        signupWithGmail().then((result) => {
            const user = result.user;
            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
            }
            axiosPublic.post('/users', userInfo).then((response) => {
                alert("Login successful!");
                navigate("/");
            })
        }).catch((error) => console.log(error));
    }

    return (
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className='mb-5'>
                <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='font-bold text-lg'>Login!</h3>

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
                        <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered bg-white" />
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover mt-2">Forgot password?</a>
                        </label>
                    </div>

                    {/* error text */}
                    {errorMessage ? (
                        <p className='text-red text-xs italic'>Please provide a correct username & password!</p>
                    ) : (
                        ""
                    )}

                    {/* login button */}
                    <div className="form-control mt-4">
                        <input type='submit' value='Login' className="btn bg-green text-white border-none" />
                    </div>

                    {/* close btn */}
                    <Link to="/">
                        <div className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>X</div>
                    </Link>

                    <p className='text-center my-2'>Donot have an account?{" "}<Link to="/signup" className='underline text-red ml-1'>Signup Now</Link></p>
                </form>
                {/* social sign in */}
                <div className='text-center space-x-3 mb-5'>
                    <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white border-none">
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
    )
}

export default Login