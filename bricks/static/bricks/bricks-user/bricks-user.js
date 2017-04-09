define(['angular', 'bricks-services'], function(angular) {
    'use strict';

    var module = angular
    .module('bricksUser', ['BricksDataService']);

    module.directive('bricksUser', bricksUser);
    module.controller('BricksUserCtrl', BricksUserCtrl);

    function bricksUser()
    {
        return {
            templateUrl: '/static/bricks/bricks-user/bricks-user.html',
            controller: BricksUserCtrl,
        };
    }

    BricksUserCtrl.$inject = ['$scope', 'BricksDataService'];
    function BricksUserCtrl($scope, BricksDataService)
    {
        $scope.initialized = false;
        $scope.author = null;
        BricksDataService.whoami({
            success: function(author) {
                $scope.author = author;
                $scope.initialized = true;
            },
            error: function() {
                $scope.initialized = true;
            },
        });
    }

    return bricksUser;
})
