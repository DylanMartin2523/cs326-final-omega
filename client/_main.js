async function getPosts() {

    getData('https://global-warming-cs326.herokuapp.com/forum');
    async function getData(url) {
        let res = await fetch(url, {
        }).then(response => response.json())
    
        for (let i = 0; i < 4; i++){
            document.getElementById(`img${i}`).innertext = res[i].body;
        }

    }
}
window.addEventListener('load', getPosts);