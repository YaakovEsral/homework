import React from 'react'
import { Redirect, useLocation, useHistory } from 'react-router-dom'

export default function PostThumbnail(props) {
    console.log('props', props);
    const {pathname} = useLocation();
    const history = useHistory();
    function handleClick() {
        console.log('clicked');
        history.push(`${pathname}/${props.id}`);
    }
    return (
        <div onClick={() => handleClick()} className="post-thumbnail">
            <p>{props.title}</p>
        </div>
    )
}
