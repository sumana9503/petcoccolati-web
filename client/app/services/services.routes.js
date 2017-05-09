'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('services', {
      url: '/services',
      template: '<services></services>'
    });
}
