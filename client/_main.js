async function getPosts() {

    getData('http://localhost:8080/forum');
    async function getData(url) {
        let res = await fetch(url, {
        }).then(response => response.json())
    
        for (let i = 0; i < 4; i++){
            `img${i}`.innertext = res[i].body;
        }

    }
}
window.addEventListener('load', getPosts);