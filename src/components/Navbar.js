import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    let location = useLocation();
    useEffect(() => {
    }, [location])

    const homePath = '/home'
    const aboutPath = '/about'
    const loginPath = '/login'
    const signupPath = '/signup'

    const [showMenu, setShowMenu] = useState(false)
    return (

        <nav className='z-30 bg-blue-100 fixed top-0 right-0 left-0 w-auto'>
            <div div className="max-w-3xl mx-auto py-5 px-5" >
                <div className="flex justify-between">
                    <div className="flex space-x-5">
                        <div className='flex'>
                            <a href='/' className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-blue-400">
                                    <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                                </svg>
                                <span className='font-extrabold text-1xl ml-1'>iNotebook</span>
                            </a>
                        </div>
                        <div className='hidden md:flex items-center space-x-3'>
                            <Link to={homePath} className={`font-semibold ${location.pathname !== homePath ? 'text-slate-500' : ''}`}>Home</Link>
                            <Link to={aboutPath} className={`font-semibold ${location.pathname !== aboutPath ? 'text-slate-500' : ''}`}>About</Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setShowMenu(!showMenu)} className='mobile-menu-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className='hidden md:flex items-center space-x-1'>
                        <Link className='px-2 font-normal hover:font-semibold transiti duration-200' to={loginPath}> Login </Link>
                        <Link className='px-2 font-normal hover:font-semibold transitio duration-200' to={signupPath}> Signup</Link>
                    </div>
                </div>
                <div className={`mobile-menu ${showMenu ? '' : 'hidden'} pt-3 md:hidden`}>
                    <Link to={homePath} className={`font-semibold ${location.pathname !== homePath ? 'text-slate-500' : ''} block py-2 px-1`}>Home</Link>
                    <Link to={aboutPath} className={`font-semibold ${location.pathname !== aboutPath ? 'text-slate-500' : ''} block py-2 px-1`}>About</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
