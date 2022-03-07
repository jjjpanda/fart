import React, {useRef, useState} from "react"
import useCrop from "./hooks/useCrop"
import Box from './Box'
import SizeSelect from "./SizeSelect"
import useDimensions from "./hooks/useDimensions"

const ImageBox = ({croppedImage, crop, completedCrop, dimensions, defaultBoxState}) => {
    const [u, sU, sC, setCompletedCrop, previewCanvasRef, onImageLoad] = useCrop(dimensions);
    const [size, setSize] = useDimensions()
    const [boxes, setBoxes] = useState(defaultBoxState ? defaultBoxState : [])
    const [boxNumber, setBoxNumber] = useState(0)
    const [boxOptions, setBoxOptions] = useState(<div></div>)

    const saveProject = () => {
        console.log(croppedImage, crop, completedCrop, dimensions, boxes.map(box => box.dimensions))
    }

    console.log(dimensions, crop, completedCrop, size)
    const pixelsToInch = (size.height/dimensions.height + size.width/dimensions.width)/2

    const imageRef = useRef()

    const onLoad = (e) => {
        setSize({
            width: imageRef.current.width,
            height: imageRef.current.height
        })
        onImageLoad(e)
    }

    const addBox = () => {
        setBoxes(oldBoxes => ([...oldBoxes, 
            {
                element: <Box
                    defaultDimensions={{
                        width: size.width/10, 
                        height: size.height/10, 
                        x: 0, 
                        y: 0
                    }} 
                    onDimChange={(dims, setDims) => renderBoxOptions(boxNumber, dims, setDims)}
                />,
                dimensions: {
                    width: size.width/10, 
                    height: size.height/10, 
                    x: 0, 
                    y: 0
                }
            }
        ]))
        setBoxNumber(boxNumber + 1)
    }

    const renderBoxOptions = (id, dims, setDims) => {
        console.log("BOX OPTIONS", id, dims, size, dimensions, size.height/dimensions.height, size.width/dimensions.width, pixelsToInch)
        setBoxes(oldBoxes => {
            oldBoxes[id].dimensions = dims
            return oldBoxes
        })
        setCompletedCrop(dims)
        setBoxOptions(<div>
            Box Number: {id+1}
            <br />
            <SizeSelect 
                key={JSON.stringify({dims, id, date: new Date()})}
                defaultDimensions={{
                    x: dims.x/pixelsToInch, 
                    y: dims.y/pixelsToInch, 
                    width: dims.width/pixelsToInch, 
                    height: dims.height/pixelsToInch
                }} 
                onChange={(newDims) => setDims({
                    x: Math.min(newDims.x*pixelsToInch, size.width - newDims.width*pixelsToInch), 
                    y: Math.min(newDims.y*pixelsToInch, size.height - newDims.height*pixelsToInch), 
                    width: Math.min(newDims.width*pixelsToInch, size.width - Math.min(newDims.x*pixelsToInch, size.width - newDims.width*pixelsToInch)), 
                    height: Math.min(newDims.height*pixelsToInch, size.height - Math.min(newDims.y*pixelsToInch, size.height - newDims.height*pixelsToInch))
                })} 
                includeCoordinates 
                label="Resize" 
            />
        </div>) 
    }
    
    return <div id="imgbox">
       
        <img 
            key={`${new Date()}-IMAGE BOX-SOURCE IMAGE`}
            src={croppedImage} 
            id="imgbound"
            ref={imageRef}
            onLoad={onLoad}
        />
        
        <div>{dimensions.width} in x {dimensions.height} in</div>
        <br />
        <button onClick={addBox}>ADD BOX</button>
        <br />
        {boxes.map(box => box.element)}
        {boxOptions}

        <br />
            <button onClick={saveProject}>SAVE PROJECT</button>
        <br />

        <canvas
            key={`${new Date()}-IMAGE BOX-BOUND IMAGE`}
            ref={previewCanvasRef}
        />
    </div>
}

export default ImageBox