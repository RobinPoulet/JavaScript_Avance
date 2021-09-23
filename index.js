const express = require('express')
const app = express()
const port = 3000




app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/hello.html');
})

app.get('/page2', (req, res) => {
    res.sendFile(__dirname + '/html/page2.html');
})

app.get('/page/:id', (req, res) => {
    console.log(req.params.id);
    res.sendFile(__dirname + '/html/page2.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


