import React from 'react';
// import RecipeDetails from './RecipeDetails';

export default function Recipe(props) {

    return (
        <>
            <h2 onClick={props.handleClick}>{props.name}</h2>
            {/* <RecipeDetails ingredients={this.props.ingredients} /> */}
        </>
    )
}