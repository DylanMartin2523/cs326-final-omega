import pkg from 'mongodb';
const { MongoClient, ObjectId } = pkg;
import * as mini from '../server/miniCrypt.js';
// import * as secrets from './secrets.js';

let password;
if (!process.env.PASSWORD) {
    password = secrets.x.main;
} else {
	password = process.env.PASSWORD;
}


const url = 'mongodb+srv://Main:' + password + '@cluster0.oafaf.mongodb.net/Cluster0?retryWrites=true&w=majority'
const client = new MongoClient(url);
const dbName = 'Cluster0'

let data = {'test': 'data'};
let name = 'test';


export async function addComment(data, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db('Posts');

        // Use the collection "people"
        const col = db.collection('Comments');
        col.insertOne(data, function (err) {
            console.log(data._id)
            let id = data._id;
            return callback(id)
        })
    } catch (err) {
        console.log(err.stack);
    }
}

export async function sendToServer(data, name) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection(name);                                                                                                                                                        

         // Insert a single document, wait for promise so we can read it back
        await col.insertOne(data);

        } catch (err) {
            console.log(err.stack);
        }
}

export async function addPost(data, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db('Posts');

        // Use the collection "people"
        const col = db.collection('Posts');
        col.insertOne(data, function (err) {
            console.log(data._id)
            let id = data._id;
            return callback(id)
        })
    } catch (err) {
        console.log(err.stack);
    }
}

export async function addUser(data, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db('Users');

        // Use the collection "people"
        const col = db.collection('Users');

        let myDoc = await col.find({});
        let contains = false;
        let saltAndHash = mini.default().prototype.hash(data.pass)
        await myDoc.forEach(function(doc) { 
            let username = doc.name;
            let pass = mini.default().prototype.hash(data.pass)
            console.log(username, pass)
            if (username === data.name) {
                contains = true;
                return;
            }
        })
        if (!contains) {
            data.salt = saltAndHash[0];
            data.pass = saltAndHash[1];
            let id = '';
            col.insertOne(data, function (err) {
                console.log(data._id)
                id = data._id;
                return callback(id)
            })

            
        } else {
            return callback('Username Already Exists')
        }


    } catch (err) {
        console.log(err.stack);
    }
}

export async function checkLogin(data, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db('Users');

        const col = db.collection('Users');

        let myDoc = await col.find({})
        let temp = [];
        await myDoc.forEach(function(doc) { 
            temp.push(doc);
        })
        console.log(temp);
        temp.forEach(function(doc) {
            if (mini.default().prototype.check(data.pass, doc.salt, doc.pass)) {
                console.log('MATCH')
                console.log(doc)
                return callback(doc._id);
            }
        })

        return callback('Username Invalid');

        } catch (err) {
            console.log(err.stack);
        }
}

export async function getFromServer(dbName, collec, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const col = db.collection(collec);

        let myDoc = await col.find({})
        let temp = [];
        await myDoc.forEach(function(doc) { 
            temp.push(doc);
        })
        console.log(temp);
        return callback(JSON.stringify(temp));


        } catch (err) {
            console.log(err.stack);
        }
}

export async function deleteFromServer(dbName, collec, id, callback) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const col = db.collection(collec);

        let string = 'ObjectId("' + id + '")'
        let myQuery = {'_id': string};
        col.deleteOne({"_id": ObjectId(id)}, function(err, obj) {
            if (err) throw err;
        });

        let res = 'doc deleted'
        return callback(JSON.stringify(res));

        } catch (err) {
            console.log(err.stack);
        }
}

export async function addFeedback(data, callback) {
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
