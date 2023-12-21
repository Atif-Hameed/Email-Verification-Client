import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function AllUser() {

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4400/api/v1/allUser', {
                headers: {
                    // 'Authorization': `Bearer ${yourTokenVariable}`
                }
            })
            const { data } = response
            if (data.success) {
                console.log(data.users)
                setUsers(data.users)
            }
            else {
                toast.info("No users Found")
            }
        } catch (error) {
            console.log(error)
            if (error.response.status === 500) {
                toast.error(error.message)
            }
            else if (error.response.status === 404) {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <>
            <div className='w-full h-screen flex items-center bg-green-400 justify-center'>
                <ToastContainer />
                <div className='flex flex-col gap-8 bg-white w-[60%] h-[80%] '>
                    <h1 className='text-[2rem] font-bold text-blue-500 text-center' >All user</h1>

                    <div className='flex divide-x-2 w-full border-2 border-green-500 justify-evenly  divide-green-500'>
                        <i className='text-center w-64 bg-red-300'>No.</i>
                        <i className='text-center w-full bg-red-300'>Name</i>
                        <i className='text-center w-full bg-red-300'>Email</i>
                        <i className='text-center w-full bg-red-300'>Verified</i>
                    </div>
                    {
                        users.map((item, index) => {
                            return <div key={index} className='flex divide-x-2 w-full border-2 border-green-500 justify-evenly  divide-green-500' >
                                <i className='text-center w-64 bg-red-300'>{index + 1}</i>
                                <i className='text-center w-full bg-red-300'>{item.fullName}</i>
                                <i className='text-center w-full bg-red-300'>{item.email}</i>
                                <i className='text-center w-full bg-red-300'>{item.isVerify}</i>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default AllUser
