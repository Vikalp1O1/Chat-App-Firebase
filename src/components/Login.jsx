import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../store/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'








// import { useState } from 'react';
function Login() {

  const getAccessToken =  localStorage.getItem('userToken');
  // console.log('getAccessToken from Login', getAccessToken);
  if(getAccessToken)  return <Navigate to="/" replace />; // Redirect if user is already logged in
    const {user,login,isLoggedIn,signInWithGoogle} = useAuth();
  const navigate = useNavigate();
    
    const formik = useFormik({
    initialValues: {
      email:'',
      password:''
    },
    validationSchema: Yup.object(
        {
          email: Yup.string().email('Invalid email format').required('Email required'),
          password:Yup.string().min(6,'Password must be of 6 chars').required('Password required')   
        }
    ),
    onSubmit: (values,{resetForm})=>{

        console.log(values);
        login(values);
        resetForm();
        
    }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-white shadow-lg rounded-xl px-10 py-8 w-96">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Chat App</h1>
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Login Form</h2>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-indigo-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-indigo-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2.5 rounded-lg font-medium transition mb-4"
          >
            Login
          </button>

          {/* Google Login */}
          <div className="flex justify-center mb-4">
            <GoogleButton onClick={signInWithGoogle} />
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="text-indigo-500 hover:underline">Signup</a>
          </p>
        </div>
      </form>
    </div>
  )
}


export default Login