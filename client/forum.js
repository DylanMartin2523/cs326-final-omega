// getData('https://global-warming-cs326.herokuapp.com/forum');
getData('http://localhost:8080/forum')
async function getData(url) {
    let res = await fetch(url, {
    }).then(response => response.json())

    console.log(res);
    for (let x = 0; x < res.length; x++) {
        let cardCol = document.getElementById('cardCol');

        let cardMain = document.createElement('div');
        cardMain.className = 'card main';
        cardCol.appendChild(cardMain);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardMain.appendChild(cardBody);

        let title = document.createElement('h5');
        title.className = 'card-title';
        title.innerText = res[x].title;
        cardBody.appendChild(title);

        let text = document.createElement('p');
        text.className = 'card-text';
        text.innerText = res[x]. body;
        cardBody.appendChild(text);

        let toComments = document.createElement('a');
        toComments.href = 'https://global-warming-cs326.herokuapp.com/forum-comments.html'
        toComments.className = 'btn btn-link comment';
        toComments.innerText = 'Comments'
        cardBody.appendChild(toComments);
    }
}