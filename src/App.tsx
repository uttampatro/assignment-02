import React from 'react';
import './App.css';
import Home from './pages/home';
import Update from './pages/update';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <Switch>
                {/* <Route path="/">
                    <Redirect to={'/'}></Redirect>
                </Route> */}
                <Route path={'/'} component={Home} />
            </Switch>
        </div>
    );
}

export default App;
