const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('<body>Hello World!<p>52.16.89.14</p> <p>172.217.7.174</p> <h1>205.251.242.103</h1> <p class="change-me">17.172.224.47</p> <h2>sdvvf192.166.3.4</h2></body>'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))