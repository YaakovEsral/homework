import $ from 'jquery';
import executeFetch from './fetch';
import displaySinglePost from './displaySinglePost';

export default function displayBlogPost(user, posts) {
    // console.log(user, posts);
    $('main').append(`
        <h2 id="posts-list-header">Displaying posts from ${user.name}</h2>
        <div class="grid-container" id="post-list-container"></div>
    `)
    posts.forEach(post => {
        $(`<h3 class="posts-list-item">${post.title}</h3>
    `).appendTo('#post-list-container').on('click', async () =>{
        $('main').empty();
        const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`;
        const comments = await executeFetch(commentsUrl);
        displaySinglePost(user, post, comments); 
    })
    });
}   


