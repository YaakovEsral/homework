import React from 'react';
import { useState, useEffect } from 'react';
import executeFetch from '../fetch';
import SinglePost from './SinglePost';


export default function PostList() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await executeFetch('http://localhost');
            console.log(data);
            setBlogs(data.map(p => <SinglePost postData={p} key={p._id} />))
        })()
    }, [])

    return (
        <div>
            <link rel="stylesheet" href="/css/posts.css" />
            {blogs}
        </div>
    )
}