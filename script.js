const express = require('express');
const getDay = require('./services/notion');
const PORT = process.env.PORT || 5000;


const app = express();

app.use(express.static('public')); // set up static folder for front end data using 'middleware'

app.get('/days', async(req, res) => {
    const days = await getDay();
    res.json(days);
})

app.listen(PORT, console.log(`Server started on port ${PORT}`));




/* ;
(async() => {
    const notionDay = await getDay()
    console.log(notionDay)
})() */