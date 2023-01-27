import { Types } from "../../Types";

const initialState = {
    loginData: {},
    isLoggedIn: false,
    loading: false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.login:
            return {
                ...state,
                loginData: action.data
            }
        case Types.loading:
            return {
                ...state,
                loading: action.loading
            }
        case Types.isLoggedIn:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }

        default:
            return state;
    }
}

export default AuthReducer;