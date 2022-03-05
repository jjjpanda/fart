import React, {useRef, useState} from "react"
import Box from './Box'
import SizeSelect from "./SizeSelect"
import useDimensions from "./hooks/useDimensions"

const ImageBox = ({croppedImage, crop, completedCrop, dimensions}) => {
    const [size, setSize] = useDimensions()
    const [boxes, setBoxes] = useState([])
    const [boxNumber, setBoxNumber] = useState(0)
    const [boxOptions, setBoxOptions] = useState(<div></div>)
    console.log(dimensions, crop, completedCrop, size)

    const imageRef = useRef()

    const onLoad = () => {
        setSize({
            width: imageRef.current.width,
            height: imageRef.current.height
        })
    }

    const addBox = () => {
        setBoxes(oldBoxes => ([...oldBoxes, 
            <Box
                defaultDimensions={{width: size.width/10, height: size.height/10, x: 0, y: 0}} 
                onDimChange={(dims, setDims) => renderBoxOptions(boxNumber, dims, setDims)}
            />
        ]))
        setBoxNumber(boxNumber + 1)
    }

    const renderBoxOptions = (id, dims, setDims) => {
        console.log("BOX OPTIONS", id, dims)
        setBoxOptions(<div>
            Box Number: {id+1}
            <br />
            <SizeSelect 
                key={JSON.stringify({dims, id, date: new Date()})}
                defaultDimensions={dims} 
                onChange={setDims} 
                includeCoordinates 
                label="Resize" 
            />
        </div>) 
    }
    
    return <div id="imgbox">
        <img 
            src={croppedImage} 
            id="imgbound"
            className={"center-fit"} 
            ref={imageRef}
            onLoad={onLoad}
        />
        <br />
        <button onClick={addBox}>ADD BOX</button>
        <br />
        {boxes}
        {boxOptions}
    </div>
}

export default ImageBox