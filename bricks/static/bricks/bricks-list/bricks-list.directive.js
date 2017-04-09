define(['angular', './bricks-list.controller', 'bricks-services'],
function(angular, BricksListCtrl) {
    'use strict';

    angular
    .module('bricksList', ['BricksNetworkService'])
    .directive('bricksList', bricksList);

    function bricksList()
    {
        return {
            scope: {
                'author': '=',
            },
            templateUrl: '/static/bricks/bricks-list/bricks-list.html',
            controller: BricksListCtrl,
            // restrict: 'E',
        };
    }

    return bricksList;
});
