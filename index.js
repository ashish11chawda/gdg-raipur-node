const express = require('express');
const _ = require('lodash');

const app = express();
app.use(express.json());

let quotes = [
    {
        id: "1",
        quote: "I'm not a great programmer; I'm just a good programmer with great habits.",
        author: "Kent Beck"
    },
    {
        id: "2",
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    }
];

app.get('/api/quotes/', (req, res) => {
    res.send(_.sortBy(quotes, 'id'));
});

app.get('/api/quotes/:id', (req, res) => {
    let id = req.params.id;
    let quote = quotes.find(quote => quote.id === id);
    if (quote) {
        res.send(quote);
    } else {
        res.status(404).send("Quote not found");
    }
});

app.post('/api/quotes/', (req, res) => {
    let quote = {
        id: (quotes.length + 1).toString(),
        author : req.body.author,
        quote : req.body.quote
    }
    quotes.push(quote);
    res.send(quote);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})