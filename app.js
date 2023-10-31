const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const controllers = require('./controllers/controllers');
const Imagecontrollers = require('./controllers/imageController');

const storage = require('./helpers/storage')

app.use(express.json({ type: "*/*" }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join('uploads')))
app.use(cors())



app.post('/Register', storage, controllers.RegisterUser);

app.post('/UploadSelfie', Imagecontrollers.UploadImage);

app.get('/getParticipants', controllers.GetParticipants);

app.get('/getPrizes', controllers.GetPrices);

app.post('/SaveHistory', controllers.SaveHistory)

app.post('/insertCollection/:collection', controllers.InsertCollections)

app.delete('/resetCollection/:collection', controllers.ResetCollections);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});