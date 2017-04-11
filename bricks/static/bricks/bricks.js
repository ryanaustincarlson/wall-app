define([
    'angular', 'angular-ui-router',
    'bricks-list', 'bricks-item', 'bricks-user'
],
function(angular) {
    'use strict';

    /*
     * This is the main definition of the app. It orchestrates the
     * ui-router states and specifies what our URLs should look like.
     * There are two states:
     *      - home: show all posts, allow users to create new posts.
     *      - author: show a single author's posts.
     */

    var bricksApp = angular.module('bricksApp', [
        'ui.router',

        'BricksList',
        'BricksItem',
        'BricksUser',
    ]);

    bricksApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
        var home = {
            name: 'home',
            url: '/',
            template: '<div bricks-list></div>',
        };

        var author = {
            name: 'author',
            url: '/{author}',
            template: '<div bricks-list author="author"></div>',
            controller: ['$scope', '$stateParams', function($scope, $stateParams) {
                $scope.author = $stateParams.author;
            }],
        };

        $stateProvider.state(home);
        $stateProvider.state(author);

        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/');
    }]);
});
