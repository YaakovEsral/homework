import React from 'react';

export default function RecipeDetails(props) {
    console.log(props);
    return (
        <>
            {/* <h3>{props.details.ingredients}</h3> */}
            <h3>{props.details.ingredients.map((item, index) => <span ykey={index}>{`${item}, `}</span>)}</h3>
            <h3>{props.details.instructions}</h3>
        </>
    )
}