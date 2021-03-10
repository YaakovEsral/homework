import React, { useState } from 'react';


export default function CommentForm({id, setCommentFormShowing}) {

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
 
    function handleInput(e) {
        // console.log(e.target.name);
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                // console.log(title);
                break;
            case 'body':
                setBody(e.target.value)
                // console.log(body);
                break;
            default:
                break;
        }
        // console.log(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('form submitted');
        const comment = {
            name,
            body
        }
        // console.log(post);
        let response = await fetch(`http://localhost/addComment/${id}`, {
            method: 'POST',
            // mode: 'no-cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .catch(err => {
                console.log(err);
            })

        const json  = await response.json();
        console.log('response', response);
        
        if (response.status === 201) {
            console.log('thanks for your comment...');
            // setTimeout(() => history.push('/'), 1000)
        }
    }
    
    
    return (

        <form className="commentForm" method="POST" action="http:localhost/submitComment" onSubmit={e =>handleSubmit(e)}>
            <input name="name" id="commenterName" placeholder="Enter your name..." onChange={e =>handleInput(e)} />
            <textarea name="body" id="commentBody" placeholder="Enter your comment..." onChange={e =>handleInput(e)}></textarea>
            <input name="postId" id="postId" type="hidden" value={id} />
            <button type="button" onClick={() => setCommentFormShowing(false)}>Cancel</button>
            <button type="submit">Submit Comment</button>
        </form>
    )
}
