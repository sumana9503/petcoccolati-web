'use strict';
const angular = require('angular');

export class petDetailComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('petCoccolattiWebApp.pet-detail', [])
  .component('petDetail', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: petDetailComponent
  })
  .name;
