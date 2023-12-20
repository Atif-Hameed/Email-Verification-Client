import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='w-full h-screen flex items-center bg-green-400 justify-center'>
                <div className='flex flex-col gap-8 bg-white w-[60%] h-[60%] justify-center items-center'>
                    <h1 className='text-[7rem] font-bold text-blue-500' >HOME PAGE</h1>
                    <div className='flex gap-6'>
                        <Link to='/signUp' className='text-3xl border-2 border-gray-400 p-1 rounded-lg bg-blue-200 text-red-500 font-bold' >SignUp</Link>
                        <Link to='/logIn' className='text-3xl border-2 border-gray-400 p-1 rounded-lg bg-blue-200 text-red-500 font-bold' >LogIn</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
