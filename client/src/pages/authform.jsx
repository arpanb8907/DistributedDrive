import React, { useState } from "react";
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'; 

import {
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const AuthForm = ({setIsLoggedIn}) => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_API_BASE_URL;


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isLogin){
      // make a post req to login end-point
      

      try {
        const response = await axios.post(`${API_BASE_URL}/api/login`,formData)

        if(response.status === 200){
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('userName', formData.email)
          setIsLoggedIn(true)
          
          navigate('/dashboard')
         
          console.log(`${formData.email} logged in`);
        }

        else if(response.status === 401){
          alert(`Incorrect Credentials`)
        }

        else if(response.status === 404){
          alert(`User not found ... please register`)
        }

        else if(response.status === 400){
          alert(`Email or Password required`)
        }

        else{
          alert(`Server error ... please try after sometimes`)
        }
      } catch (error) {
        console.log(error);
      }
      
    }

    else{
      // make a post req to register end-point
      

      try {
        const response = await axios.post(`${API_BASE_URL}/api/register`,formData);

        if(response.status===200){
          console.log("user registered")
          navigate('/auth')
        }


        else if(response.status === 409){

          alert(`${formData.email} is already registered ... please login`)
        }

        else if(response.status === 400){
          alert(`Password must contain atleast one uppercase one lowercase and one special character and a number`)
        }

        else{
          alert(`Server error ... please try after sometime`)
        }
      } catch (error) {
        console.error(error);
      }

    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        {isLogin ? "Login to Your Account" : "Create a New Account"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none transition"
            />
          </div>
        )}
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none transition"
          />
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-700 focus:outline-none cursor-pointer"
            tabIndex={-1} // prevents focus on tab navigation for better UX
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl shadow hover:shadow-lg transition duration-200 hover:from-indigo-600 hover:to-purple-700 font-semibold cursor-pointer"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-indigo-600 font-semibold hover:underline focus:outline-none cursor-pointer"
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
