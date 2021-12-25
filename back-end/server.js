const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())// middleware to extract json from the body of our req
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
})

const port = 8080;


app.get('/influencers', async (req, res) => {
    const influencers = [
        {name: 'Cristiano Ronaldo', img: 'http://'},
        {name: 'Justin Bieber', img: 'http://'},
        {name: 'Ariana Grande', img: 'http://'},
        {name: 'Selena Gomez', img: 'http://'}
    ];
    // todo : GET from db
    res.send(influencers);
})

app.post('/influencers', async (req, res) => {
    console.log(req.body);
    // todo : scrape social media
    // todo : add to db
    res.send('success');
})
app.listen(port, ()=>console.log(`server running on port ${port} !`))