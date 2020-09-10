const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// enable cors
app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).json({
        data: commentsByPostId[req.params.id] || []
    })
});

app.post('/posts/:id/comments', async (req, res) => {
    // 4 bytes of random digits which should be hexidecimals
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id } = req.params;

    const comments = commentsByPostId[id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[id] = comments;

    const EVENT_URL = 'http://event-bus-srv:4005/events';
    await axios.post(EVENT_URL, {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: 'pending',
      },
    });

    res.status(201).json({
        data: comments
    })
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  const EVENT_URL = 'http://event-bus-srv:4005/events';

  if(type === 'CommentModerated') {
    const { status, postId, content, id } = data;
    const comments = commentsByPostId[postId];
    const newComment = comments.find(comment => comment.id === id);
    newComment.status = status;
    newComment.content = content;

    await axios.post(EVENT_URL, {
      type: 'CommentUpdated',
      data
    })
  }

  res.send({ message: 'Event Received => Comment Service' });
});

const PORT = 4002;

app.listen(PORT, () => console.log('listening on port: ', PORT));
