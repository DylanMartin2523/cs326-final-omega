
let username = document.getElementById("username");
let password = document.getElementById("password");

document.getElementById("submit").addEventListener('click', function() {
    let name = username.value;
    let pass = password.value;
    let data = {'name': name, 'pass': pass}
    let url = 'http://localhost:8080/createUser';
    window.localStorage.setItem('username', name);
    

    sendData(url, JSON.stringify(data));
})


async function sendData(url, data) {
    fetch(url, {
        method: "POST",
        body: data,
        headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json'
        }
    }).then(response => response.json()).then(function(data) { 
        console.log(data);
        if (data.res === 'Username Already Exists') {
            let errorText = document.createElement('small');
            errorText.className = "form-text text-danger";
            errorText.innerText = data.res;
            username.parentNode.appendChild(errorText)
        } else {
            window.localStorage.setItem('currUser', data.res)
        }

    });
}