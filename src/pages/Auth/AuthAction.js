import { message } from 'antd';
import axios from 'axios';
import { Types } from '../../Types';


export const LoginAction = (input) => async (dispatch) => {
    try {
        dispatch({ type: Types.loading, loading: true })
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            email: input.email,
            password: input.password
        });
        if (res.data) {
            const { userEmail, userId, token, likedBlog } = res.data
            const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
            localStorage.setItem("userData", JSON.stringify({
                email: userEmail,
                userId: userId,
                token: token,
                likedBlog: likedBlog,
                expiration: tokenExpirationDate.toISOString()
            }));
            dispatch({ type: Types.isLoggedIn, isLoggedIn: true })
            message.success({ content: "Login Successful" })
            return '/'
        }
    } catch (error) {
        console.log(error)
        if (error.response.data) {
            message.error({ content: error.response.data.message })
        }
    } finally {
        dispatch({ type: Types.loading, loading: false })
    }
}

export const SignupAction = (input) => async (dispatch) => {
    if (input.password !== input.cnfpassword) {
        message.error({ content: "Password and Confirm Password are not same" });
        return;
    }
    try {
        dispatch({ type: Types.loading, loading: true })
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
            email: input.email,
            password: input.password
        });
        if (res.data) {
            message.success({ content: res.data.message })
        }
    } catch (error) {
        if (error.response.data) {
            message.error({ content: error.response.data.message })
        }
        console.log(error);
    } finally {
        dispatch({ type: Types.loading, loading: false })
    }
}

export const LogoutAction = () => async (dispatch) => {
    try {
        if (localStorage.getItem("userData")) {
            localStorage.removeItem("userData");
            dispatch({ type: Types.isLoggedIn, isLoggedIn: false })
            message.success({ content: "Logout Successfully" })
        }
    } catch (error) {
        console.log(error)
    }
}