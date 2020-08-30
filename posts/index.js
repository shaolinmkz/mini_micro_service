const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

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

app.post('/posts', async (req, res) => {
    // 4 bytes of random digits which should be hexidecimals
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    const data = {
        id,
        title
    }

    posts[id] = data;

   const EVENT_URL = 'http://localhost:4005/events';
   await axios.post(EVENT_URL, { type: 'PostCreated', data });

    res.status(201).json({
        data
    })
});

app.post('/events', (req, res) => {
  console.log('Event Received: ', req.body.type);

  res.send({ message: 'Event Received => Post Service' });
})

const PORT = 4000;

app.listen(PORT, () => console.log('listening on port: ', PORT));
