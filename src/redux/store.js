import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducer";


const loadDevTools = () =>
    process.env.NODE_ENV === 'development' && (typeof window !== "undefined" && window.devToolsExtension)
        ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f;

const initialState = {}
const middleware = [thunk]

export const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), loadDevTools())
)
