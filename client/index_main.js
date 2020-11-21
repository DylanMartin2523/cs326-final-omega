async function getPosts() {

    
    
    async function getData(url) {
        let res = await fetch(url, {
        }).then(response => response.json())
        console.log(res);
        console.log(res.length);
        
        let cards = document.getElementById('cards');
        let row = document.createElement("div");
        row.classList.add("row");
        cards.appendChild(row);

        for (let i = 0; res.length !== 0 & i < 4; i++) {
            if (i % 2 === 0) {
                let col = document.createElement("div");
                col.classList.add("col");
                col.classList.add("padding-0");
                col.id = `col${Math.floor(i / 2) + 1}`;
                row.appendChild(col);
            }
            let x = Math.floor(Math.random() * res.length);
            console.log(res[x].body);
            let card = document.createElement("card");
            card.id = `card${i}`;
            card.classList.add("card");
            card.classList.add("padding-0");
            let title = document.createElement("h6");
            title.classList.add("card-title");
            title.id = `card${i}-title`;
            title.innerText = res[x].title;
            let body = document.createElement("p");
            body.classList.add("card-text");
            body.id = `card${i}-body`;
            body.innerText = res[x].body;
            card.appendChild(title);
            card.appendChild(body);
            document.getElementById(`col${Math.floor(i / 2) + 1}`).appendChild(card);
            let id = res[x]._id;
            card.addEventListener("click", () => {
                location.replace('http://localhost:8080/forum-comments.html?id=' + id);
            });
            res.splice(x, 1);
        }


        
        
    }
    getData('http://localhost:8080/forum');
  
     
}
window.addEventListener('load', getPosts);

