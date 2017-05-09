'use strict';

describe('Component: servicesDetail', function() {
  // load the component's module
  beforeEach(module('petCoccolattiWebApp.services-detail'));

  var servicesDetailComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    servicesDetailComponent = $componentController('servicesDetail', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
