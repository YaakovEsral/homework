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

const showCommentFormBtns = Array.from(document.querySelectorAll('.showCommentFormBtn'));
const commentForms = Array.from(document.querySelectorAll('.commentForm'));

for (let i = 0; i < showCommentFormBtns.length; i++) {
    showCommentFormBtns[i].addEventListener('click', () =>{
        show(commentForms[i]);
    })
}

for (let i = 0; i < commentForms.length; i++) {
    commentForms[i].addEventListener('submit', async e =>{
        e.preventDefault();
        const comment = {
            name: get('commenterName').value,
            body: get('commentBody').value,
            postId: get('postId').value
        }
        e.target.reset();
        const response = await fetch('/submitComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
    })
}