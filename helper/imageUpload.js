const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profileImage'); 
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage });


const handleProfileImageUpload = (req, res, next) => {
  if (req.file) {
    req.image = `${req.file.path}`;
  }
  next();
};

module.exports = { upload, handleProfileImageUpload };