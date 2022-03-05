import React, {useState, useCallback, useEffect, useRef} from "react"

import { centerCrop, makeAspectCrop } from 'react-image-crop';
import { cropPreview } from '../lib/cropPreview'

const useCrop = (dimensions) => {
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [crop, setCrop] = useState({})
    const [completedCrop, setCompletedCrop] = useState({})

    const onImageLoad = (e) => {
        imgRef.current = e.currentTarget
        const { width, height } = e.currentTarget

        const crop = centerCrop(
        makeAspectCrop(
                { unit: '%', width: 90 },
                dimensions ? dimensions.width / dimensions.height: 16/9,
                width,
                height,
            ),
            width,
            height,
        )

        setCrop(crop)
    }

    const updateCropPreview = useCallback(() => {
        if (completedCrop && previewCanvasRef.current && imgRef.current) {
            cropPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, 0)
        }
    }, [completedCrop, 1, 0])

    useEffect(() => {
        updateCropPreview()
    }, [updateCropPreview])

    return [crop, setCrop, completedCrop, setCompletedCrop, previewCanvasRef, onImageLoad]
}

export default useCrop