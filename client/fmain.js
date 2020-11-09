'use strict';

let button = document.getElementById("button");

button.addEventListener('click', saveFeedback);
button.addEventListener('keyup', function(event){
    if(event.key === 13){
        event.preventDefault();
        document.getElementById('button').click();
    }
});

function saveFeedback(){
    let name = document.getElementById("nameEntry").value;
    let email = document.getElementById("emailEntry").value;
    let feedback = document.getElementById("feedbackEntry").value;
    let data = {'name': name, 'email': email, 'feedback': feedback};
    postData('http://localhost:8080/feedback', JSON.stringify(data));
}

async function postData(url, data){
    fetch(url,{
        method: "POST",
        body: data,
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            'Accept':'application/json'
        }
    }).then(response => response.json());

}