import React, { useState} from 'react';
import CommentsDisplay from './CommentsDisplay';
import CommentForm from './CommentForm';

export default function SinglePost({postData}) {
    const [commentFormShowing, setCommentFormShowing] = useState(false);
    

    const commentForm = commentFormShowing ? <CommentForm setCommentFormShowing={setCommentFormShowing} id={postData._id} /> : null;

    
    return (
        <div>
            <h1>{postData.title}</h1>
            <h2><span>by {postData.author}</span> <span>{postData.date}</span></h2>
            <main>{postData.body}</main>

            <button className="showCommentFormBtn" onClick={() => setCommentFormShowing(true)}>Add Comment</button>
            {commentForm}
            <CommentsDisplay comments={postData.comments} />
            

        </div>
    )
}