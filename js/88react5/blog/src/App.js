import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import About from './About';
import BlogSelection from './Blogs';
import SingleBlog from './SingleBlog';
import SinglePost from './SinglePost';

export default function App() {


    return (
        <BrowserRouter>
                <Nav/>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/blogs" exact>
                        <BlogSelection />
                    </Route>
                    <Route path="/blogs/:user/:userId" exact>
                        <SingleBlog />
                    </Route>
                    <Route path="/blogs/:user/:userId/:postId">
                        <SinglePost />
                    </Route>
                </Switch>
        </BrowserRouter>
    );
}