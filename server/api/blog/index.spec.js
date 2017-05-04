'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var blogCtrlStub = {
  index: 'blogCtrl.index',
  show: 'blogCtrl.show',
  create: 'blogCtrl.create',
  upsert: 'blogCtrl.upsert',
  patch: 'blogCtrl.patch',
  destroy: 'blogCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var blogIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './blog.controller': blogCtrlStub
});

describe('Blog API Router:', function() {
  it('should return an express router instance', function() {
    blogIndex.should.equal(routerStub);
  });

  describe('GET /api/blogs', function() {
    it('should route to blog.controller.index', function() {
      routerStub.get
        .withArgs('/', 'blogCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/blogs/:id', function() {
    it('should route to blog.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'blogCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/blogs', function() {
    it('should route to blog.controller.create', function() {
      routerStub.post
        .withArgs('/', 'blogCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/blogs/:id', function() {
    it('should route to blog.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'blogCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/blogs/:id', function() {
    it('should route to blog.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'blogCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/blogs/:id', function() {
    it('should route to blog.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'blogCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
