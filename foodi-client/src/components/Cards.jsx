import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2'
import useCart from '../hooks/useCart';

const Cards = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);
    const { name, image, price, _id } = item;
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, refetch] = useCart();

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    // add to cart button
    const handleAddToCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
            fetch("http://localhost:6001/carts", {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(cartItem)
            }).then(res => res.json()).then(data => {
                refetch();
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        } else {
            Swal.fire({
                title: "Please login?",
                text: "Without an account, you cannot able to add products!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup Now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', {state:{from: location}});
                }
            });
        }
    }

    return (
        <div className="card bg-slate-100 shadow-xl relative mr-5 md:my-5">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`} onClick={handleHeartClick}>
                <FaHeart className="w-5 h-5 cursor-pointer" />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
                <p>Description of the item</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">
                        <span className="text-sm text-red">$ </span> {item.price}
                    </h5>
                    <button className="btn bg-green text-white border-none" onClick={() => handleAddToCart(item)}>Add to Cart </button>
                </div>
            </div>
        </div>
    )
}

export default Cards