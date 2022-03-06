export const cropPreview = ( image, canvas, crop ) => {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  console.log("CROP PREVIEW", image, canvas, crop)

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio || 1

  canvas.width = Math.floor(crop.width * pixelRatio * scaleX)
  canvas.height = Math.floor(crop.height * pixelRatio * scaleY)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const cropWidth = crop.width * scaleX
  const cropHeight = crop.height * scaleY

  ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
}
