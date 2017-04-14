const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const fs = require('fs');
const app = express();

const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))

app.locals.title = 'Garage-Bin'
app.locals.items = [{
  id:1,
  name: 'car',
  reason: 'parked',
  cleanliness:'sparkling'
}]

app.get('/', (request, response)=>{
  fs.readFile(`${__dirname}/index.html`,(err,file)=>{
    response.send(file)
  })
})

app.get('/api/items',(request,response)=>{
  const items = app.locals.items
  response.json(items)
})

app.get('/api/items/:id', (request,response)=>{
  const { id } = request.params
  const item = app.locals.items.filter((item)=>{
    if(item.id === id){
      return item
    }
  })
  response.status(200).json(item)
})

app.post('/api/items', (request, response)=>{
  const newItem = {
    id:md5(request.body.name),
    name:request.body.name,
    reason:request.body.reason,
    cleanliness:request.body.cleanliness
  }
  if(!request.body.name){
    response.status(404).send({
      error: 'No Item Added'
    })
  }
  app.locals.items.push(newItem)
  response.status(200).json(app.locals.items)
})


app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running at ${app.get('port')}`)
})

module.exports = app
