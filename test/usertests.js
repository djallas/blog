/* eslint linebreak-style: ["error", "windows"] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;

process.env.NODE_ENV = 'development';

chai.use(chaiHttp);

describe('Nivelo io api testing.....', () => {
  // get all users
  describe('Get /api/v1/users', () => {
    it('should return an object of all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  // registering user
  // describe('Post /api/v1/users', () => {
  //   it('should return an object of all users', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body).to.be.a('object');
  //         expect(res.body).to.be.have.property('message', 'User registered succeffully');
  //         done();
  //       });
  //   });
  // });
});
