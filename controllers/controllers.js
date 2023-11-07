const controllers = {};
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const dbURL = 'mongodb+srv://Sorteo:Sorteo123@cluster0.09tczjf.mongodb.net/SorteoDB?retryWrites=true&w=majority';

const client = new MongoClient(dbURL);


const database = client.db("SorteoDB");

const collection = database.collection('users');
const ParticipantsCollection = database.collection('Registro');
const PrizesCollection = database.collection('Premios');
const HistoryCollection = database.collection('Historial');

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
        setTimeout(() => {
            res.send({ msg: 'Registrado con exito ¡Buena suerte!' });
        }, 2000)
    } else {
        res.send({ msg: 'Ese DNI esta repetido, porfavor ingrese otro' });

    }

}
controllers.GetParticipants = async (req, res) => {
    let GetParticipants = await ParticipantsCollection.find({}).toArray();
    console.log(GetParticipants);
    res.send({
        "msg": "Participants were fetched successfully",
        "Success": true,
        "data": GetParticipants
    })
}
controllers.GetPrices = async (req, res) => {
    let GetPrices = await PrizesCollection.find({}).toArray();
    console.log(GetPrices);
    res.send({
        "msg": "The prices were fetched successfully",
        "Success": true,
        "data": GetPrices
    })
}

controllers.ResetCollections = async (req, res) => {
    const coll = req.params.collection;
    const collectionToReset = database.collection(coll);
    let resetCollection = await collectionToReset.deleteMany({});
    console.log(resetCollection);
    res.send({ 'msg': 'Collection reseted successfully' })
}
controllers.InsertCollections = async (req, res) => {
    const coll = req.params.collection;
    const collectionToInsert = database.collection(coll);
    let InsertCollection = await collectionToInsert.insertMany(req.body)
    console.log(InsertCollection);
    res.send({ 'msg': 'data inserted successfully' })
}
controllers.SaveHistory = async (req, res) => {
    let date = new Date();
    let historyFormater = {
        'fecha': date.toLocaleDateString(),
        'resultados': [req.body]
    }
    let insertHistory = await HistoryCollection.insertOne(historyFormater);
    console.log(insertHistory);
    res.send({ 'msg': 'Resultados del sorteo guardados correctamente' })
}
controllers.GetLastRaffle = async (req, res) => {
    let GetRaffle = await HistoryCollection.find({}).toArray();
    console.log(GetRaffle.length);
    let raffle = GetRaffle[GetRaffle.length].resultados;
    console.log(raffle);
    res.send({
        "msg": "The raffle was fetched successfully",
        "Success": true,
        "data": raffle
    })
}
module.exports = controllers;