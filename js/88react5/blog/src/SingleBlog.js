import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogSelection from './Blogs';
import executeFetch from './fetch';
import PostThumbnail from './PostThumbnail';

export default function SingleBlog(props) {
    // console.log('props', props);
    // console.log('params', useParams());
    const { user, userId } = useParams();
    // console.log(userId);

    const [blog, setBlog] = useState([]);
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    useEffect(() => {
        (async () => {
            const data = await executeFetch(url);
            setBlog(data);
            console.log(data);
            console.log('should be getting blog', blog);

        })();

    }, [])

    const header = blog.length ? <h2>Displaying posts from <span className="capitalize">{user.replace('-', ' ')}</span></h2> : null;

    const blogList = blog.length ? blog.map(b => <PostThumbnail key={b.id} id={b.id} title={b.title} />) : null;
    return (
        <div className="container">
            {header}
            <div className="grid-container">
                {blogList}
            </div>
        </div>
    )
}
