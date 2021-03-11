import React from 'react'

export default function SingleComment({ comment }) {
    return (
        <>
            <div className="comment">
                <p>by {comment.author} on {comment.date}</p>
                <p>{comment.body}</p>
            </div>
            <div className="comment-divider"></div>
        </>
    )
}
