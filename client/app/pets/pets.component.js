'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pets.routes';

export class PetsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('petCoccolattiWebApp.pets', [uiRouter])
  .config(routes)
  .component('pets', {
    template: require('./pets.html'),
    controller: PetsComponent,
    controllerAs: 'petsCtrl'
  })
  .name;
