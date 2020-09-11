 (function () {
    'use strict';
    const submit = $('#submit');

    submit.click(() => {
        const radioButtons = $('input');
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
            const li = document.createElement('li');
            li.innerText = recipe.ingredients[i];
            $('#recipeIngredients').append(li);    
            
        }
    }
}());