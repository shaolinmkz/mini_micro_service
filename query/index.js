const express = require('express');
const bodyParser = require('body-parser');
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
  const { type, data } = req.body;

  if(type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    }
  } else if (type === 'CommentCreated') {
    const { id, content,  postId } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      content,
    });
  }

  res.status(201).send({ message: 'Event Received => Query Service' });
})

const PORT = 4003;

app.listen(PORT, () => console.log('listening on port: ', PORT));
