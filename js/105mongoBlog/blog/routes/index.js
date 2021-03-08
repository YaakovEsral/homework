const router = require('express').Router();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const client = new MongoClient('mongodb://localhost: 27017', { useUnifiedTopology: true });

let posts;
(async () => {
    await client.connect();
    const db = client.db('blogs');
    posts = db.collection('posts');
    // console.log(posts.find());

})().catch(err => console.error(err));


router.get('/', async (req, res, next) => {
    const thePosts = await posts.find().toArray();
    res.render('layout', {
        subtitle: 'Blog Posts',
        posts: thePosts,
        links: [{ url: '/addPost', name: 'Add Post' }],
        partials: { content: 'posts' }
    });
})

router.route('/login')
    .get((req, res, next) => {
        res.render('layout', {
            partials: { content: 'login' },
            links: [{ url: '/', name: 'Home' }, { url: '/addPost', name: 'Add Post' }]
        })
    })
    .post((req, res, next) =>{
        if(req.body.username && req.body.password) {
            console.log('thanks for logging in', req.body);
        }
    })

router.use((req, res, next) => {
    console.log('using middleware');
    console.log(res.session);
    if (req.session.loggedIn) {
        next()
    } else {
        // console.log();
        //logging where the redirect is from - will send user back to this page after login
        res.cookie('redirectFrom', req.url)
        res.redirect('/login')
    }

})

router.route('/addPost')
    .get((req, res, next) => {
        res.render('layout', {
            subtitle: 'Add Post',
            links: [{ url: '/', name: 'Home' }],
            partials: { content: 'addPost' }
        });
    })
    .post(async (req, res, next) => {
        const post = {
            title: req.body.title,
            body: req.body.body,
            date: new Date(),
            author: 'me'
        }

        await posts.insertOne(post);
        res.redirect('/');
    })

router.post('/submitComment', async (req, res, next) => {

    // console.log(req.body);
    const comment = {
        name: req.body.name,
        body: req.body.body,
        timestamp: new Date().toLocaleString()
    }
    console.log(comment);
    // console.log(mongo.ObjectID(req.body.postId));
    // console.log(mongo.ObjectId(req.body.postId), typeof mongo.ObjectId(req.body.postId));

    await posts.updateOne({ _id: mongo.ObjectID(req.body.postId) }, { $push: { comments: comment } }, (err, data) => {
        if (err) {
            console.error('there was an error', err);
        } else {
            console.log('success');
        }
    })
})

module.exports = router; 