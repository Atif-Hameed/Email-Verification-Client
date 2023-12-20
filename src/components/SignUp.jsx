import React, { useState, CSSProperties } from 'react'
import { useFormik } from 'formik'
import * as YUP from 'yup'
import axios from 'axios'
import '../App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import PulseLoader from "react-spinners/PulseLoader";


const SignUp = () => {

    let [loading, setLoading] = useState(false);
    // const navigate = useNavigate()

    const override = {
        position: 'absolute',
        zIndex: '10',
        top: '27%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPass: ''
    }

    const validationSchema = YUP.object({
        fullName: YUP.string().required('Please enter full name'),
        email: YUP.string().email().required('Please enter valid email'),
        password: YUP.string().min(5).required('Enter password'),
        confirmPass: YUP.string().oneOf([YUP.ref('password')], 'Password must match')
    })

    const { values, errors, handleSubmit, handleChange, resetForm, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true); //show loader when signUp begins
                const response = await axios.post('http://localhost:4400/api/v1/signUp', values)
                const { data } = response
                if (data.success) {
                    toast.success('SignUp Successfully, please verify your email', { position: toast.POSITION.TOP_RIGHT })
                    resetForm()
                }
                else {
                    toast.error(data.message, { position: toast.POSITION.TOP_RIGHT })
                }

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Invalid Cridentals")
                    }
                    else if (error.response.status === 409) {
                        toast.error("Email Already Exist")
                    }
                    else if (error.response.status === 500) {
                        toast.error("Internal Server Error")
                        console.log(error.message)
                    }
                    else {
                        toast.error("An error occured")
                    }
                }
                else if (error.request) {
                    toast.error('No response received from server')
                }
            } finally {
                setLoading(false); // Hide loader after sign-up process completes
                // navigate('/logIn')
            }
        }
    })

    return (
        <>
            <div className='flex justify-center items-center bg-green-400 w-full h-screen'>
                <ToastContainer />
                <div className='w-[45%] h-[90%] bg-gray-200 py-3 px-6 border-2 rounded-3xl'>
                    <h1 className='text-3xl font-bold text-center text-red-600'>Create Account</h1>
                    <form action="" onSubmit={handleSubmit} className='mt-10 flex flex-col gap-2'>

                        {/* Loader  */}
                        <PulseLoader
                            color="#008000"
                            loading={loading}
                            cssOverride={override}
                            size={40}
                            margin={5}
                            speedMultiplier={0.8}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        
                        <div className='flex flex-col relative'>
                            <label htmlFor="fullName" className='text-2xl font-semibold'>Full Name : </label>
                            <input
                                value={values.fullName}
                                onChange={handleChange}
                                type="text" className={`h-12 text-xl px-3 my-2 w-full bg-blue-300 rounded-lg ${errors.fullName && touched.fullName ? 'animate-shake border-2 border-red-600' : ''}`} name="fullName" id="" />
                            {errors.fullName && touched.fullName ? <p className='text-lg text-red-600 absolute bottom-[-1rem] font-semibold left-2'>{errors.fullName}</p> : null}
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="email" className='text-2xl font-semibold'>Email : </label>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                type="email" className={`h-12 text-xl px-3 my-2 w-full bg-blue-300 rounded-lg ${errors.email && touched.email ? 'animate-shake border-2 border-red-600' : ''}`} name="email" id="" />
                            {errors.email && touched.email ? <p className='text-lg text-red-600 absolute bottom-[-1rem] font-semibold left-2'>{errors.email}</p> : null}
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="password" className='text-2xl font-semibold'>Password : </label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                type="password" className={`h-12 text-xl px-3 my-2 w-full bg-blue-300 rounded-lg ${errors.password && touched.password ? 'animate-shake border-2 border-red-600' : ''}`} name="password" id="" />
                            {errors.password && touched.password ? <p className='animate-shake text-lg text-red-600 absolute bottom-[-1rem] font-semibold left-2'>{errors.password}</p> : null}
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="confirmPass" className='text-2xl font-semibold'>Confirm Password : </label>
                            <input
                                value={values.confirmPass}
                                onChange={handleChange}
                                type="password" className={`h-12 text-xl px-3 my-2 w-full bg-blue-300 rounded-lg ${errors.confirmPass && touched.confirmPass ? 'animate-shake border-2 border-red-600' : ''}`} name="confirmPass" id="" />
                            {errors.confirmPass && touched.confirmPass ? <p className='animate-shake text-lg text-red-600 absolute bottom-[-1rem] font-semibold left-2'>{errors.confirmPass}</p> : null}
                        </div>
                        <div className='w-full flex justify-center mt-6'>
                            <button type="submit" className='bg-red-500 text-white rounded-md w-full px-2 py-1 text-lg font-medium'>Submit</button>
                        </div>
                        <div className='mt-4'>
                            <p className='text-lg text-end mr-6'>Already have an account? <Link to='/logIn' className='text-blue-900 font-bold' >logIn</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
