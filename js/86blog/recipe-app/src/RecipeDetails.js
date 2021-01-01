import React from 'react';

export default function RecipeDetails(props) {
    return (
        <>
            {/* <h3>{props.details.ingredients}</h3> */}
            <h3>{props.details.ingredients.map((item, index) => <span key={index}>{`${item}, `}</span>)}</h3>
            <h3>{props.details.instructions}</h3>
        </>
    )
}