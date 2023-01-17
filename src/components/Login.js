import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const host = `http://localhost:5000`
    const navigate = useNavigate()
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const [user, setUser] = useState({ email: '', password: '' })
    const login = async (e) => {
        if (formRef.current.checkValidity()) {
            e.preventDefault();
            const result = await axios.post(`${host}/api/auth/login`,
                user
                , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            if (result.data.success) {
                localStorage.setItem("token", result.data.authtoken);
                navigate("/")

            } else {
                console.log("Something went wrong!");
            }
        }
    }
    const formRef = useRef()
    return (
        <form ref={formRef}>
            <div className='max-w-xl mx-auto py-5 px-5 mt-5'>
                <div className="mr-5 ml-5 mb-5">
                    <span className='pl-4 font-extrabold text-4xl'>Login</span>
                    <label className="block p-5">
                        <span className=" block font-semibold text-slate-500">Email</span>
                        <input title='Invalid Email' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' required onChange={onChange} type="text" name='email' value={user.email} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "/>
                    </label>
                    <label className="block pr-5 pl-5 pb-5">
                        <span className=" block font-semibold text-slate-500">Password</span>
                        <input minLength={5} required onChange={onChange} value={user.password} name='password' type="password" className="row- resize-none mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "/>
                    </label>

                    <button onClick={login} className='font-bold mr-5 mb-5 ml-5 rounded-md p-3 text-white bg-blue-600'>Sign In</button>
                </div>
            </div>
        </form>

    )
}

export default Login
