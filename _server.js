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

app.get('/posts', postGenerator);

function postGenerator(req, res) {
    let posts = [];
    for (let i = 0; i < 4; i++) {
        let post = {};
        post.title = faker.lorem.sentence();
        post.image= faker.random.image();
        posts.push(post);
    }
    res.send(JSON.stringify(posts));
};