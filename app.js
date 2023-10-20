const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;
const controllers = require('./controllers/controllers');
const Imagecontrollers = require('./controllers/imageController');
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage
})


app.use(express.json({ type: "*/*" }))
app.use(express.urlencoded({ extended: true }))

app.use(express.static('uploads'))

app.use(cors())



app.post('/Register', controllers.RegisterUser);

app.post('/UploadSelfie', upload.single('image'), Imagecontrollers.UploadImage)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});