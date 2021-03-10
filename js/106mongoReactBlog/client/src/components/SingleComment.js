import React from 'react'

export default function SingleComment({ comment }) {
    return (
        <>
            <div class="comment">
                <p>by {comment.author} on {comment.date}</p>
                <p>{comment.body}</p>
            </div>
            <div class="comment-divider"></div>
        </>
    )
}
