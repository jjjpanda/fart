import React, {useState} from "react"

const useDimensions = () => {
    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0
    })

    const onChangeOf = (type) => (e) => {
        const {value} = e.target
        console.log(type, value)
        setDimensions((oldDim) => ({
            ...oldDim,
            [type]: parseInt(value)
        }))
    }

    return [dimensions, setDimensions, onChangeOf]
}

export default useDimensions