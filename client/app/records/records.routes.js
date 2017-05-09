'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('records', {
      url: '/records',
      template: '<records></records>'
    });
}
