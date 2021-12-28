const express = require('express');
const bodyParser = require('body-parser');
const scraper = require('./scraper');
const db = require('./db');

const app = express();
app.use(bodyParser.json())// middleware to extract json from the body of our req
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
});

const port = 8080;


app.get('/influencers', async (req, res) => {
    const influencers = await db.getAllInfluencers()
    // todo : GET from db
    res.send(influencers);
})

app.post('/influencers', async (req, res) => {
    console.log(req.body);
    // todo : scrape website
    const data = await scraper.scrapeURL(req.body.inputURL)
    // todo : add to db
    const influencers = await db.insertInfluencer(data, req.body.inputURL)
    res.send(influencers);
    

})
app.listen(port, ()=>console.log(`server running on port ${port} !`))