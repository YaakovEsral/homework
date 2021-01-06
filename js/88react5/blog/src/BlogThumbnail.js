import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogThumbnail(props) {
    return (
        <div className="blog-thumbnail">
            <h3>{props.blog.name}</h3>
            <p><a href={`www.${props.blog.website}`}>{props.blog.website}</a></p>
            <p>{props.blog.company.name}</p>
            <p>{props.blog.company.catchPhrase}</p>
            <Link to={`/blogs/${props.path}/${props.blog.id}`}>See Blog</Link>
        </div>
    )
}
