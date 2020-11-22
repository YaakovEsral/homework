 (function () {
    'use strict';
    const submit = $('#submit');

    submit.click(() => {
        const radioButtons = $('input');
        console.log(radioButtons);
        let selectedIndex;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedIndex = i;
            }
        }

        fetch('recipes.json')
            .then((r) => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then((recipes) => {
                displayRecipe(recipes[selectedIndex]);
                radioButtons[selectedIndex].checked = false;
            })
                .catch(err => console.log(err));
    });

    function displayRecipe(recipe){
        $('#recipeIngredients').empty();
        $('#recipeName').text(recipe.name);
        $('#recipePic').attr('src', recipe.pic);

        for (let i = 0; i < recipe.ingredients.length; i++) {
            $('#recipeIngredients').append(`<li>${recipe.ingredients[i]}</li>`);    
        }
    }
}());