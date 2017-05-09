'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPet;

describe('Pet API:', function() {
  describe('GET /api/pets', function() {
    var pets;

    beforeEach(function(done) {
      request(app)
        .get('/api/pets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pets.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/pets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pets')
        .send({
          name: 'New Pet',
          info: 'This is the brand new pet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPet = res.body;
          done();
        });
    });

    it('should respond with the newly created pet', function() {
      newPet.name.should.equal('New Pet');
      newPet.info.should.equal('This is the brand new pet!!!');
    });
  });

  describe('GET /api/pets/:id', function() {
    var pet;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pets/${newPet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pet = res.body;
          done();
        });
    });

    afterEach(function() {
      pet = {};
    });

    it('should respond with the requested pet', function() {
      pet.name.should.equal('New Pet');
      pet.info.should.equal('This is the brand new pet!!!');
    });
  });

  describe('PUT /api/pets/:id', function() {
    var updatedPet;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pets/${newPet._id}`)
        .send({
          name: 'Updated Pet',
          info: 'This is the updated pet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPet = {};
    });

    it('should respond with the updated pet', function() {
      updatedPet.name.should.equal('Updated Pet');
      updatedPet.info.should.equal('This is the updated pet!!!');
    });

    it('should respond with the updated pet on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pets/${newPet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pet = res.body;

          pet.name.should.equal('Updated Pet');
          pet.info.should.equal('This is the updated pet!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pets/:id', function() {
    var patchedPet;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pets/${newPet._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pet' },
          { op: 'replace', path: '/info', value: 'This is the patched pet!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPet = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPet = {};
    });

    it('should respond with the patched pet', function() {
      patchedPet.name.should.equal('Patched Pet');
      patchedPet.info.should.equal('This is the patched pet!!!');
    });
  });

  describe('DELETE /api/pets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pets/${newPet._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pet does not exist', function(done) {
      request(app)
        .delete(`/api/pets/${newPet._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
