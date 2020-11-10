async function getPosts() {

    let response = await fetch('http://localhost:8080/posts');
    let posts = await response.json();
    console.log(posts);
    for (let i = 0; i < 4; i++){
        let img = document.createElement('img');
        img.src = posts[i].image;
        document.getElementById(`img${i}`).appendChild(img);
    }
}
window.addEventListener('load', getPosts);