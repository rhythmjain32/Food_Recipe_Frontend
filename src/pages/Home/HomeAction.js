import { message } from "antd";
import axios from "axios";

export const FetchAllRecipeAction = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true })
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/recipe/get-all`);
        if (res) {
            dispatch({ type: 'ALL_RECIPE_DATA', payload: res.data.payload })
            // return (res.data.payload)
        }
    } catch (error) {
        console.log(error)
        if (error.response.data) {
            message.error({ content: error.response.data.message })
        }
    } finally {
        dispatch({ type: 'LOADING', payload: false })
    }
}