import React, {useState} from "react"

const ProjectLoad = (props) => {
    const onUpload = (e) => {
        var reader = new FileReader();

        reader.onload = (event) => {
            let parsed
            try{
                parsed = JSON.parse(event.target.result)
            }
            catch(err){
                console.log(err)
                alert("AN ERROR OCCURED")
                window.location.reload()
            }

            console.log("PRE URL", parsed)
            fetch(parsed.croppedImage)
                .then(res => res.blob())
                .then(blob => {
                    parsed.croppedImage = URL.createObjectURL(blob)
                    console.log("POST URL", parsed)
                    props.onChange(parsed)
                })
        }
    
        reader.readAsText(e.target.files[0]);
    }

    return <div>
        <label>Upload Project File</label>
        <br />
        <input type="file" accept=".fart" onChange={onUpload} />
    </div>
}

export default ProjectLoad