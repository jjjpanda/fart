import React, {useRef} from "react"

import "./css/css.css"

const ImageBox = ({croppedImage, crop, completedCrop, dimensions}) => {
    console.log(dimensions, crop, completedCrop)

    const imageRef = useRef()
    
    return <div id="imgbox">
        <img 
            src={croppedImage} 
            className={"center-fit"} 
            ref={imageRef}
        />
    </div>
}

export default ImageBox