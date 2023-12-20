import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Please Enter your email'),
        password: Yup.string().min(5).required('Please enter your password')
    })

    const { values, errors, handleSubmit, handleChange, resetForm, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4400/api/v1/logIn', values)
                const { data } = response
                if (data.success) {
                    toast.success(data.message, { position: toast.POSITION.TOP_RIGHT })
                    resetForm()
                    // console.log('user : ', data.user)
                    navigate(`/welcom/${data.user._id}`)
                }
                else {
                    toast.error(data.message, { position: toast.POSITION.TOP_RIGHT })
                }
            } catch (error) {

                //ERROR HANDLING
                if(error.response){
                    if(error.response.status === 404){
                        toast.error('User Not Found')
                    }
                    else if(error.response.status === 401){
                        toast.error('Invalid Email or Password')
                    }
                    else if(error.response.status === 300){
                        toast.error('Email Adress not verified, Please Verify your Email')
                    }
                    else if(error.response.status === 500){
                        toast.error('Internal server error')
                    }
                    else{
                        toast.error("An error occured")
                    }
                }
                else if(error.request){
                    toast.error('No response received from server')
                } 
            } 
        }
    })

    return (
        <>
            <div className='flex justify-center items-center bg-green-400 w-full h-screen'>
                <ToastContainer />
                <div className='w-[45%] h-[90%] bg-gray-200 py-3 px-6 border-2 rounded-3xl'>
                    <h1 className='text-3xl font-bold text-center text-red-600'>Create Account</h1>
                    <form action="" onSubmit={handleSubmit} className='mt-10 flex flex-col gap-4'>

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

                        <div className='w-full flex justify-center mt-6'>
                            <button type="submit" className='bg-red-500 text-white rounded-md w-full px-2 py-1 text-lg font-medium'>Submit</button>
                        </div>

                        <div className='mt-4'>
                            <p className='text-lg text-end mr-6'>Don't have an account? <Link to='/signUp' className='text-blue-900 font-bold' >SignUp</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
