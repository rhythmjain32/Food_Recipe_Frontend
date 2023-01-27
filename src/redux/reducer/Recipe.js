
const initialState = {
    loading: false,
    recipeData: {
        title: "",
        ingredients: "",
        instructions: "",
    },
    allRecipeData: [],
    recipeViewData: {}

}

const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'RECIPE_DATA':
            return {
                ...state,
                recipeData: action.payload
            }
        case 'ALL_RECIPE_DATA':
            return {
                ...state,
                allRecipeData: action.payload
            }
        case 'RECIPE_VIEW_DATA':
            return {
                ...state,
                recipeViewData: action.payload
            }

        default:
            return state;
    }
}

export default RecipeReducer;