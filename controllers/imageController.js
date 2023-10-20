const Imagecontrollers = {};
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const dbURL = 'mongodb+srv://Sorteo:Sorteo123@cluster0.09tczjf.mongodb.net/SorteoDB?retryWrites=true&w=majority';

const client = new MongoClient(dbURL);

const dbname = 'SorteoDB';
const dbCollectionName = 'users';

const database = client.db(dbname);
const collection = database.collection(dbCollectionName);

Imagecontrollers.UploadImage = async (req, res) => {
    const { originalname, filename, path } = req.file;
    console.log(originalname);
    console.log(path);
    res.status(200).json({ message: 'Image uploaded successfully' });

}
module.exports = Imagecontrollers