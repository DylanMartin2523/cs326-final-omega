import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { addUser, sendToServer, getFromServer, addPost, addComment, checkLogin, deleteFromServer } from '../client/database.js';


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

app.post('/login', (req, res) => {
    let data = req.body;
    checkLogin(data, function(ans) {
        if (ans !== 'Username Invalid') {
            let toSend = ans
            res.send({'res': toSend})
        } else {
            res.send({'res': 'Username Invalid'})
        }
    })
});

app.post('/createComment', (req, res) => {
    const data = req.body
    console.log(data);
    addComment(data, function(ans) {
        res.send({'res': ans})
    });
});

app.post('/createPost', (req, res) => {
    const data = req.body
    // console.log(data);
    addPost(data, function (ans) {
        res.send({'res': ans});
    });
});

app.get('/users', function(req, res) {
    let name = 'Users';
    getFromServer(name, name, function (ans) {
        res.send(ans);
    })
})

app.get('/forum', forumHandler);

// Send random fourm data
function forumHandler(req, res) {
    let forum = [];
    let name = 'Posts'
    getFromServer(name, name, function(ans) {
        // let temp = ans;
        res.send(ans);
    })
}

app.get('/deletePost', function(req, res) {
    deleteFromServer('Posts', 'Posts', req.query.id, function(ans) {
        res.send(ans);
    })
});

app.get('/forum-comments', commentHandler);

function commentHandler(req, res, next) {

    let db = 'Posts';
    let col = 'Comments'
    let id = req.query.id
    getFromServer(db, col, function(ans) {
        let toSend = []
        let parsed = JSON.parse(ans);
        for (let x = 0; x < parsed.length; x++) {
            if (parsed[x].postId === id) {
                toSend.push(parsed[x])
            }
        }
        res.send(toSend);
    })

}
