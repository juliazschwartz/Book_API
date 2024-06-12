process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../src/models/bookModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });

  describe('/GET books', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
        .get('/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST book', () => {
    it('it should POST a book', (done) => {
      const book = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien'
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql('The Lord of the Rings');
          res.body.should.have.property('author').eql('J.R.R. Tolkien');
          done();
        });
    });
  });

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      const book = new Book({ title: '1984', author: 'George Orwell' });
      book.save((err, book) => {
        chai.request(server)
          .get('/books/' + book.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('1984');
            res.body.should.have.property('author').eql('George Orwell');
            res.body.should.have.property('_id').eql(book.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
      const book = new Book({ title: 'The Chronicles of Narnia', author: 'C.S. Lewis' });
      book.save((err, book) => {
        chai.request(server)
          .put('/books/' + book.id)
          .send({ title: 'The Chronicles of Narnia', author: 'C.S. Lewis Updated' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('author').eql('C.S. Lewis Updated');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
      const book = new Book({ title: 'Harry Potter', author: 'J.K. Rowling' });
      book.save((err, book) => {
        chai.request(server)
          .delete('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
