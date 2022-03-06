import React, {useState} from "react"

const useDimensions = (defaultDimensions) => {
    const [dimensions, setDimensions] = useState(defaultDimensions ? defaultDimensions : {
        height: 0,
        width: 0,
        x: 0,
        y: 0
    })

    const onChangeOf = (type) => (e) => {
        const {value} = e.target
        console.log(type, value)
        setDimensions((oldDim) => ({
            ...oldDim,
            [type]: parseFloat(value)
        }))
    }

    return [dimensions, setDimensions, onChangeOf]
}

export default useDimensions