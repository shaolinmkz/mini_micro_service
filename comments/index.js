const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).json({
        data: commentsByPostId[req.params.id] || []
    })
});

app.post('/posts/:id/comments', (req, res) => {
    // 4 bytes of random digits which should be hexidecimals
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id } = req.params;

    const comments = commentsByPostId[id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[id] = comments;

    res.status(201).json({
        data: comments
    })
});

const PORT = 4001;

app.listen(PORT, () => console.log('listening on port: ', PORT));
