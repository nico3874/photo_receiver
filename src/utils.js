import multer from 'multer'
import { google } from 'googleapis'
import {fileURLToPath } from 'url'
import {dirname} from 'path'
import { scopes, keyGoogle, email } from './config.js'



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
  email:email,
  scopes:[scopes],
  key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKN64WiKDpnJ5S\nJIn4Hx8JLRas7KZQ5KItEFcu4j6yrWKbGIJVjeWQ2z1lD0capNP3QzByYazaFjGV\nkQfQcnpL5GJC3rm1PS9EphGT/Gvr5E3WRZ0SQfKGlWv6c/NeeaWXTH1xR8yiOFRd\nCwNKIxLXUTZ3neqCAfmMrEfbfwET4vcKaBp4uhJ3FM00xlumLNX9iwFVkosCuzas\n3zccJRNvA4GQdv7S17FU4I9giX4lRg000mWIYbR74nekV1aJzKPSewRbtfwzCVJx\n2RkOOJm38OvJsy/v/UElVuLmg4bcpKHYRHqXfnb9gMeJ8a3CHSOLM3zztYz0+Eli\nSwdPZTwLAgMBAAECggEAB1zVS6sS13P6jGQZ2pJg12fbB6sgIm7d/BpjCj52Pkbe\nLGZ34bSRE1/1fCH9GppowKZ4yO6x0/Od6jkFxKWpD+1TVJBLyQO0HmGWNJdVY0PZ\n6lTOM2rPm+3XKMnNpnbIZtoD8TrGLRve78+lrC6FvO2POEtkIp1UIDaU8TLOb70G\n/tGM9YipejcmlKY3iT4h7iakNjXBaa7EpXLrhXOU/5Buvtyslkgyn0NRwnMFygvl\ny560LmPESZ4CIg3tnPzWFt9uj3jORh3XX/iGv/aXNuwxbeILhjsXxi+qSRPnvwgA\nMX9TxJV5ojU51QjfyAHr7HkQ+P+IaRS+lZrIC4H4DQKBgQD4XlneyZgGCsqatEQP\nU6ZYb6CYX5QlRw5PkHZpAKFUkz4ZdzV0xLOe9ScIlQqVHuUBx620befAP9eob0LM\n7JoOzaGkJCHDxVwSkyx1RZMKaSDhWQFsv9g2gKXSVSK+IrU2/DesRY7UZq/NvtAR\nsoSUQbNRMxeGm6XmMhAPaOGVfQKBgQDQbk7g27b+pmgdrKSJtizRPfZ1YtsWYnLO\n8tRO09riXz0MxHlC7hFg8lFwk3HeDnoYQ01fygk7aakHKurW3koNJ+AbMIM1Dqna\nYWTXqD7wwcvfX/8W0qtBL4r7SBBkkIzjRPRn6HwMQ10V8ht14VECCi+IvmZDpmze\nfjSIeMcuJwKBgFFtLW2bDho9A3uAyid0Nz8bKb2K6FjoWMrBA/Ec4ceGln9m08G6\nk2Dz4p4vrs6A2Hei7VIQDkC7LYrtHytsDn338JyNs/wpAiycz6CK9NAe80auFYd/\nxfTobHTusHtBicPDIMV78H22RMDhY/nJWyn3+EAQzg+1i8hSdW135y1JAoGBAIyN\ndj+HqnU6fgdUvnfnE33ejO5HxXno1YbclXK6xmXU13ReoW8S30FC5sxFgYm+tXLb\nH7gyo9seu08MD+TpbYJFm4h6RGBpDP0opDoRSLBN3084iuo3EikZCF2/EN7f40H2\n4+GWEuCqJIGCDCaH1HrNp5RM4OVJuyymaoKE/7wNAoGBAI7sOKuso7KMsafn7hUK\noD1TjuTKnz87eR0fachleD5hddIJQRSilxxD0jtMuT9ZilJGbKV5j9QT0v4kb+8m\n3ud9lfWXmeWHk5niiJzbpHCg6JI0esYKFN+1VrjTWemU4S2lf0CcKBkBlIrPJpz9\nonLzwrCW09g3ZarRxPE+lt23\n-----END PRIVATE KEY-----\n"  
});



export const driveClient = google.drive({
  version: 'v3',
  auth: auth,
}); 


export async function createFolderOnDrive(folderName) {
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: ['1axaX2TfWtMZuBMpa1XWydN756xiLuP3G']
    };
    
    const response = await driveClient.files.create({
      resource: folderMetadata,
      fields: 'id',
    });

    
      console.log(`Carpeta creada en el Google Drive del servidor con ID: ${response.data.id}`);
      return response.data.id;
  
    
  }

