import React, {useRef, useState, useEffect} from "react"
import useCrop from "./hooks/useCrop"
import Box from './Box'
import SizeSelect from "./SizeSelect"
import useDimensions from "./hooks/useDimensions"

const ImageBox = ({croppedImage, crop, completedCrop, dimensions, defaultBoxState}) => {
    const [u, sU, sC, setCompletedCrop, previewCanvasRef, onImageLoad] = useCrop(dimensions);
    const [size, setSize] = useDimensions()
    const [firstLoad, setFirstLoad] = useState(true)
    const [boxes, setBoxes] = useState([])
    const [boxNumber, setBoxNumber] = useState(0)
    const [boxOptions, setBoxOptions] = useState(<div></div>)
    const imageRef = useRef()
    

    console.log(dimensions, crop, completedCrop, size, boxes, boxNumber, boxOptions)

    const saveProject = async () => {
        console.log("SAVE STAGE 1", croppedImage, crop, completedCrop, dimensions, boxes.map(box => box.dimensions))
        const croppedImageBlob =  await fetch(croppedImage).then(r => r.blob());
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const croppedImageText = reader.result;
          console.log("SAVE STAGE 2", croppedImageBlob, croppedImageText)
          const data = {
              croppedImage: croppedImageText,
              crop,
              completedCrop,
              dimensions,
              defaultBoxState: boxes.map(box => box.dimensions)
          }
  
          const element = document.createElement("a")
          const file = new Blob([JSON.stringify(data)], {type: 'application/json'})
          element.href = URL.createObjectURL(file);
          element.download = "project.fart"
          element.click();
        }, false);
      
        if (croppedImageBlob) {
          reader.readAsDataURL(croppedImageBlob);
        }
    }

    const onLoad = (e) => {
        setSize({
            width: imageRef.current.width,
            height: imageRef.current.height
        })
        onImageLoad(e)
    }

    useEffect(() => {
        if(size.width != 0 && size.height != 0 && defaultBoxState && firstLoad){
            setBoxes(defaultBoxState.map((box, index) => ({
                element: <Box
                    key={`${index}-BOX NUMBER-${new Date()}`}
                    defaultDimensions={box} 
                    onDimChange={(dims, setDims) => renderBoxOptions(index, dims, setDims, size)}
                />,
                dimensions: box
            })))
            setBoxNumber(defaultBoxState.length)
            setFirstLoad(false)
        }
    }, [size])

    const addBox = () => {
        setBoxes(oldBoxes => ([...oldBoxes, 
            {
                element: <Box
                    key={`${boxNumber}-BOX NUMBER-${new Date()}`}
                    defaultDimensions={{
                        width: size.width/10, 
                        height: size.height/10, 
                        x: 0, 
                        y: 0
                    }} 
                    onDimChange={(dims, setDims) => renderBoxOptions(boxNumber, dims, setDims, size)}
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

    const renderBoxOptions = (id, dims, setDims, size) => {
        const pixelsToInch = (size.height/dimensions.height + size.width/dimensions.width)/2
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