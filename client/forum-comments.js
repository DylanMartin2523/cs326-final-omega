// const { ReplSet } = require("mongodb");
// const { response } = require("express");

// getData('https://global-warming-cs326.herokuapp.com/forum-comments');
let id = window.location.search.substring(4);
let url = 'http://localhost:8080/forum-comments?id=' + id
getForumData(url)

let createButton = document.getElementById('createComment');
let butUrl = 'http://localhost:8080/createComment.html?id=' + id
createButton.href = butUrl;


async function getForumData(url) {
    let res = await fetch(url, {
    }).then(response => response.json());

    


    let title = document.getElementById('title');
    let body = document.getElementById('desc');


    let postURL = 'http://localhost:8080/forum'
    let postRes = await fetch(postURL, {
    }).then(response => response.json());
    console.log(postRes);
    let index = 0;
    for (let x = 0; x < postRes.length; x++) {
        if (postRes[x]._id === id) {
            title.innerText = postRes[x].title
            body.innerText = postRes[x].body
            index = x;
            break;
        }
    }

    let OPName = document.getElementById('OP')

    let OPURL = 'http://localhost:8080/users'
    let OPRes = await fetch(OPURL, {
    }).then(response => response.json());
    for (let x = 0; x < OPRes.length; x++) {
        if (OPRes[x]._id === postRes[index].userid) {
            OPName.innerText = OPRes[x].name;
        }
    }
    

    let comHolder = document.getElementById('commentHolder')
    let cardIds = {};
    let children = [];
    for (let x = 0; x < res.length; x++) {
        if (res[x].resTo === 0) {
            let name = '';
            for (let i = 0; i < OPRes.length; i++) {
                if (OPRes[i]._id === res[x].id) { 
                    name = OPRes[i].name;
                }
            }
            let card = makeCard(res[x].body, name, res[x]._id)
            comHolder.appendChild(card);
            cardIds[res[x].id] = card; 
        } else {
            children.push(res[x]);
        }
    }
    addChildComment(children, cardIds);
}

function addChildComment(children, cardIds) {
    let kids = [];
    if (children.length === 0) return;
    for (let x = 0; x < children.length; x++) {
        if (Object.keys(cardIds).includes(children[x].resTo.toString())) {
            let toAppend = cardIds[children[x].resTo].getElementsByClassName('childCardHolder')[0]
            let card = makeCard(children[x].body, children[x].userName);
            toAppend.appendChild(card)
            delete cardIds[children[x].resTo];
            cardIds[children[x].id] = card;
        } else {
            kids.push(children[x])
        }
    }
    addChildComment(kids, cardIds);
}

function makeCard(body, userName, resTo) {
    let inner = document.createElement('div');
    inner.className = 'card inner';

    let bod = document.createElement('div');
    bod.className = 'card-body';
    inner.appendChild(bod);

    let respond = document.createElement('a');
    respond.className = 'btn btn-link post';
    respond.innerText = '↳';
    // respond.href = 'http://localhost:8080/createComment&id=' + id + '&resTo=' + resTo;
    respond.addEventListener('click', function() {
        bod.appendChild(makeResponseCard(resTo))
    });
    bod.appendChild(respond);

    let mainText = document.createElement('h6');
    mainText.className = 'card-text main-text';
    mainText.innerText = body;
    bod.appendChild(mainText);

    let name = document.createElement('h8');
    name.className = 'card-text small';
    name.innerText = userName;
    bod.appendChild(name);
    let childCardHolder = document.createElement('div');
    childCardHolder.className = 'childCardHolder';
    bod.appendChild(childCardHolder);

    return inner;
}

function makeResponseCard(resTo) {
    console.log(resTo)

    let inner = document.createElement('div');
    inner.className = 'card inner';

    let bod = document.createElement('div');
    bod.className = 'card-body';
    inner.appendChild(bod);

    let inputDiv = document.createElement('div');
    bod.appendChild(inputDiv);
    let input = document.createElement('textarea');
    input.class = 'form-control';
    input.rows = 3;
    input.id = 'commentInput';
    inputDiv.appendChild(input);

    let submit = document.createElement('a')
    // submit.type = 'button';
    submit.innerText = 'Submit Comment'
    submit.className = 'btn btn-primary';
    bod.appendChild(submit)

    submit.addEventListener('click', function() {
        let words = input.value;
        sendCommentData(resTo, words);
    })

    return inner;
} 

function sendCommentData(resTo, body) {
    let link = 'http://localhost:8080/createComment'

    let currId = window.localStorage.getItem('currUser');

    let toSend = {'id': currId, 'body': body, 'resTo': resTo, 'postId': id}

    sendData(url, JSON.stringify(toSend));
}

async function sendData(url, data) {
    fetch(url, {
        method: "POST",
        body: data,
        headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json'
        }
    }).then(response => response.json());
}