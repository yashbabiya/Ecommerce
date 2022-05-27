var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '/path/to/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now())
    }
  });
   
  var upload = multer({ storage: storage });