

let spinnerLogin = document.getElementById('loginSpinner');

document.getElementById("submit").addEventListener('click', function() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let name = username.value;
    let pass = password.value;
    let data = {'name': name, 'pass': pass}
    // let url = 'http://localhost:8080/createUser';
    let url = 'https://global-warming-cs326.herokuapp.com/createUser';
    
    window.localStorage.setItem('username', name);
    document.getElementById('createSpinner').hidden = false;
    

    sendData(url, JSON.stringify(data));
})

document.getElementById("loginSubmit").addEventListener('click', function() {
    let username = document.getElementById("loginUsername");
    let password = document.getElementById("loginPassword");
    let name = username.value;
    let pass = password.value;
    let data = {'name': name, 'pass': pass}
    // let url = 'http://localhost:8080/login';
    let url = 'https://global-warming-cs326.herokuapp.com/login';
    
    window.localStorage.setItem('username', name);
    document.getElementById('loginSpinner').hidden = false;

    sendDataLogin(url, JSON.stringify(data));
})

async function sendDataLogin(url, data) {
    fetch(url, {
        method: "POST",
        body: data,
        headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json'
        }
    }).then(response => response.json()).then(function(data) { 
        console.log(data);
        document.getElementById('loginSpinner').hidden = true;
        if (data.res !== 'Username Invalid') {
            let goodText = document.getElementById('goodTextLogin');
            goodText.hidden = false;
            window.localStorage.setItem('currUser', data.res)
            let errorText = document.getElementById('errTextLogin');
            errorText.hidden = true;
        } else {
            let errorText = document.getElementById('errTextLogin');
            errorText.hidden = false;
            let goodText = document.getElementById('goodTextLogin');
            goodText.hidden = true;
        }

    });
}

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
        document.getElementById('createSpinner').hidden = true;
        if (data.res === 'Username Taken') {
            let errorText = document.getElementById('errText');
            errorText.hidden = false;
            let goodText = document.getElementById('goodText');
            goodText.hidden = true;
        } else {
            let errorText = document.getElementById('errText');
            errorText.hidden = true;
            let goodText = document.getElementById('goodText');
            goodText.hidden = false;
            window.localStorage.setItem('currUser', data.res)
        }

    });
}