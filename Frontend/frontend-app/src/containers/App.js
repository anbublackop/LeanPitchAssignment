
import React from 'react'
import '../App.css';
import Courses from '../components/Courses';
import Modules from '../components/Modules';
import Topics from '../components/Topics';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Courses />
                    </Route>
                    <Route path="/module">
                        <Modules />
                    </Route>
                    <Route path="/topic">
                        <Topics />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;