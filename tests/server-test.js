process.env.NODE_ENV = 'test';

let chai = require('chai');
const expect = chai.expect

let should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../server.js');

chai.use(chaiHttp)

describe('GET /', function() {
  it('should return a 200 and html page', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

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
    .send({
      name:'skates',
      reason:'not fun'
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body.length.should.equal(2)
      done()
    })
  })
})
