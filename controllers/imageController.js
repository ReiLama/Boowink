const multer = require('multer');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// dotenv.config({path: './.env'});
const publicDirectory = path.join(__dirname, './public');

//static to get all the static files like css;js
app.use(express.static(publicDirectory));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
  
  
const upload = multer({ storage: storage });


// UPLOAD SINGLE IMAGE
exports.createUploadImage = (req, res) => {
    console.log('Middleware called');
    upload.single('file')(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }
  
      const file = req.file;
      console.log(file.filename);
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      return res.status(200).json({ filename: file.filename });
    });
  };

//UPLOAD AN ARRAY OF IMAGES
exports.createUploadImagesArray = (req, res) => {
    console.log('Middleware called');
    upload.array('files', 10)(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload files' });
      }
  
      const files = req.files;
      if (!files) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
  
      const filenames = files.map((file) => file.filename);
      return res.status(200).json({ filenames });
    });
  };
  


// GET UPLOADED SINGLE IMAGE
exports.getUploadedImages = (req, res) =>{
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../public/uploads', filename);
    
    // Send the image file in the response
    res.sendFile(imagePath);
}

// GET THE UPLOADED ARRAY OF IMAGES BY FILENAME
exports.getUploadedImagesArrayByFilename = (req, res) => {
  
  const filenames = req.params.filename.split(',');
  const requestedFilenames = filenames.map((filename) => {
    return {
      filename: filename,
      imagePath: path.join(__dirname, '../public/uploads', filename)
    };
  });

  // Find the requested image in the array
  const requestedImage = requestedFilenames.find((file) => file.filename === req.params.filename);

  if (!requestedImage) {
    return res.status(404).json({ error: 'Image not found' });
  }

  // Send the requested image file in the response
  res.sendFile(requestedImage.imagePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve image' });
    }
  });
}

// GET ALL URL OF THE ARRAY OF UPLOADED IMAGES
exports.getAllImages = (req, res) => {
  const imageDir = path.join(__dirname, '../public/uploads');

  // Read the contents of the uploads directory
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve images' });
    }

    // Filter out any non-image files
    const imageFiles = files.filter((file) => {
      const filePath = path.join(imageDir, file);
      return fs.statSync(filePath).isFile() && isImageFile(filePath);
    });

    // Generate an array of image URLs
    const imageUrls = imageFiles.map((file) => {
      return `${req.protocol}://${req.get('host')}/uploads/${file}`;
    });

    // Send the image URLs in the response
    res.json({ imageUrls });
  });
};

function isImageFile(file) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext);
}



//provee
// exports.getAllimages = (req, res) =>{
//   const imageDir = path.join(__dirname, '../public/uploads');

//   // Read the contents of the uploads directory
//   fs.readdir(imageDir, (err, files) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to retrieve images' });
//     }

//     // Filter out any non-image files
//     const imageFiles = files.filter((file) => {
//       const filePath = path.join(imageDir, file);
//       return fs.statSync(filePath).isFile() && isImageFile(filePath);
//     });

//     // Send the image files in the response
//     res.json({ images: imageFiles });
//   });
// }
// function isImageFile(file) {
//   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//   const ext = path.extname(file).toLowerCase();
//   return imageExtensions.includes(ext);
// }


// exports.getAllImages = (req, res) => {
//   const imageDir = path.join(__dirname, '../public/uploads');

//   // Read the contents of the uploads directory
//   fs.readdir(imageDir, (err, files) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to retrieve images' });
//     }

//     try {
//       // Filter out any non-image files
//       const imageFiles = files.filter((file) => {
//         const filePath = path.join(imageDir, file);
//         return fs.statSync(filePath).isFile() && isImageFile(filePath);
//       });

//       // Send the image files in the response
//       const images = imageFiles.map((file) => {
//         const filePath = path.join(imageDir, file);
//         return fs.readFileSync(filePath);
//       });

//       res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Modify the Content-Type as per your image type
//       images.forEach((image) => res.write(image));
//       res.end();
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// };

// function isImageFile(file) {
//   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//   const ext = path.extname(file).toLowerCase();
//   return imageExtensions.includes(ext);
// }





