import React from 'react'
import { FaUtensils } from 'react-icons/fa'
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const AddMenu = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // image hosting key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (hostingImage.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImage.data.data.display_url
            };
            const postMenuItem = axiosSecure.post('/menu', menuItem);

            if (postMenuItem) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your item is inserted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Upload a new <span className='text-green'>Menu Item</span></h2>

            {/* form */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select {...register("category", { required: true })} className="select select-bordered" defaultValue="default">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Description</span>
                        </label>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Tell the worlds about your recipe"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>

                    <button className='btn bg-green text-white px-6'>Add Item <FaUtensils /></button>
                </form>
            </div>
        </div>
    )
}

export default AddMenu