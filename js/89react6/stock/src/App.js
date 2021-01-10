import './App.css';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import FullDetails from './FullDetails';
import Watchlist from './Watchlist';
import About from './About';

export default function App() {


    return (
        <BrowserRouter>
            <div id="main-container">
                <div id="nav-bar">
                    <Nav />
                </div>
                <div id="main-content">
                    <Switch>
                        <Route path="/" exact>
                            <FullDetails />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/watch">
                            <Watchlist />
                        </Route>
                        {/* <Redirect from="/" to="/about" exact /> */}
                    </Switch>
                </div>
            </div>
        </BrowserRouter>

    );
}