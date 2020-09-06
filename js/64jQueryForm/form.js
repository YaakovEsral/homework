(function () {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    const form = get('form');
    const nameInput = get('name');
    const addressInput = get('address');

    const nameOutput = get('infoName');
    const addressOutput = get('infoAddress');

    const infoDiv = get('info');
    infoDiv.style.display = 'none';

    form.onsubmit = function (e) {
        e.preventDefault();
        if (get('checkbox').checked) {
            infoDiv.style.display = 'inline-block';

            nameOutput.innerHTML += nameInput.value;
            addressOutput.innerHTML += addressInput.value;

        }
    };
}());