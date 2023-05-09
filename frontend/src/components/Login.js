import {React} from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../context/AuthContext';

const Login = () => {
  const {loginUser} = useContext(AuthContext)
  return (
    <div className="container grid place-items-center">

      <div className=" bg-purple-400  min-w-md w-1/3 mt-10 px-16 py-2 ">
      <h3 className="text-black text-center text-3xl font-semibold mb-3">
          Login Page
        </h3>

        <form className="" id="login-form" onSubmit={loginUser}>
          <div className=" grid grid-cols-2 pt-3">
            <div className=" flex flex-col text-black text-lg mb-2">
              <label htmlFor="email" className=" mb-2">
                Email
              </label>
              <label htmlFor="password" className=" mb-2">
                Password
              </label>

            </div>
            <div className=" flex flex-col text-black text-lg mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mb-2 px-1"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mb-2 px-1"
              />
            </div>
          </div>
          <div className="grid place-content-center mb-3">
            <button
              type="submit"
              className=" bg-purple-700 rounded-full py-3 px-8  text-white text-xl uppercase font-semibold hover:bg-purple-900"
            >
              Login 
            </button>
          </div>
            <p>Don't have an account? <Link to={'/signup'} className="text-blue-700 underline font-bold">Sign Up</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Login
