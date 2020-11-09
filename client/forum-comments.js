getData('http://localhost:8080/forum-comments');

async function getData(url) {
    let res = await fetch(url, {
    }).then(response => response.json())

    let title = document.getElementById('title');
    title.innerText = res.op.title;

    let desc = document.getElementById('desc');
    desc.innerText = res.op.desc;

    let OPName = document.getElementById('OP')
    OPName.innerText = res.op.userName;

    let comHolder = document.getElementById('commentHolder')
    let cardIds = {};
    let children = [];
    for (let x = 0; x < res.comments.length; x++) {
        if (res.comments[x].resTo === 0) {
            let card = makeCard(res.comments[x].body, res.comments[x].userName)
            comHolder.appendChild(card);
            cardIds[res.comments[x].id] = card; 
        } else {
            children.push(res.comments[x]);
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

function makeCard(body, userName) {
    let inner = document.createElement('div');
    inner.className = 'card inner';

    let bod = document.createElement('div');
    bod.className = 'card-body';
    inner.appendChild(bod);

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