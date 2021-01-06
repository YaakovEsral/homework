import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import executeFetch from './fetch';
import SingleComment from './SingleComment';

export default function SinglePost() {
    const { userId, postId } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [commentsShowing, setCommentsShowing] = useState(true);

    const postUrl = `https://jsonplaceholder.typicode.com/posts?id=${postId}`;
    const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    useEffect(() => {
        (async () => {
            const postData = await executeFetch(postUrl);
            setPost(postData[0]);
            const commentsData = await executeFetch(commentsUrl);
            console.log('comments', commentsData);
            // setComments(commentsData);
            setComments(commentsData.map(c => <SingleComment comment={c} />))
        })();

    }, [])

    function toggleComments() {
        setCommentsShowing(!commentsShowing);
    }

    const showHideText = commentsShowing ? 'Hide Comments' : 'Show Comments';

    const postDisplay = post ?
        <div className="container">
            <h2 className="capitalize">{post.title}</h2>
            <div>{post.body}</div>
            <div className="divider-line" />
            <button onClick={toggleComments}>{showHideText}</button>
        </div>
        : null;

    return (
        <div className="single-post">
            {postDisplay}
            <div className="all-comments">
                {commentsShowing ? comments : null}
            </div>
        </div>
    )
}
