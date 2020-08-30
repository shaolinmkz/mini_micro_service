const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

// enable cors
app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const { body } = req;
    const URLS = [
      'http://localhost:4000/events',
      'http://localhost:4002/events',
    ];

    URLS.forEach(async (url) => {
      await axios.post(url, body)
      .then(({ data }) => console.log(data))
      .catch(err => {
        console.error(err.message)
      });
    })

    res.send({ status: 'OK' });
});

const PORT = 4005;

app.listen(PORT, () => console.log('listening on port: ', PORT));
