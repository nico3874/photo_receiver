import express from 'express'
import handlebars from 'express-handlebars'
import routerReceive from './routers/receive.route.js'




const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views',  'src/views')
app.set('view engine', 'handlebars')

app.use(express.static( 'src/public'))

app.use('/', routerReceive)


app.listen(8080, ()=>console.log('Servidor corriendo.....'))