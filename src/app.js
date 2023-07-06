import express from 'express'
import handlebars from 'express-handlebars'
import routerReceive from './routers/receive.route.js'
import { __dirname } from './utils.js'





const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views',  __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.static( __dirname+'/public'))

app.use('/', routerReceive)


app.listen(8080, ()=>console.log('Servidor corriendo.....'))