const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const storage = multer({
    storage: diskStorage
}).single('image')
module.exports = storage;   