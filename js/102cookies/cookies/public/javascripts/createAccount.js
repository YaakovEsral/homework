'use strict';

function get(id) {
    return document.getElementById(id);
}

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

const createAccountBtn = get('createAccountBtn');
const modalOverlay = document.querySelector('.modalOverlay');
const createAccountForm = get('createAccountForm');
const exit = get('x-icon');

createAccountBtn.addEventListener('click', () => show(modalOverlay));

exit.addEventListener('click', () => hide(modalOverlay));

createAccountForm.addEventListener('submit', async e => {
    console.log('form submitted');
    e.preventDefault();
    const inputs = createAccountForm.elements;
    const userInfo = {};

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].name) {
            userInfo[inputs[i].name] = inputs[i].value;
        }
    }

    console.log(userInfo);


    try {
        const res = await fetch('/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`${error} ${res.status} ${res.statusCode}`)
        }

        if (get('createAccountValidationMsg')) {
            get('createAccountValidationMsg').remove();
        }
        
        const info = await res.json();
        console.log(info);
        if (info.validationError && info.html) {
            return get('createAccountSubmitBtn').insertAdjacentHTML('beforebegin', info.html)
        }

        // at this point we are assuming that the account was successfully created 
        get('createAccountSubmitBtn').insertAdjacentHTML('beforebegin', info.html);

        setTimeout(() =>hide(modalOverlay), 1000);
    }
    catch (err) {
        console.error(err);
    }
})