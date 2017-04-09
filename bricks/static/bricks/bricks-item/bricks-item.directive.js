define(['angular', './bricks-item.controller'], function(angular, BricksItemCtrl) {
    'use strict';

    angular
    .module('bricksItem', [])
    .directive('bricksItem', bricksItem);

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

    return bricksItem;
});
