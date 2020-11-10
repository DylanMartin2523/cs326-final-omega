async function getPosts() {

    let response = await fetch('http://localhost:8080/posts');
    let posts = await response.json();
    console.log(posts);
    for (let i = 0; i < 4; i++){
        document.getElementById(`img${i}`).src = posts[i].image;
    }
    
}
getPosts();