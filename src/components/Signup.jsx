import  {  useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { useNavigate } from 'react-router-dom';
import useAuth from '../store/authContext';
import GoogleButton from 'react-google-button'
import { Navigate } from 'react-router-dom';


function Signup() {

    // const navigate = useNavigate();
   const {user,signUp,signInWithGoogle}= useAuth();

    const getAccessToken =  localStorage.getItem('userToken');

    if(getAccessToken) return <Navigate to='/' replace />;
    

    const formik = useFormik({
        initialValues: {
          email:'',
          name:'',
          password:''
        },
        validationSchema: Yup.object(
            {
              name:Yup.string().min(3,'Name must be of 3 chars').required('Name Required'),
              email: Yup.string().email('Invalid email format').required('Email required'),
              password:Yup.string().min(6,'Password must be of 6 chars').required('Password required')   
            }
        ),
        onSubmit: (values,{resetForm})=>{
            console.log(values);
            signUp(values);
            resetForm();

        }
        });

        console.log(user, "user in signup");
        


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-white shadow-lg rounded-xl px-10 py-8 w-96">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Chat App</h1>
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Signup Form</h2>

           <div className="mb-4">
            
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-indigo-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="mb-6">
            
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

          {/* Signup Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2.5 rounded-lg font-medium transition mb-4"
          >
            Signup
          </button>

          {/* Google Button */}
          <div className="flex justify-center mb-4">
            <GoogleButton onClick={signInWithGoogle} />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-500 hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
    
  )
}

export default Signup