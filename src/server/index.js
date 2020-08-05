require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { url } = require('inspector')


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
// app.get('/apod', async (req, res) => {
//     try {
//         let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
//             .then(res => res.json())
//         res.send({ image })
//     } catch (err) {
//         console.log('error:', err);
//     }
// })

app.get("/rover", async (req, res) => {
    try {
      let { photo_manifest } = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1//manifests/${req.query.rover}/?api_key=${process.env.API_KEY}`
      ).then(res => res.json());
      const {
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        max_date
      } = photo_manifest;
      const photos = await getPhotos(name, max_sol);
      res.send({
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        max_date,
        photos
      });
    } catch (err) {
      console.log("error:", err);
    }
  });

  const getPhotos = async (rover, sol) => {
    try {
      let { photos } = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.API_KEY}`
      ).then(res => res.json());
      let reducedFile = photos.slice(0,3);
      const urlImages = reducedFile.map(el=>el.img_src);
      return urlImages;
    } catch (err) {
      console.log("error:", err);
    }
  };






// app.get('/rover', async (req, res) => {
    
//     try {
//         let file = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.rover}/photos?sol=1000&api_key=${process.env.API_KEY}`)
//             .then(res => res.json())
//         let reducedFile = file.photos.slice(0,3);
//         const urlImages = reducedFile.map(el=>el.img_src);
//         res.send(urlImages);
//     } catch (err) {
//         console.log('error:', err);
//     }
// })

  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))