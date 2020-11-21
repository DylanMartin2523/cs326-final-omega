let postId = window.location.search.substring(4);
//let url = 'http://localhost:8080/createComments?id=' + postId
let url = 'https://global-warming-cs326.herokuapp.com/createComments?id=' + postId

let button = document.getElementById('submit');
button.addEventListener("click", function() {

    let body = document.getElementById('body').value;

    let id = window.localStorage.getItem('currUser');

    let toSend = {'id': id, 'body': body, 'resTo': 0, 'postId': postId}


    //let url = 'http://localhost:8080/createComment'
    let url = 'https://global-warming-cs326.herokuapp.com/createComment'

    sendData(url, JSON.stringify(toSend));
    //location.href = 'http://localhost:8080/forum-comments.html?id=' + postId
    location.href = 'https://global-warming-cs326.herokuapp.com/forum-comments.html?id=' + postId
})

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