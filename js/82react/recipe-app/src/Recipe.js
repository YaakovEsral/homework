import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';

export default class Recipe extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <>
                <h2>{this.props.name}</h2>
                {/* <RecipeDetails ingredients={this.props.ingredients} /> */}
            </>
        )
    }
}