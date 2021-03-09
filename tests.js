/* eslint-env mocha */
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// NOTE: These tests use the configuration in docker-compose.xml
describe('Sample Service API', () => {
  const sampleService = 'http://localhost:8080';

  const sampleProduct = {
    "title": "Test Title - " + Math.floor(Math.random()*65536).toString(16),
    "content": "Test Content"
  };
  let id;

  it('should add a product', (done) => {
    chai.request(sampleService)
      .post(`/products`)
      .send(sampleProduct)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        id = res.body;
        done();
      });
    });

  it('should fetch the product', (done) => {
    chai.request(sampleService)
      .get(`/products/${id}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.title.should.equal(sampleProduct.title);
        res.body.content.should.equal(sampleProduct.content);
        done();
      });
  });

  it('should have product in list of products', (done) => {
    chai.request(sampleService)
      .get(`/products`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.filter((p) => p.title == sampleProduct.title).length.should.equal(1,);
        done();
      });
  });
});
