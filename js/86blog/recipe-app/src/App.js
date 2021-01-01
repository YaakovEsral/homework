// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';

function App() {

    const [recipes] = useState([
        {
            name: 'Pretzel Shnitzel',
            details: {
                ingredients: ['Chicken cutlets', 'pretzels', 'flour', 'eggs', 'maple syrup'],
                instructions: 'Grind pretzels in food processor. Mix eggs with maple syrup. Dip chicken cutlets into flour, egg mixture and pretzels and deep fry in two inches of oil'
            }
        },
        {
            name: 'Hamburger Roll',
            details: {
                ingredients: ['Ground beef', 'puff pastry dough', 'onions', 'barbeque sauce', 'spices'],
                instructions: 'Spread ground beef onto pp dough. Saute onions and place on top. Add BBQ sauce and spices. Bake for 40 min.'
            }
        }
    ]);
    const [currentRecipe, setCurrentRecipe] = useState(recipes[0]);


    return (
        <>
            <div id="recipeNamesDiv">
                <h2>Here are some recipes:</h2>
                {recipes.map((recipe, index) => <Recipe name={recipe.name} key={index} handleClick={() => setCurrentRecipe(recipe)}/>)}
            </div>
            <div id="recipeDetailsDiv">
                <RecipeDetails details={currentRecipe.details} />
            </div>
        </>
    );
}


export default App;