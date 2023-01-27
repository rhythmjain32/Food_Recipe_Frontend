import React from 'react'

function RecipeCard(props) {
    const { title, ingredients, instructions } = props.recipeData;

    return (
        <div onClick={ props.onClick } className='p-4 mt-5 w-full max-w-2xl rounded-lg shadow-lg bg-white'>
            <h1 className='text-2xl font-medium text-gray-900 capitalize pb-2 border-b-[1px] border-gray-400'>{ title }</h1>
            <p className='font-bold text-gray-800 text-md mt-2 capitalize'>ingredients : </p>
            <p className='text-gray-600 pl-3 mt-1 truncate w-2/3 leading-relaxed'>{ ingredients }</p>
            <p className='font-bold text-gray-800 text-md mt-2 capitalize'>instructions :</p>
            <p className='text-gray-600  pl-3 mt-1 truncate'>{ instructions }</p>

        </div>
    )
}

export default RecipeCard