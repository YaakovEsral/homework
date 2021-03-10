import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';



export default function CommentsDisplay({ comments }) {

    comments = comments && comments.length ? comments.map((c, i) => <SingleComment key={i} comment={c} />) : null

    return (
        <>
            {comments}
        </>
    )
}
