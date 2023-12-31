import express from 'express'
import handlebars from 'express-handlebars'
import routerReceive from './routers/receive.route.js'
import { __dirname } from './utils.js'
import cors from 'cors'
import { PORT } from './config.js'
import cron from "node-cron"
import fs from "fs"
import path from 'path'





const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views',  __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.static( __dirname+'/public'))

app.use('/', routerReceive)


app.listen(PORT, ()=>console.log('Servidor corriendo.....'))


//const folderPath = path.join(__dirname, 'photos');

/* cron.schedule('1 * * * *', () => {
    emptyFolder(folderPath);
  });

  function emptyFolder(folder) {
    fs.readdir(folder, (err, files) => {
      if (err) throw err;
  
      for (const file of files) {
        const filePath = path.join(folder, file);
  
        
        fs.unlink(filePath, err => {
          if (err) throw err;
          console.log(`Eliminado: ${filePath}`);
        });
      }
    });
  } */


  
  //Nota Importante: Cuando quice hacer la funcion emptyFolder como arrow function, no funcioonó. Hay que hacerla como function EmptyFolser(folder)...