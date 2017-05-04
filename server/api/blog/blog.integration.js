'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBlog;

describe('Blog API:', function() {
  describe('GET /api/blogs', function() {
    var blogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          blogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      blogs.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/blogs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/blogs')
        .send({
          name: 'New Blog',
          info: 'This is the brand new blog!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBlog = res.body;
          done();
        });
    });

    it('should respond with the newly created blog', function() {
      newBlog.name.should.equal('New Blog');
      newBlog.info.should.equal('This is the brand new blog!!!');
    });
  });

  describe('GET /api/blogs/:id', function() {
    var blog;

    beforeEach(function(done) {
      request(app)
        .get(`/api/blogs/${newBlog._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          blog = res.body;
          done();
        });
    });

    afterEach(function() {
      blog = {};
    });

    it('should respond with the requested blog', function() {
      blog.name.should.equal('New Blog');
      blog.info.should.equal('This is the brand new blog!!!');
    });
  });

  describe('PUT /api/blogs/:id', function() {
    var updatedBlog;

    beforeEach(function(done) {
      request(app)
        .put(`/api/blogs/${newBlog._id}`)
        .send({
          name: 'Updated Blog',
          info: 'This is the updated blog!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBlog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBlog = {};
    });

    it('should respond with the updated blog', function() {
      updatedBlog.name.should.equal('Updated Blog');
      updatedBlog.info.should.equal('This is the updated blog!!!');
    });

    it('should respond with the updated blog on a subsequent GET', function(done) {
      request(app)
        .get(`/api/blogs/${newBlog._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let blog = res.body;

          blog.name.should.equal('Updated Blog');
          blog.info.should.equal('This is the updated blog!!!');

          done();
        });
    });
  });

  describe('PATCH /api/blogs/:id', function() {
    var patchedBlog;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/blogs/${newBlog._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Blog' },
          { op: 'replace', path: '/info', value: 'This is the patched blog!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBlog = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBlog = {};
    });

    it('should respond with the patched blog', function() {
      patchedBlog.name.should.equal('Patched Blog');
      patchedBlog.info.should.equal('This is the patched blog!!!');
    });
  });

  describe('DELETE /api/blogs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/blogs/${newBlog._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when blog does not exist', function(done) {
      request(app)
        .delete(`/api/blogs/${newBlog._id}`)
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
