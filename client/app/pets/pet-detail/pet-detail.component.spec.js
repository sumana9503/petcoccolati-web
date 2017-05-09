'use strict';

describe('Component: petDetail', function() {
  // load the component's module
  beforeEach(module('petCoccolattiWebApp.pet-detail'));

  var petDetailComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    petDetailComponent = $componentController('petDetail', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
