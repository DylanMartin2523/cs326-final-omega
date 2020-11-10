import express from 'express';
import cors from 'cors';
//import faker from 'faker';
import bodyparser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080; 

let fdata = {};
let fadata = new Array();
let count = 0;

app.use(bodyparser.json());
app.use(cors());
app.listen(port, () =>
  console.log('Example app listening on port ' + port)
);

app.get('/', (req, res) => {
    res.send("OOF");
});



app.post('/feedback',(req,res) => {
    const name = req.body;
    if(fadata[count] !== name){
        fadata[count] = name;
        count++;
    }
    fdata = JSON.stringify(fadata);
    console.log(name);
});

app.get('/feedback',(req,res) => {
    res.send(fdata);
});







