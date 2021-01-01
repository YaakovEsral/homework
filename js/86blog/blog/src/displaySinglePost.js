import $ from 'jquery';



export default function displaySinglePost(user, post, comments) {
    console.log(user, post, comments);
    $('main').append(`
        <h2 id="post-title">${post.title}</h2>
        <h3 id="post-author">By ${user.name}</h3>
        <div id="post-content">
        ${post.body}
        </div>
        
        <button id="toggle-comments-btn">Hide Comments</button>
        <div id="comments">
            <hr id="comments-hr">
            <h3>Comments</h3>
        </div>
    `)


    comments.forEach(comment => {
        $('#comments').append(`
            <div id="single-comment">
                <p id="comment-name">${comment.name}</p>
                <p id="comment-email">${comment.email}</p>
                <p id="comment-body">${comment.body}</p>
                <hr class="single-comment-hr">
            </div>
        `)
    });

    $('#toggle-comments-btn').on('click', () =>{
        $('#comments').toggle();
        // console.log();
        $('#toggle-comments-btn').text( $('#comments').css('display') === 'none' ? 'Show Comments' : 'Hide Comments' );
    })
}