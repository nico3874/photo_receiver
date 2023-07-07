import multer from 'multer'
import { google } from 'googleapis'
import {fileURLToPath } from 'url'
import {dirname} from 'path'
import dotenv from 'dotenv'

dotenv.config()


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
  email:"receptor-fotos-267@vanerecepcionfotos.iam.gserviceaccount.com",
  scopes: ["https://www.googleapis.com/auth/drive"],
  key:"-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEKO4m4WoN9zxG\nZuZWs3KUCSlaaLnroP6+vcGUOlhvTswzMel5+zKl8x8zgH2oVzacYs30UAtAlWNu\nmOMdEKKL6vbp1y1WV8FAH/Cd+6jJHZmwWPGXfQCQ80MzvCXicEpckQlf/52OX0hi\nG8q1WDSomY/JmzMzpqhgLwO3v/18xb1lk7JlFINldLykaeWfeua/VKlKC55tJOrt\nOAz8FHUkrvYIC8TWN2oONIdlbv9rg6Zw7D3Okp1kvqp3/YMZrAVSIujDvfvt6iWa\nuj1au/iiu8b+BVxVOKCWwCamDNJJstW5Nd/mnrDkkNaBz0WAxG969/WbPKsk1HyK\nsWhm8/1VAgMBAAECggEAF/HnIFfj2lCTywREmdDN68QyiBbAm0LL1fzT5IQ6x1uX\nEajGF13SkO9cn6zPqfz7bZuiCHC87uVNffKrxqCBNxM3kNPzdNbBgFJlzOMrd2Fl\noWE6HIPlzcvkKCyPc1TBvwr1WgKZ+QcojtFVrU1XID2ej72iQmvVoegbTBLjnpdN\n8JfcIF7W+EXyaHKpp9qMhSpdcuCLX3MAXh0hBzkS3c/XVzxp37/GqPaocYekKGuU\n0eTaIKchCKmEHYE23P17Az+aE0ueXhp45wyJuQQTWfi5cW7LLgwePeEIcxpv/y95\nfxTYGfgBZiRRjbpyJB1z+8Xr1Ha73OxjAwEtFsmHAQKBgQDwBbB9Im1cgYDY3h//\nyThpVoHspBwLZ0c9VwqX/mnxDs17QuM5io//ZSf+Dku9e/HpIUWgPDqPN6uY5T06\nnitxhWoWqKYWRO/ySUoRlgBn0+CXWxW1nblGNHazlz6R9UpMRpr1YJR3lR7EjI/C\niLoHRe8whsfT/MZ2DX3qczbEkwKBgQDRN8QUvbGrRVTT9DTWpwVsArcBWC0R/8Yh\nxmK7gfNouqh7kVOEQBTHkI8NLKOWafIVdLejihycAbqYhD6be+AQtFF7fDDukKFm\neC0TA8d1OPc8n5m+XrAcn8AH6t+PYby9NLTMWoQ6ZMRBgi0Vcmvwna1j+sY87Ww8\nRL9D114PdwKBgQDEm7R03CV+1+nmOxU1HeuihaUJZWg/gwrc2RapaFH5jqmMpT6h\nnLnVd1PqDGXIQeXnlESHO66wL+bU6DpecL+fTqyXAPCDX1a5PYV5oEiWw/y9nnPK\n//aK5mCxPVuYjbedgVxfUQxsY+7/CzCbJgpT+No0AsNfBzi97NFOoa+kFwKBgQCT\nRSHtR6os2Vzg5eHbxy313eNcOule5iBd3fvZ6ZuheOLoOGAFk+YMpCFOMMHmOyWB\nHOu3XpzM5BqpCU3YvNX4bDV/Kuh2xbAXJTj1TY+1YCgIsH/UlWp6e6j86cP8ddwZ\ng2RRBNZXFF9hjXSWyDha42MOIZQxhx7NPcc0xgEb+QKBgQCiDLXMac3veIaQoxzG\nJUHMmZW2oxgVgnN2VkFhbyJENvET6bNgBbVf6iai4Wf1X/dAVN2Zbxnpdzk5oUXm\ny9Sifrp4nFU9o/i94d6ya8AsHmxDVE/EDh3g8b8yIM6gmoZx5mjUR5AFUzwn3JQp\nwAbhEkdsE5YrAyQQ0haHlhdY8A==\n-----END PRIVATE KEY-----\n"
   
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

