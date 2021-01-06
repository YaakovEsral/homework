import React, { useState, useEffect } from 'react';
import BlogThumbnail from './BlogThumbnail';
import executeFetch from './fetch';

export default function BlogSelection() {
    const url = 'https://jsonplaceholder.typicode.com/users';

    const [blogs, setBlogs] = useState();

    useEffect(() =>{
        (async () => {
            console.log('inside useEffect');
            const data = await executeFetch(url);
            // console.log(data);
            // setBlogs(data);
            // console.log('blogs', blogs);
            setBlogs( data.map(i => <BlogThumbnail key={i.id} blog={i} path={i.name.toLowerCase().replace(' ', '-')}/>) );
            
        })();
    }, []);
    
    if(blogs) {
        // blogs
        // students.map(student => <Student student={student} />);
        console.log('should be jsx now', blogs);
        console.log('inside if');
    }

    // const [type, setType] = useState('dog');
    // const [num, setNum] = useState(9);

    // useEffect(() =>{
    //     console.log('render');
    // }, [num])

    return (
        <div className="container">
            <h2>Blogs</h2>
            <div className="grid-container" id="blog-thumbnails-div">
                {blogs}
                {/* <button onClick={() =>setType('dog')}>Dog</button>
                <button onClick={() =>setType('cat')}>Cat</button>
                {type}
                <button onClick={() =>setNum(Math.random() * 50)}>New number</button>
                {num} */}
            </div>
        </div>
    )
}