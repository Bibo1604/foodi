import React from 'react'
import { Link } from 'react-router-dom'
import {FaGoogle, FaFacebook, FaGithub} from "react-icons/fa";
import { useForm } from "react-hook-form"

const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

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

                        {/* login button */}
                        <div className="form-control mt-6">
                            <input type='submit' value='Login' className="btn bg-green text-white"/>
                        </div>

                        <p className='text-center my-2'>Do not have an account? <Link to="/signup" className='underline text-red ml-1'>Signup Now</Link></p>
                    </form>
                    
                    {/* social sign in */}
                    <div className='text-center space-x-3 mb-5'>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebook />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Modal