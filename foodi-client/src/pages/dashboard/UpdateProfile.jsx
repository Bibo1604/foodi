import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // redirect to home page or specific page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name, photoURL).then(() => {
            navigate(from, {replace: true});
        }).catch((error) => {
            //...
        });
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-100 text-black">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='font-bold'>Update Your Profile</h3>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register("name")} type="text" placeholder="name" className="input input-bordered bg-white" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Photo</span>
                    </label>
                    <input {...register("photoURL")} type="text" placeholder="photoURL" className="input input-bordered bg-white" required />
                    {/* <input type="file" className="file-input w-full max-w-xs" /> */}
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn bg-green text-white border-none">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile