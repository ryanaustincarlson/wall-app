define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('BricksItem', []);
    module.directive('bricksItem', bricksItem);
    module.controller('BricksItemCtrl', BricksItemCtrl);

    function bricksItem()
    {
        return {
            scope: {
                item: '=',
                itemRemover: '&',
                itemUpdater: '&',
                showAuthor: '=',
                currentUser: '=',
            },
            templateUrl: '/static/bricks/bricks-item/bricks-item.html',
            controller: BricksItemCtrl,
        };
    }

    BricksItemCtrl.$inject = ['$scope'];
    function BricksItemCtrl($scope)
    {
        $scope.item.metadata = {
            editing: false,
            textUpdate: null,
        };

        $scope.toggleEditing = function()
        {
            var item = $scope.item;
            item.metadata.editing = !item.metadata.editing;
            item.metadata.textUpdate = item.metadata.editing ? item.text : null;
        }
    }
});
