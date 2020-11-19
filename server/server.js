// const express = require('express'); 
import express from 'express';
// const cors = require('cors')
import cors from 'cors';
// const bodyparser = require('body-parser');
import bodyparser from 'body-parser';
// const faker = require('faker');
import faker from 'faker';
// const database = require('../client/database')
// const minicrypt = require('./miniCrypt.js');
import { addUser, sendToServer, getFromServer, addPost } from '../client/database.js';


const app = express();
const port = process.env.PORT || 8080; 

let fdata = {};
let fadata = new Array();
let count = 0;

app.use(bodyparser.json());

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

app.post('/feedback',(req,res) => {
    const name = req.body;
    if(fadata[count] !== name){
        fadata[count] = name;
        count++;
    }
    fdata = JSON.stringify(fadata);
    console.log(name);
});

app.get('/feedback',(req,res) => {
    res.send(fdata);
});

app.post('/createUser', (req, res) => {
    let data = req.body;
    addUser(data, function(ans) {
        if (ans !== 'Username Already Exists') {
            let toSend = ans
            res.send({'res': toSend})
        } else {
            res.send({'res': 'Username Taken'})
        }
    })

});

app.get('/forum', forumHandler);

app.post('/createComment', (req, res) => {
    const name = req.body
    console.log(name);
    res.end();
});

app.post('/createPost', (req, res) => {
    const data = req.body
    // console.log(data);
    addPost(data, function (ans) {
        res.send({'res': ans});
    });
});

function createUser(req, res) {
    // let users = getFromServer('Users')
}

// Send random fourm data
function forumHandler(req, res) {
    let forum = [];
    let name = 'Posts'
    getFromServer(name, function (ans) {
        // let temp = ans;
        res.send(ans);
    })
    // for (let x = 0; x < 10; x++) {
    //     let randFormObj = {};
    //     randFormObj.id = faker.random.number();
    //     randFormObj.userName = faker.internet.userName();
    //     randFormObj.title = faker.lorem.sentence();
    //     randFormObj.desc = faker.lorem.paragraph();
    //     randFormObj.comments = faker.random.number();
    //     randFormObj.link = 'http://127.0.0.1:5500/forum-comments.html';
    //     forum.push(randFormObj);
    // }
    // res.send(JSON.stringify(forum));
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
