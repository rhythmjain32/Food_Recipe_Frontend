import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import ProfileReducer from "./Profile";
import RecipeReducer from "./Recipe";

const reducers = combineReducers({
    authReducer: AuthReducer,
    profileReducer: ProfileReducer,
    recipeReducer: RecipeReducer
});

export default reducers;