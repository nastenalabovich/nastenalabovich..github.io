import React, { Suspense } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Poets from "./components/Poets";

const Loader = () => (
    <div>
        Loading
    </div>
);

function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/poets/:id?" component={Poets} />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;