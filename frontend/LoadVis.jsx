import React, {useState} from "react"
import ImageBox from "./ImageBox";
import ProjectLoad from "./ProjectLoad";

const LoadVis = () => {
    const [stage, setStage] = useState(0);
    const [data, setData] = useState(null)
    switch(stage){
        case 0:
            return <ProjectLoad onChange={(e) => {
                setData(e);
                setStage(1);
            }}/>
        case 1:
            return <ImageBox 
                croppedImage={data.croppedImage} 
                crop={data.crop} 
                completedCrop={data.completedCrop}
                dimensions={data.dimensions}
                defaultBoxState={data.defaultBoxState}
            />
        default: 
            return <div>
                error
            </div>
    }
}

export default LoadVis