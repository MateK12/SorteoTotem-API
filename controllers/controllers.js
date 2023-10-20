const controllers = {};
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const dbURL = 'mongodb+srv://Sorteo:Sorteo123@cluster0.09tczjf.mongodb.net/SorteoDB?retryWrites=true&w=majority';

const client = new MongoClient(dbURL);

const dbname = 'SorteoDB';
const dbCollectionName = 'users';

const database = client.db(dbname);
const collection = database.collection(dbCollectionName);


client.connect()
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
controllers.RegisterUser = async (req, res) => {

    console.log(req.body);
    const { name, dni, location } = req.body;
    FindByDNI = await collection.find({ dni: dni }).toArray();
    if (FindByDNI.length == 0) {
        collection.insertOne(req.body);
        res.send({ msg: 'Registrado con exito ¡Buena suerte!' });
    } else {
        res.send({ msg: 'Ese DNI esta repetido, porfavor ingrese otro' });

    }

}

module.exports = controllers;