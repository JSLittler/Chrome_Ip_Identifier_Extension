const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World! <p>192.168.44.1</p> <h1>192.168.1.1</h1> 192.168.1.26 <h2>sdvvf192.166.3.4</h2>'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))