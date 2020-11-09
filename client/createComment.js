let button = document.getElementById('submit');
button.addEventListener("click", function() {
    let userName = document.getElementById('screenName').value;

    let body = document.getElementById('body').value;

    let id = 544545454;

    let toSend = {'userName': userName, 'body': body, 'id': id}

    let url = 'http://localhost:8080/createComment'

    sendData(url, JSON.stringify(toSend));
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