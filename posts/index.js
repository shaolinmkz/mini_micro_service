const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// enable cors
app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

const posts = {};

app.get('/posts', (req, res) => {
    res.status(200).json({
        data: posts
    })
});

app.post('/posts', (req, res) => {
    // 4 bytes of random digits which should be hexidecimals
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    const data = {
        id,
        title
    }

    posts[id] = data

    res.status(201).json({
        data
    })
});

const PORT = 4000;

app.listen(PORT, () => console.log('listening on port: ', PORT));
