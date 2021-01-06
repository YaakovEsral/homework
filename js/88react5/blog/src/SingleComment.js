import React from 'react'

export default function SingleComment(props) {
    return (
        <div className="single-comment">
            <div>{props.comment.name}</div>
            <div>{props.comment.email}</div>
            <div>{props.comment.body}</div>
            <div className="comment-divider"/>
        </div>
    )
}
