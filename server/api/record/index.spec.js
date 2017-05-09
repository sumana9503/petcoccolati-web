'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var recordCtrlStub = {
  index: 'recordCtrl.index',
  show: 'recordCtrl.show',
  create: 'recordCtrl.create',
  upsert: 'recordCtrl.upsert',
  patch: 'recordCtrl.patch',
  destroy: 'recordCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var recordIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './record.controller': recordCtrlStub
});

describe('Record API Router:', function() {
  it('should return an express router instance', function() {
    recordIndex.should.equal(routerStub);
  });

  describe('GET /api/records', function() {
    it('should route to record.controller.index', function() {
      routerStub.get
        .withArgs('/', 'recordCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/records/:id', function() {
    it('should route to record.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'recordCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/records', function() {
    it('should route to record.controller.create', function() {
      routerStub.post
        .withArgs('/', 'recordCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/records/:id', function() {
    it('should route to record.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'recordCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/records/:id', function() {
    it('should route to record.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'recordCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/records/:id', function() {
    it('should route to record.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'recordCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
