const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

// enable cors
app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const { body: event } = req;
    events.push(event);

    const URLS = [
      'http://posts-clusterip-srv:4000/events', // Post service
      'http://comments-clusterip-srv:4002/events', // Comment service
      'http://query-clusterip-srv:4003/events', // Query service
      'http://moderation-clusterip-srv:4004/events', // Moderation service
    ];

    URLS.forEach(async (url) => {
      await axios.post(url, event)
      .then(({ data: { message } }) => console.log(message))
      .catch(err => console.error(err.message));
    })

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.status(200).json({ data: events });
});

const PORT = 4005;

app.listen(PORT, () => console.log('v1 listening on port: ', PORT));
