import { Router } from "express";
import fs from 'fs'
import sharp from 'sharp'
import { Readable } from 'stream'
import { upload, driveClient, createFolderOnDrive } from "../utils.js";
import path from "path";
import { __dirname } from "../utils.js";
import cron from'node-cron'



const router = Router()

router.get('/', (req, res)=>{
    res.render('firtPage', {style: "/css/style.css" })
   
})

  router.post('/upload-images', (req, res)=>{
    res.send('Estoy escuchando')
  })
  
  router.post('/upload-imagess', upload.array('photos'), async (req, res) => {
    
    
      const allImage = req.files.every(file=>{
      const fileInfo = file.mimetype
      return fileInfo.startsWith('image/')
    })
  
    if(allImage){
  
    const folderName = `${req.body.folderName}  ${req.body.size}`; 
    let IdFolder =''  
      try {
        IdFolder = await createFolderOnDrive(folderName);
        
      } catch (error) {
        console.error('Error al crear la carpeta:', error.message);
        res.status(500).send('Error al crear la carpeta');
      }
  
    
    const imageFiles = req.files; 
    const folderId = IdFolder; 
    console.log(folderName);
  
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).send('No se ha proporcionado ningún archivo de imagen');
    }
  
    try {
      for (const imageFile of imageFiles) {
        const imageMetadata = {
          name: imageFile.originalname,
          parents: [folderId],
        };
  
       
  
        const compressedImage = await sharp(imageFile.path)
          /* .resize(800) */ // Ajusta el tamaño de la imagen según tus necesidades
          .jpeg({ quality: 100 }) // Ajusta la calidad de la compresión según tus necesidades
          .toBuffer();
  
        const response = await driveClient.files.create({
          requestBody: imageMetadata,
          media: {
            mimeType: imageFile.mimetype,
            body:Readable.from(compressedImage),
          },
        });
  
        // Eliminar el archivo temporal después de subirlo a Google Drive
        const imageStream = fs.createReadStream(imageFile.path);
          imageStream.on('close', () => {
      // Código para eliminar el archivo temporal
          fs.unlinkSync(imageFile.path);
          });
        
        console.log(`Imagen "${imageFile.originalname}" subida a Google Drive con ID: ${response.data.id}`);
      }
      
      
      
      res.send('Las imágenes han sido subidas correctamente a Google Drive');
      
    } catch (error) {
      console.error('Error al subir las imágenes a Google Drive:', error.message);
      res.status(500).send('Error al subir las imágenes a Google Drive');
    }}else{
      res.sendStatus(401)
    }
  });

  // Eliminar la carpeta temporal después de subir todas las imágenes
 


export default router