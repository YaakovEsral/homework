import './css/style.css';
import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from 'jquery';
import displayUsersPosts from './displayUsersPosts';

async function placeUsers() {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const data = await executeFetch(usersUrl);
    const usersData = data.map(obj => ({ name: obj.name, website: obj.website, company: obj.company, id: obj.id }));
    // console.log(usersData);

    usersData.forEach(user => {
        const elem = document.createElement('div');
        elem.className = 'single-blogger-display';
        $(elem).append(`<p class="sbd-name">${user.name} </p>
        <p class="sbd-website"><a href="https://www.${user.website}" target="_blank">www.${user.website}</a></p>
        <div class="sbd-info">
            <h3>${user.company.name}</h3>
            <p>${user.company.bs}</p>
            <p>"${user.company.catchPhrase}"</p>
        </div>`
        );
        const button = getUserButton(user);
        elem.append(button);

        $('#home-main-content').append(elem);
    });
}

function getUserButton(user) {
    const button = document.createElement('button');
    button.innerText = 'See Blog';
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`;
    button.addEventListener('click', async () => {
        const data = await executeFetch(url);
        $('#home-main-content').empty().hide();
        displayUsersPosts(user, data);
    })
    return button;
}

placeUsers();

function executeFetch(url) {
    return fetch(url)
        .then(r => {
            if (!r.ok) {
                throw new Error(r.status, r.statusText);
            }
            return r.json();
        })
        .then(data => {
            // console.log(data, typeof data);
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}