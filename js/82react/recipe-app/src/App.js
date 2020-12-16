// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [
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
            ],

        };
        this.state.currentRecipe = this.state.recipes[0];
        // console.log(this.state);
    }

    render() {
        return (
            <>
                <div id="recipeNamesDiv">
                    {this.state.recipes.map((recipe, index) => <Recipe name={recipe.name} key={index} />)}
                </div>
                <div id="recipeDetailsDiv">
                    <RecipeDetails details={this.state.currentRecipe.details} />
                </div>
            </>
        );
    }
}

export default App;
