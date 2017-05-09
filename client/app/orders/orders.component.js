'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './orders.routes';

export class OrdersComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('petCoccolattiWebApp.orders', [uiRouter])
  .config(routes)
  .component('orders', {
    template: require('./orders.html'),
    controller: OrdersComponent,
    controllerAs: 'ordersCtrl'
  })
  .name;
