import React from "react"
import useImage from "./hooks/useImage"

const ImageUpload = (props) => {
    const [image, setImage] = useImage(props.onChange);

    const onImageChange = (e) => {
        setImage(URL.createObjectURL(new Blob(e.target.files)))
    }

    return <div>
        <label>Upload Image</label>
        <br />
        <input type="file" accept="image/*" onChange={onImageChange} />
    </div>
}

export default ImageUpload