process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../server.js');

chai.use(chaiHttp)

describe('garage routes', ()=>{
  it('GET should return an array of items', (done)=>{
    chai.request(server)
    .get('/api/items')
    .end((err,res)=>{
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body.length.should.equal(1)
      done()
    })
  })
  it('POST should allow you to create an item', (done)=>{
    chai.request(server)
    .post('/api/items')
    .field('_method', 'post')
    .field('id', '13')
    .field('name', 'skates')
    .field('reason', 'its not year 2000')
    .field('cleanliness', 'dusty')
    .end((err,res)=>{
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body.length.should.equal(2)
      done()
    })
  })
})
