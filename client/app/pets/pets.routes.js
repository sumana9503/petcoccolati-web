'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('pets', {
      url: '/pets',
      template: '<pets></pets>'
    });
}
