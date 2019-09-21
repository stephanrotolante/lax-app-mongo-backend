const express  = require('express');
const cors = require('cors');
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const {saveImage} = require('./middleware/middleware.js');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
app.use(bodyParser.json({extended:true,limit:'50mb'}));

app.get('/getTeam', (req,res) => {
    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err,client) => {
        if(err){
            console.log("Cannot Establish Connection to MongoDB", err)
        } else {
            const db = client.db('test-database');
            const collection = db.collection('team');
            collection.find().toArray((err, items) => {
                if(err){

                } else {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(items);
                }
              })
        }
    })
})





app.post('/addTeam', saveImage, (req,res) => {
    console.log(req.body);
    res.end();
})


app.post('/insertPlayer', (req,res) => {
    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err,client) => {
        if(err){
            console.log("Cannot Establish Connection to MongoDB", err)
        } else {
            const db = client.db('test-database');
            const collection = db.collection('player');
            collection.insertMany([{name: 'Togo'}, {name: 'Syd'}], (err, result) => {
                if(err) {
                    console.log("Cannot insert");
                } else {
                    console.log("Results: ", result);
                }
            })
        }
    })
})


app.get('/getplayer', (req,res) => {
    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err,client) => {
        if(err){
            console.log("Cannot Establish Connection to MongoDB", err)
        } else {
            const db = client.db('test-database');
            const collection = db.collection('player');
            collection.find().toArray((err, items) => {
                if(err){

                } else {
                    // res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(items);
                }
              })
        }
    })
})



app.listen(8080, () => {
    console.log("You have a server up on port 8080");
})