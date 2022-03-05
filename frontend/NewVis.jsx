import React, {useState} from "react"
import useCrop from "./hooks/useCrop";
import useDimensions from "./hooks/useDimensions";
import useImage from "./hooks/useImage";
import ImageBox from "./ImageBox";
import ImageCrop from "./ImageCrop";
import ImageUpload from "./ImageUpload";
import SizeSelect from "./SizeSelect"

const NewVis = () => {
    const [stage, setStage] = useState(0);

    const [dimensions, setDimensions] = useDimensions();
    const [image, setImage] = useImage()
    const [crop, setCrop, completedCrop, setCompletedCrop] = useCrop();
    const [croppedImage, setCroppedImage] = useImage()

    switch(stage){
        case 0:
            return <SizeSelect onChange={(e) => {
                setDimensions(e);
                setStage(1);
            }}/>
        case 1:
            return <ImageUpload onChange={(e) => {
                setImage(e);
                setStage(2);
            }} />
        case 2:
            return <ImageCrop imageUrl={image} dimensions={dimensions} onChange={(e) => {
                setCroppedImage(e.croppedImage)
                setCrop(e.crop)
                setCompletedCrop(e.completedCrop)
                setStage(3)
            }}/>
        case 3:
            return <ImageBox 
                croppedImage={croppedImage} 
                crop={crop} 
                completedCrop={completedCrop}
                dimensions={dimensions}
            />
        default: 
            return <div>
                error
            </div>
    }

    return 
}

export default NewVis