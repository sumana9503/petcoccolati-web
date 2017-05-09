'use strict';

describe('Component: ServicesComponent', function() {
  // load the controller's module
  beforeEach(module('petCoccolattiWebApp.services'));

  var ServicesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ServicesComponent = $componentController('services', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
