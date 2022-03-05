import React from "react"
import useCrop from "./hooks/useCrop"

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

const ImageCrop = ({imageUrl, dimensions, onChange}) => {
    const [crop, setCrop, completedCrop, setCompletedCrop, previewCanvasRef, onImageLoad] = useCrop(dimensions);

    console.log(imageUrl, dimensions, crop, completedCrop)

    return <div>
        <button onClick={() => {
            previewCanvasRef.current.toBlob((blob => {
                onChange({
                    croppedImage: URL.createObjectURL(blob), 
                    crop, 
                    completedCrop
                })
            })) }}
        >
            Next
        </button>
        <br />
        {imageUrl ? (
            <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ dimensions.width / dimensions.height }
            >
                <img
                    alt="Crop me"
                    src={imageUrl}
                    style={{ transform: `scale(${1}) rotate(${0}deg)` }}
                    onLoad={onImageLoad}
                />
            </ReactCrop>
        ) : null}
        <div>
            <canvas
                ref={previewCanvasRef}
                style={{
                    width: Math.floor(completedCrop?.width ?? 0),
                    height: Math.floor(completedCrop?.height ?? 0),
                }}
            />
        </div>
    </div>
}

export default ImageCrop