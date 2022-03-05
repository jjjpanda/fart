const express = require('express')
const app = express()

const path = require("path") 

app.use('/', express.static(path.join(__dirname, "../dist"), {
    index: "app.html"
}))

const port = 3000
app.listen(port, () => {
  console.log(`fart on port ${port}`)
})