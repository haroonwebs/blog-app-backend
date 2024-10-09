import multer from "multer";


const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Storage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

export const upload = multer({ storage: uploadStorage });
