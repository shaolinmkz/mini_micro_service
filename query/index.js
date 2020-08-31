const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const handleEvents = ({ type, data }) => {
  if(type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    }
  } else if (type === 'CommentCreated') {
    const { id, content,  postId, status } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status
    });
  } else if(type === 'CommentUpdated') {
    const { status, postId, content, id } = data;
    const post = posts[postId];
    const newComment = post.comments.find(comment => comment.id === id);
    newComment.status = status;
    newComment.content = content;
  }
}

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

app.get('/posts/:id', (req, res) => {
    res.status(200).json({
        data: posts[req.params.id]
    })
});

app.get('/posts', async (req, res) => {


    res.status(200).json({
        data
    })
});

app.post('/events', (req, res) => {
  const { body: event } = req;

  handleEvents(event);

  res.status(201).send({ message: 'Event Received => Query Service' });
})

const PORT = 4003;

app.listen(PORT, async () => {
  console.log('listening on port: ', PORT);
  const EVENT_URL = 'http://localhost:4005/events';
  const { data: { data } } = await axios.get(EVENT_URL);
  data.forEach(event => {
    console.log('Processing =>>', event.type)
    handleEvents(event);
  })
});
