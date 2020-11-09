import express from 'express';
import cors from 'cors';
import faker from 'faker';
import bodyParser from 'body-parser'

const app = express();
const port = process.env.PORT || 8080; 

app.use(bodyParser.json());

app.use(cors());
app.listen(port, () =>
  console.log('Example app listening on port ' + port)
);


app.use('/', express.static('client'));

app.get('/', (req, res) => {
    res.send("OOF");
});

app.get('/forum', forumHandler);

app.post('/createComment', (req, res) => {
    const name = req.body
    console.log(name);
});

app.post('/createPost', (req, res) => {
    const name = req.body
    console.log(name);
});

// Send random fourm data
function forumHandler(req, res) {
    let forum = [];
    for (let x = 0; x < 10; x++) {
        let randFormObj = {};
        randFormObj.id = faker.random.number();
        randFormObj.userName = faker.internet.userName();
        randFormObj.title = faker.lorem.sentence();
        randFormObj.desc = faker.lorem.paragraph();
        randFormObj.comments = faker.random.number();
        randFormObj.link = 'http://127.0.0.1:5500/forum-comments.html';
        forum.push(randFormObj);
    }
    res.send(JSON.stringify(forum));
}

app.get('/forum-comments', commentHandler);

function commentHandler(req, res) {
    let data = {};

    data.op = {};
    data.op.id = faker.random.number();
    data.op.title = faker.lorem.sentence();
    data.op.desc = faker.lorem.paragraph();
    data.op.userName = faker.internet.userName();

    data.comments = [];
    let ids = [];
    for (let x = 0; x < 5; x++) {
        let temp = {};
        temp.body = faker.lorem.paragraph();
        temp.userName = faker.internet.userName();
        temp.id = faker.random.number();
        temp.resTo = 0;
        data.comments.push(temp);
        ids.push(temp.id);
    }

    for (let x = 0; x < 5; x++) {
        let temp = {};
        temp.body = faker.lorem.paragraph();
        temp.userName = faker.internet.userName();
        temp.id = faker.random.number();
        temp.resTo = ids[x];
        data.comments.push(temp);
        ids.push(temp.id);
    }
    
    res.send(JSON.stringify(data));
}