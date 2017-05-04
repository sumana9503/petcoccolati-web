'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newService;

describe('Service API:', function() {
  describe('GET /api/services', function() {
    var services;

    beforeEach(function(done) {
      request(app)
        .get('/api/services')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          services = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      services.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/services', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/services')
        .send({
          name: 'New Service',
          info: 'This is the brand new service!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newService = res.body;
          done();
        });
    });

    it('should respond with the newly created service', function() {
      newService.name.should.equal('New Service');
      newService.info.should.equal('This is the brand new service!!!');
    });
  });

  describe('GET /api/services/:id', function() {
    var service;

    beforeEach(function(done) {
      request(app)
        .get(`/api/services/${newService._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          service = res.body;
          done();
        });
    });

    afterEach(function() {
      service = {};
    });

    it('should respond with the requested service', function() {
      service.name.should.equal('New Service');
      service.info.should.equal('This is the brand new service!!!');
    });
  });

  describe('PUT /api/services/:id', function() {
    var updatedService;

    beforeEach(function(done) {
      request(app)
        .put(`/api/services/${newService._id}`)
        .send({
          name: 'Updated Service',
          info: 'This is the updated service!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedService = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedService = {};
    });

    it('should respond with the updated service', function() {
      updatedService.name.should.equal('Updated Service');
      updatedService.info.should.equal('This is the updated service!!!');
    });

    it('should respond with the updated service on a subsequent GET', function(done) {
      request(app)
        .get(`/api/services/${newService._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let service = res.body;

          service.name.should.equal('Updated Service');
          service.info.should.equal('This is the updated service!!!');

          done();
        });
    });
  });

  describe('PATCH /api/services/:id', function() {
    var patchedService;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/services/${newService._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Service' },
          { op: 'replace', path: '/info', value: 'This is the patched service!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedService = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedService = {};
    });

    it('should respond with the patched service', function() {
      patchedService.name.should.equal('Patched Service');
      patchedService.info.should.equal('This is the patched service!!!');
    });
  });

  describe('DELETE /api/services/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/services/${newService._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when service does not exist', function(done) {
      request(app)
        .delete(`/api/services/${newService._id}`)
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
