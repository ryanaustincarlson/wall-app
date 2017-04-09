define([
    'angular', 'angular-ui-router',
    'bricks-list', 'bricks-item', 'bricks-user'
],
function(angular) {
    var bricksApp = angular.module('bricksApp', [
        'ui.router',

        'bricksList',
        'BricksListCtrl',
        'bricksItem',
        'BricksItemCtrl',
        'bricksUser',
        // 'BricksUserCtrl',
    ]);

    bricksApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
        var posts = {
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

        $stateProvider.state(posts);
        $stateProvider.state(author);

        // $locationProvider.hashPrefix('');
        // $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
    }]);
});
