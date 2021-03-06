import React, {useEffect} from "react"
import useDimensions from "./hooks/useDimensions"
import {Rnd} from 'react-rnd';

const Box = ({defaultDimensions, onDimChange}) => {
    const [dimensions, setDimensions] = useDimensions(defaultDimensions)
   
    console.log("BOX", dimensions)

    useEffect(() => {
        onDimChange(dimensions, setDimensions)
    }, [dimensions])

    return <Rnd
        key={`${new Date()}-${JSON.stringify(dimensions)}-RESIZABLE-BOX`}
        default={{
            x: dimensions.x,
            y: dimensions.y,
            width: dimensions.width,
            height: dimensions.height,
        }}
        minWidth={10}
        minHeight={10}
        bounds="#imgbound"
        style={{border: "medium dashed white"}}
        onDragStop={(e,d) => {
            //console.log("DRAG", e, d)
            console.log("DRAG", d.x, d.y)
            setDimensions((dims) => ({
                ...dims,
                x: d.x,
                y: d.y
            }))
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
            //console.log("RESIZE", e, direction, ref, delta, position)
            console.log("RESIZE", dimensions.width + delta.width, dimensions.height + delta.height)
            setDimensions((dims) => ({
                ...dims,
                width: dimensions.width + delta.width,
                height: dimensions.height + delta.height
            }))
        }}
    >
        <div style={{width: "100%", height: "100%"}} onClick={() => onDimChange(dimensions, setDimensions)}  />
    </Rnd>
}

export default Box