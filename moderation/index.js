const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// parse various different custom JSON types as JSON
app.use(bodyParser.json())


app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  const EVENT_URL = 'http://localhost:4005/events';

  if(type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post(EVENT_URL, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      }
    })
  }
    res.status(200).json({ message: 'Event Received => Moderation Service' })
});

const PORT = 4004;

app.listen(PORT, () => console.log('listening on port: ', PORT));
