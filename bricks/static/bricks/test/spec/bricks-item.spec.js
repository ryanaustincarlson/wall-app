define(['angular', 'bricks-item/bricks-item.controller', 'angularMocks'], function(angular) {
    'use strict';

    describe('bricks item controller', function() {
        beforeEach(module('BricksItemCtrl'));

        var $controller;
        var $scope;

        var FAKE_ITEM = {
            text: 'some post text',
        };

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
            $scope = {};
            $scope.item = FAKE_ITEM; // inserted by directive
            var controller = $controller('BricksItemCtrl', {
                $scope: $scope,
            });
        }));

        it('initializes properly, adding metadata', function() {
            var expected = angular.copy(FAKE_ITEM);
            expected.metadata = {
                editing: false,
                textUpdate: null,
            }
            expect($scope.item).toEqual(expected);
        });

        it('toggles editing and updates text fields', function() {
            $scope.toggleEditing();

            var expected = angular.copy(FAKE_ITEM);
            expected.metadata = {
                editing: true,
                textUpdate: FAKE_ITEM.text,
            };
            expect($scope.item).toEqual(expected);

            $scope.toggleEditing();

            expected.metadata.editing = false;
            expected.metadata.textUpdate = null;
            expect($scope.item).toEqual(expected);
        })
    });
});
