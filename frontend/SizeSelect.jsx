import React from "react"
import useDimensions from "./hooks/useDimensions"

const SizeSelect = (props) => {
    const [dimensions, setDimensions, setDimension] = useDimensions();

    return (
        <div>
            <label>Height (inches)</label>
            <input type="number" value={dimensions.height} onChange={setDimension("height")} min={0}/>
            <br />
            <label>Width (inches)</label>
            <input type="number" value={dimensions.width} onChange={setDimension("width")} min={0}/>
            <br />
            <button disabled={(dimensions.width == 0 || dimensions.height == 0)} onClick={() => props.onChange(dimensions)}>
                Next
            </button>
        </div>
    )
}

export default SizeSelect