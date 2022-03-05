import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom';
import Vis from "./Vis";

const App = () => {
    return <Router>
        <Vis />
    </Router>
}

ReactDOM.render(<App />,
	document.getElementById("root"),
)