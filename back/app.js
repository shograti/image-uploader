const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
});

let upload = multer({
  storage: storage,
  acl: 'public-read',
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  try {
    res.status(200).json(file.filename);
  } catch(error){
    res.status(500).json({
        error:err
    })
  }
  
});

app.listen(3315, () => {
  console.log('Your app is running on port 3315');
});
