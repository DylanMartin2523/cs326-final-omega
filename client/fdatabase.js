'use strict';

import pkg from 'mongodb';
const {MongoClient} = pkg;
import * as mini from '../server/miniCrypt.js';
import * as secrets from './secrets.js';

let secrets;
let password;
if(!process.env.PASSWORD){
    password = secrets.x.main;
}else{
    password = process.env.PASSWORD;
}

const url = 'mongodb+srv://Main:' + password + '@cluster.oafaf.mongodb.net/Cluster0?retryWrites = true&w=majority';
const client = new MongoClient(url);
const dbname = 'Cluster0';

export async function addFeedback(data, callback){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = clientdb('feedback');

        const feed = db.collection('feedback');
        feed.insertOne(data,function (err){
            console.log(data._id);
            let id= data._id;
            return callback(id);
        })
    }catch (err){
        console.log(err.stack);
    }
}

export async function sendToServer(data, name){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = clientdb('feedback');

        const feed = db.collection('feedback');

        await feed.insertOne(data);
    }catch (err){
        console.log(err.stack);
    }
}

export async function getFromServer(dbname,  collec, callback){
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = clientdb('dbname');

        const feed = db.collection(colec);

        let myDoc = await feed.find({});
        let temp = [];
        await myDoc.forEach(function(doc){
            temp.push(doc);
        })
    }catch (err){
        console.log(err.stack);
    }
    console.log(temp);
    return callback(JSON.stringify(temp));
}