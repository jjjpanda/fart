import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoadVis from "./LoadVis";
import NewVis from "./NewVis";

const Vis = () => {
    const navigate = useNavigate();
    const location = useLocation()

    switch(location.search){
        case "?load":
            return <LoadVis />
        case "?new":
            return <NewVis />
        default: 
            return <div>
                <button onClick={() => navigate("/?load")}>load</button>
                <button onClick={() => navigate("/?new")}>new</button>
            </div>
    }
}

export default Vis