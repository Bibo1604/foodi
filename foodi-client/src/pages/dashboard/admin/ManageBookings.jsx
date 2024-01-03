import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2'

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/all');
            return res.data;
        },
    })

    const handleConfirm = async (item) => {
        await axiosSecure.patch(`/payments/${item._id}`).then(res => {
            console.log(res.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Order has been confirmed",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        })
    }

    return (
        <div className='section-bg-color'>
            <div className='flex items-center justify-between m-4'>
                <h5>All Orders</h5>
                <h5>Total Orders: {orders.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className='bg-green text-white rounded-lg'>
                            <tr>
                                <th>#</th>
                                <th>Users</th>
                                <th>Transaction ID</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Confirm Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order.email}</td>
                                    <td>{order.transactionId}</td>
                                    <td>${order.price}</td>
                                    <td>{order.status}</td>
                                    <td className='text-center'>
                                        {order.status === 'confirmed' ? "done" : (
                                            <button
                                                className='btn btn-xs bg-green text-white'
                                                onClick={() => handleConfirm(order)}
                                            >
                                                <GiConfirmed />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button className='btn btn-xs bg-red text-white'><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageBookings