'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var petCtrlStub = {
  index: 'petCtrl.index',
  show: 'petCtrl.show',
  create: 'petCtrl.create',
  upsert: 'petCtrl.upsert',
  patch: 'petCtrl.patch',
  destroy: 'petCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var petIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pet.controller': petCtrlStub
});

describe('Pet API Router:', function() {
  it('should return an express router instance', function() {
    petIndex.should.equal(routerStub);
  });

  describe('GET /api/pets', function() {
    it('should route to pet.controller.index', function() {
      routerStub.get
        .withArgs('/', 'petCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/pets/:id', function() {
    it('should route to pet.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'petCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/pets', function() {
    it('should route to pet.controller.create', function() {
      routerStub.post
        .withArgs('/', 'petCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/pets/:id', function() {
    it('should route to pet.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'petCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pets/:id', function() {
    it('should route to pet.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'petCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pets/:id', function() {
    it('should route to pet.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'petCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
