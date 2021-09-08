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
                    <Redirect to={'/home'}></Redirect>
                </Route> */}
                <Route path={'/home'} component={Home} />
                <Route path={'/updateUser/:id'} component={Update} />
            </Switch>
        </div>
    );
}

export default App;
