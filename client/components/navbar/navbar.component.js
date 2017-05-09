'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
    menu = [{
        title: 'Home',
        state: 'main'
    }];

    userMenu = [{
            title: 'Pets',
            state: 'pets'
        },
        {
            title: 'Orders',
            state: 'orders'
        },
        {
            title: 'Records',
            state: 'records'
        }
    ];

    adminMenu = [{
        title: 'Admin',
        state: 'admin'
    }];

    estabMenu = [{
            title: 'Services',
            state: 'services'
        },
        {
            title: 'Orders',
            state: 'orders'
        }
    ];

    isCollapsed = true;

    constructor(Auth) {
        'ngInject';

        this.isLoggedIn = Auth.isLoggedInSync;
        this.isAdmin = Auth.isAdminSync;
        this.getCurrentUser = Auth.getCurrentUserSync;
    }

}

export default angular.module('directives.navbar', [])
    .component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarComponent
    })
    .name;