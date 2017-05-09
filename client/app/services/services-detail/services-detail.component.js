'use strict';
const angular = require('angular');

export class servicesDetailComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('petCoccolattiWebApp.services-detail', [])
  .component('servicesDetail', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: servicesDetailComponent
  })
  .name;
