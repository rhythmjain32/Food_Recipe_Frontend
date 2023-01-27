import React from 'react'
import { useLocation } from 'react-router-dom';
import RecipeAdd from './RecipeAdd';
import Recipe from './RecipeView';

function Index() {
    let location = useLocation();
    var path = location.pathname.slice(8)
    if (path.includes('edit')) {
        path = 'edit';
    }

    switch (path) {
        case 'add':
            return <RecipeAdd editable={false}/>
        case 'edit':
            return <RecipeAdd editable={true}/>
        default:
            return <Recipe />
    }
}

export default Index