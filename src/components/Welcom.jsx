import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Welcom = () => {

    const params = useParams()
    const [user, setUser] = useState('')

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4400/api/v1/getUser/${params.id}`)
            const { data } = response
            if (data.success) {
                const user = data.user
                console.log(user.fullName)
                setUser(user.fullName)
            }
            else {
                toast.error(data.message, { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error(error.message)
            }
            else if (error.response.status === 404) {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            <div className='w-full h-screen flex items-center bg-green-400 justify-center'>
                <ToastContainer />
                <div className='flex flex-col gap-8 bg-white w-[60%] h-[60%] justify-center items-center'>
                    <h1 className='text-[6rem] font-bold text-blue-500' >Welcom {user}</h1>
                    <div className='flex gap-6'>
                        <Link to='/logIn' className='text-3xl border-2 border-gray-400 p-1 rounded-lg bg-blue-200 text-red-500 font-bold' >LogOut</Link>
                        <Link to='/allUsers' className='text-3xl border-2 border-gray-400 p-1 rounded-lg bg-blue-200 text-red-500 font-bold' >All User</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcom
