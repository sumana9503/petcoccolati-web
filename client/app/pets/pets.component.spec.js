'use strict';

describe('Component: PetsComponent', function() {
  // load the controller's module
  beforeEach(module('petCoccolattiWebApp.pets'));

  var PetsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PetsComponent = $componentController('pets', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
