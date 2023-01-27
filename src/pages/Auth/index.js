import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginAction, SignupAction } from './AuthAction';

const Auth = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathName = location.pathname.slice(1);
    const [input, setInput] = useState({ email: '', password: '', cnfpassword: '' })
    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pathName === 'signup')
            props.SignupAction(input);
        else {
            const route = await props.LoginAction(input);
            if(route) navigate(route)
        }
    }

    return (
        <div className=" bg-[#E5E5E5] flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-7 rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{ pathName === "signup" ? "Create your account" : "Sign in to your account" }</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={ handleSubmit }>
                    <input type="hidden" name="remember" value="true" />
                    <div className="space-y-3 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" onChange={ handleInput } autoComplete="email" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" onChange={ handleInput } autoComplete="password" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                        </div>
                        { pathName === 'signup' && <div>
                            <label htmlFor="cnfpassword" className="sr-only">Password</label>
                            <input id="cnfpassword" name="cnfpassword" type="password" onChange={ handleInput } autoComplete="new-password" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password" />
                        </div> }
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>

                        <div className="text-sm">
                            { pathName === "signup" ?
                                <Link to={ '/login' } className="font-medium text-indigo-600 hover:text-indigo-500">SignIn</Link> :
                                <Link to={ '/signup' } className="font-medium text-indigo-600 hover:text-indigo-500">Create Account</Link>
                            }

                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            { pathName === "signup" ? "Register" : "Signin" }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    buttonLoading: state.authReducer.loading
})

const mapDispatchToProps = { LoginAction, SignupAction }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)