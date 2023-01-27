import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { FetchRecipeAction, SaveRecipeAction, UpdateRecipeAction, DeleteRecipeAction } from './RecipeAction'

function RecipeAdd({ editable, SaveRecipeAction, FetchRecipeAction, UpdateRecipeAction, DeleteRecipeAction, recipeData }) {
    const navigate = useNavigate()
    const { recipeId } = useParams()
    const [input, setInput] = useState(recipeData);

    useEffect(() => {
        if (editable) init()
    }, [])

    const init = async () => {
        const res = await FetchRecipeAction(recipeId);
        if (res) {
            setInput(res)
        }
    }

    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if (name === "ingredients")
            value = value.split(",")
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editable) {
            await SaveRecipeAction(input);
            setInput({
                title: "",
                ingredients: "",
                instructions: "",
            })
        } else {
            const res = await UpdateRecipeAction(recipeId, input)
            if (res && res.status) navigate(`/recipe/${recipeId}`)
        }
    }

    const handleDelete = async () => {
        const res = await DeleteRecipeAction(recipeId);
        if(res && res.status) navigate('/')
    }

    return (
        <div className=' flex items-center justify-center min-h-screen overflow-y-hidden bg-[#E5E5E5]'>
            <div className='w-full flex justify-center'>

                <form onSubmit={ handleSubmit } className='w-2/3 p-10 rounded-lg  bg-white max-w-4xl'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold'>{ !editable ? 'Add Recipe' : 'Edit Recipe' }</p>
                    </div>

                    <div className="mb-6 mt-5">
                        <label htmlFor="text" className="block mb-2 text-sm text-gray-400">Title</label>
                        <input type="text" name='title' id="title" value={ input.title } onChange={ handleInput } className="shadow-sm w-full px-3 py-1.5 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Recipe Name" required />
                    </div>
                    <div className="mb-6">

                        <label htmlFor="message" className="block mb-2 text-sm text-gray-400">Add Ingredients</label>
                        <textarea name="ingredients" id="ingredients" rows="4" value={ input.ingredients } onChange={ handleInput } className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300" placeholder="Separate ingredients using comma(,)"></textarea>

                    </div>
                    <div className="mb-6">

                        <label htmlFor="message" className="block mb-2 text-sm text-gray-400">Add Instructions</label>
                        <textarea name="instructions" id="instructions" rows="4" value={ input.instructions } onChange={ handleInput } className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 " placeholder="Write your instructions here..."></textarea>

                    </div>
                    <div className='flex justify-center space-x-5'>
                        <button type="submit" className="text-white bg-purple-600 hover:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/3">Post</button>
                        {editable && <button onClick={ handleDelete } className="text-white bg-red-500 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-1/3">Delete</button>}
                    </div>
                </form>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    recipeData: state.recipeReducer.recipeData
})

const mapDispatchToProps = { SaveRecipeAction, FetchRecipeAction, UpdateRecipeAction, DeleteRecipeAction }

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdd)