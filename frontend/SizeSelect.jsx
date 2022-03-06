import React from "react"
import useDimensions from "./hooks/useDimensions"

const SizeSelect = (props) => {
    const [dimensions, setDimensions, setDimension] = useDimensions(props.defaultDimensions);

    return (
        <div>
            { props.includeCoordinates ? 
                <div>
                    <label>X (inches)</label>
                    <input type="number" value={dimensions.x} onChange={setDimension("x")} min={0} step={0.25}/>
                    <br />
                    <label>Y (inches)</label>
                    <input type="number" value={dimensions.y} onChange={setDimension("y")} min={0} step={0.25}/>
                    <br />
                </div>
            : null }
            <label>Height (inches)</label>
            <input type="number" value={dimensions.height} onChange={setDimension("height")} min={0} step={0.25}/>
            <br />
            <label>Width (inches)</label>
            <input type="number" value={dimensions.width} onChange={setDimension("width")} min={0} step={0.25}/>
            <br />
            <button disabled={(dimensions.width == 0 || dimensions.height == 0)} onClick={() => props.onChange(dimensions)}>
                {props.label ? props.label : "Next"}
            </button>
        </div>
    )
}

export default SizeSelect