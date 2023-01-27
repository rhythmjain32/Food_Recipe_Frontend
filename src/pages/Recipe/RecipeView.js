import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FetchRecipeAction } from './RecipeAction'
import { FiEdit2 } from "react-icons/fi";

function Recipe({ FetchRecipeAction, recipeViewData, loading }) {
    const { recipeId } = useParams()
    const navigate = useNavigate()
    const [editable, setEditable] = useState(false);
    useEffect(() => {
        FetchRecipeAction(recipeId)
    }, [])
    useEffect(() => {
        if (!loading && Object.keys(recipeViewData).length !== 0) {
            let userData = JSON.parse(localStorage.getItem("userData"))
            if (userData && userData.userId === recipeViewData.chef) {
                setEditable(true)
            }
        }
    }, [loading, recipeViewData])

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#E5E5E5]'>
            <div className='m-2 bg-white p-10 rounded-md w-2/3 space-y-4'>
                <div className='flex justify-between'>
                    <h1 className=" text-3xl font-extrabold leading-tight text-gray-900  ">{ recipeViewData.title }</h1>
                    { editable && <button onClick={ () => navigate(`/recipe/edit/${recipeId}`) } className='p-2 rounded-md bg-purple-600 hover:bg-purple-500'><FiEdit2 size={ 20 } color='white' /></button> }
                </div>
                <div className=" p-0.5 text-white bg-purple-600 w-1/2"></div>
                <h1 className=" text-2xl font-extrabold leading-tight text-gray-900  ">Ingredients</h1>
                <ul className='ml-4 list-disc'>
                    { recipeViewData.ingredients && recipeViewData.ingredients.map((ingredient, index) => (
                        <li className='text-lg' key={ index }>{ ingredient }</li>
                    )) }
                </ul>
                <div className=" p-0.5 text-white bg-purple-600 w-2/3"></div>
                <h1 className=" text-2xl font-extrabold leading-tight text-gray-900  ">Instructions</h1>
                <p className='text-xl'>
                    { recipeViewData.instructions }
                </p>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    recipeViewData: state.recipeReducer.recipeViewData,
    loading: state.recipeReducer.loading
})

const mapDispatchToProps = { FetchRecipeAction }

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)