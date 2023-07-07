import multer from 'multer'
import { google } from 'googleapis'
import {fileURLToPath } from 'url'
import {dirname} from 'path'
import dotenv from 'dotenv'

dotenv.config()
const email = process.env.email
const scopes = process.env.scopes
const key = process.env.key

///Esto es para las rutas relativas

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const folder = 'src/photos';
        cb(null, folder)
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({storage:storage})



const KEYFILEPATH =  __dirname + '/keys/claves2.json'

const auth = new google.auth.JWT({
  
  /* keyFile : KEYFILEPATH,  */ 
  email:key,
  scopes: [scopes],
  key:key   
});



export const driveClient = google.drive({
  version: 'v3',
  auth: auth,
}); 


export async function createFolderOnDrive(folderName) {
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: ['1eRXr_QSHn-MHTUjmKzAt3h9AyeD4ez0x']
    };
    
    const response = await driveClient.files.create({
      resource: folderMetadata,
      fields: 'id',
    });

    
      console.log(`Carpeta creada en el Google Drive del servidor con ID: ${response.data.id}`);
      return response.data.id;
  
    
  }

