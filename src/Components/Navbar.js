import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogoutAction } from '../pages/Auth/AuthAction';
import { connect, useDispatch } from 'react-redux';
import { Types } from '../Types';

const Navbar = ({ isLoggedIn, LogoutAction }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        if (localStorage.getItem('userData'))
            dispatch({ type: Types.isLoggedIn, isLoggedIn: true })
    }

    return (

        <nav className="bg-white border border-gray-300 px-2 sm:px-4 py-2.5 ">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="https://flowbite.com/" className="flex items-center">
                    <span className="self-center text-3xl font-semibold whitespace-nowrap text-[#373F41]">Recipes</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium md:border-0 md:bg-white ">
                        <li>
                            <Link to={ "/" } className="block py-2 pl-3 pr-4 hover:text-[#373F41] rounded md:border-0 md:p-0 text-gray-500">Home</Link>
                        </li>
                        { isLoggedIn &&
                            <li>
                                <Link to={ "/recipe/add" } className="block py-2 pl-3 pr-4 hover:text-[#373F41] rounded md:border-0 md:p-0 text-gray-500">Add Recipe</Link>
                            </li>
                        }
                        <li>
                            { isLoggedIn ?
                                <Link to={ "/" } onClick={ LogoutAction } className="block py-2 pl-3 pr-4 hover:text-[#373F41] rounded md:border-0 md:p-0 text-gray-500">Logout</Link> :
                                <Link to={ "/login" } className="block py-2 pl-3 pr-4 hover:text-[#373F41] rounded md:border-0 md:p-0 text-gray-500">Login</Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}


const mapStateToProps = (state) => ({
    isLoggedIn: state.authReducer.isLoggedIn
})

const mapDispatchToProps = { LogoutAction }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)