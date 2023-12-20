import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const VerifyEmail = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const VerifyEmail = async () => {
        const user = await axios.get(`http://localhost:4400/api/v1/verifyMail?token=${token}`)
        console.log(user)
    }

    useEffect( () => {
        VerifyEmail();
    } )

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <h1 className='text-[5rem]' >Email Verified <span className='text-green-600'>Successfully</span></h1>
                    <hr />
                    <p className='text-center text-2xl' >Click here to Redirect to <Link to='/logIn' className='text-blue-700 font-bold' >Login Page</Link></p>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail
