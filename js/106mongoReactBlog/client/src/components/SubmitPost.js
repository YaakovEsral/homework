import React, { useState } from 'react';
import MessageBox from './MessageBox';
import { useHistory } from 'react-router-dom';

export default function SubmitPost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [messageBoxDisplay, setMessageBoxDisplay] = useState(false);
    const history = useHistory();
    // console.log(form.elements);

    function handleInput(e) {
        console.log(e.target.name);
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value)
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
        const post = {
            title,
            body
        }
        // console.log(post);
        let response = await fetch("http://localhost/submitPost", {
            method: 'POST',
            // mode: 'no-cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .catch(err => {
                console.log(err);
            })

        // console.log(response)
        const json = await response.json();
        // console.log(response.status === 201);
        // console.log(response.status);
        if(response.status === 201) {
            console.log('thanks for your submission, redirecting you ...');
            // setTimeout(() =>history.push('/'), 1000);

        }
    }

    const messageBox = <MessageBox />;

    return (
        <>
            <link rel="stylesheet" href="/css/addPost.css" />
            <form onSubmit={e => handleSubmit(e)}>
                <label>Title:
            <input id="postTitle" name="title" onChange={e => handleInput(e)} />
                </label>
                <label>Body:
            <textarea id="postBody" name="body" onChange={e => handleInput(e)}></textarea>
                </label>
                <button>Add Post</button>
            </form>

            {messageBox}
        </>
    )
}