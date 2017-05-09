'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './records.routes';

export class RecordsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('petCoccolattiWebApp.records', [uiRouter])
  .config(routes)
  .component('records', {
    template: require('./records.html'),
    controller: RecordsComponent,
    controllerAs: 'recordsCtrl'
  })
  .name;
