'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './services.routes';

export class ServicesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('petCoccolattiWebApp.services', [uiRouter])
  .config(routes)
  .component('services', {
    template: require('./services.html'),
    controller: ServicesComponent,
    controllerAs: 'servicesCtrl'
  })
  .name;
