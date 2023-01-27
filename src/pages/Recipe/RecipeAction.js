import { message } from "antd";
import axios from "axios";

export const SaveRecipeAction = (inputData) => async (dispatch) => {
    try {
        let userData = JSON.parse(localStorage.getItem("userData"))
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/recipe/add`, inputData, {
            headers: { 'Authorization': `Bearer ${userData.token}` }
        })
        if(res.data.status){
            message.success({content: res.data.message})
        }else {
            message.error({content: res.data.message})
        }
    } catch (error) {
        console.log(error, ":error")
    }
}

export const FetchRecipeAction = (recipeId) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING', payload: true})
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/recipe/get/${recipeId}`)
        if(res.data.status){
            message.success({content: res.data.message})
            dispatch({type: 'RECIPE_VIEW_DATA', payload: res.data.payload})
            return res.data.payload
        }else {
            message.error({content: res.data.message})
        }
    } catch (error) {
        console.log(error, ":error")
    } finally {
        dispatch({type: 'LOADING', payload: false})
    }
}

export const UpdateRecipeAction = (recipeId, inputData) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING', payload: true})
        let userData = JSON.parse(localStorage.getItem("userData"))
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/recipe/edit/${recipeId}`, inputData, {
            headers: { 'Authorization': `Bearer ${userData.token}` }
        })
        if(res.data.status){
            message.success({content: res.data.message})
            return res.data
        }else {
            message.error({content: res.data.message})
        }
    } catch (error) {
        console.log(error, ":error")
    } finally {
        dispatch({type: 'LOADING', payload: false})
    }
}

export const DeleteRecipeAction = (recipeId) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING', payload: true})
        let userData = JSON.parse(localStorage.getItem("userData"))
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/recipe/delete/${recipeId}`, {
            headers: { 'Authorization': `Bearer ${userData.token}` }
        })
        if(res.data.status){
            message.success({content: res.data.message})
            return res.data
        }else {
            message.error({content: res.data.message})
        }
    } catch (error) {
        console.log(error, ":error")
    } finally {
        dispatch({type: 'LOADING', payload: false})
    }
}