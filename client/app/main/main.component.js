import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
    awesomeThings = [];
    newThing = '';
    /* UI Bootstrap carrousel */
    myInterval = 5000;
    noWrapSlides = false;
    active = 0;
    slides = [];
    currIndex = 0;
    /*@ngInject*/
    constructor($http, $scope, socket) {
        this.$http = $http;
        this.socket = socket;

        /**$scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });*/
    }

    addSlide(image) {
        var imgname = image;
        var newWidth = 600 + this.slides.length + 1;
        this.slides.push({
            image: 'assets/images/carrousel/' + imgname + '.jpg',
            text: ['Brindamos el bienestar para tú mascota', 'Con total confianza y cuidado', 'Comodidad para solicitar tus servicios', 'Servicio con total cariño', 'Fácil de buscar'][this.slides.length % 5],
            id: this.currIndex++
        });
    };

    $onInit() {
        for (var i = 0; i < 5; i++) {
            this.addSlide(i);
        }
        /**this.$http.get('/api/things')
            .then(response => {
                this.awesomeThings = response.data;
                this.socket.syncUpdates('thing', this.awesomeThings);
            });*/
    }

    /**addThing() {
        if (this.newThing) {
            this.$http.post('/api/things', {
                name: this.newThing
            });
            this.newThing = '';
        }
    }*/

    /**deleteThing(thing) {
        this.$http.delete(`/api/things/${thing._id}`);
    }*/
}

export default angular.module('petCoccolattiApp.main', [uiRouter])
    .config(routing)
    .component('main', {
        template: require('./main.html'),
        controller: MainController
    })
    .name;