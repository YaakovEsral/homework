import React from 'react'

export default function AddRecipe() {
    return (
        <div>
            <form>
                <div>
                    Name: <input type="text" name="name" />
                </div>
                <div>
                    Ingredients: <input type="text" name="ingredients" />
                </div>
                <div>
                    Directions: <input type="text" name="directions" />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    )
}
