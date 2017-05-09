'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('orders', {
      url: '/orders',
      template: '<orders></orders>'
    });
}
