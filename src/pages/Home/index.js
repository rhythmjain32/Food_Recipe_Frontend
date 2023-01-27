import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FetchAllRecipeAction } from './HomeAction'
import { BsSearch } from "react-icons/bs";
import RecipeCard from '../../Components/RecipeCard';


export const Home = ({ FetchAllRecipeAction, loading, allRecipeData }) => {
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    useEffect(() => {
        FetchAllRecipeAction()
    }, [])
    useEffect(() => {
        searchHandler(searchInput)
    }, [searchInput])

    function searchHandler(value) {
        if (value.length === 0) {
            setSearchData([]);
            return;
        }
        const promise = new Promise((resolve, reject) => {
            let set = new Set();
            allRecipeData.map((item) => {
                
                if(item.title.toLowerCase().includes(value))
                    set.add(item)
                
                item.ingredients.map((ingredient) => {
                    if (ingredient.toLowerCase().includes(value)) {
                        set.add(item)
                    }
                })
            })
            var temp = Array.from(set)
            resolve(temp)
        })
        promise.then((result) => {
            setSearchData(result)
        })
    }
    return (
        <div className='bg-[#E5E5E5] min-h-screen  px-10 py-8 '>
            <form className='md:max-w-xl lg:max-w-2xl mx-auto'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BsSearch color='grey' size={ 20 } />
                    </div>
                    <input type="search" id="default-search" onChange={ (e) => setSearchInput(e.target.value) } className="block w-full p-4 pl-10 text-lg text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none" placeholder="Search for recipes or ingrdients..." required />
                    {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */ }
                </div>
            </form>
            { (searchData.length === 0 && searchInput.length !== 0) &&
                <p className='text-xl font-medium text-[#373F41] text-center mt-3'>No Results Found</p>
            }

            {
                searchData.length > 0 &&
                <>
                    <p className='text-xl font-medium text-[#373F41] text-center mt-3'>Searched Result :</p>
                    <div className='grid md:grid-cols-2 w-full  gap-4'>
                        { searchData.map((recipe) => (
                            <RecipeCard key={ recipe._id } recipeData={ recipe } onClick={ () => { navigate(`/recipe/${recipe._id}`) } } />
                        )) }
                    </div>
                </>
            }

            <div className='grid md:grid-cols-2 w-full  gap-4'>
                { (allRecipeData.length > 0 && searchData.length === 0) &&
                    allRecipeData.map((recipe) => {
                        return (<RecipeCard key={ recipe._id } recipeData={ recipe } onClick={ () => { navigate(`/recipe/${recipe._id}`) } } />)
                    })
                    // <p className='text-2xl font-medium text-[#373F41]'>No Data to show</p> 
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.recipeReducer.loading,
    allRecipeData: state.recipeReducer.allRecipeData
})

const mapDispatchToProps = { FetchAllRecipeAction }

export default connect(mapStateToProps, mapDispatchToProps)(Home)