import React, {useState, useEffect} from "react"

const useImage = (onChange) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if(onChange && image){
            onChange(image)
        }
    }, [image])

    return [image, setImage]
}

export default useImage