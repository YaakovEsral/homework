const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongo = require('mongodb');
const client = new mongo.MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

let posts;
(async () => {
    await client.connect();
    const db = client.db('blogs');
    posts = db.collection('posts');
})().catch(err => console.error(err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
})

app.options('/*', (req, res, next) =>{
    res.sendStatus(200);
})

app.get('/', async (req, res, next) => {
    const skip = +req.query.skip || 0;
    const limit = +req.query.limit || 0;
    const thePosts = await posts
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

    res.send(thePosts);
});

app.route('/submitPost')
    .post(async (req, res, next) => {
        const post = {
            title: req.body.title,
            body: req.body.body,
            date: new Date().toLocaleString(),
            author: 'you'//req.user
        };

        await posts.insertOne(post);

        res.status(201).send(post);
        //socketIo.emit('post');
    });

app.post('/addComment/:id', async (req, res, next) => {
    const newComment = {
        body: req.body.body,
        author: 'foo',
        date: new Date().toLocaleString()
    };

    await posts.updateOne(
        { _id: mongo.ObjectId(req.params.id) },
        {
            $push: {
                comments: newComment
            }
        }
    );

    //socketIo.emit('comment', newComment);
        console.log('received comment');
    res.status(201)
        //.location()
        .send(newComment);
});

app.use((req, res, next) => {
    const error = new Error('No such API method');
    error.statusCode = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).send(error.message);
});

server.listen(80);