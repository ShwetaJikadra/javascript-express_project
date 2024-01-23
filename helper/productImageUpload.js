const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/productImage'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload2 = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

const handleProductImageUpload = (req, res, next) => {
    if (req.file) {
      req.image = `${req.file.path}`;
    }
    next();
  };


module.exports={upload2,handleProductImageUpload};