define(['angular', 'bricks-user/bricks-user', 'angularMocks'], function(angular) {
    'use strict';

    var FAKE_AUTHOR = 'itsmemario';
    var FAKE_DATA_SERVICE = {
        whoami: function(options) {
            options.success(FAKE_AUTHOR)
        },
    }

    describe('bricks user controller', function() {
        beforeEach(module('BricksUser'));

        var $controller;
        var $scope;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
            $scope = {};
            var controller = $controller('BricksUserCtrl', {
                $scope: $scope,
                BricksDataService: FAKE_DATA_SERVICE,
            });
        }));

        it('initializes author properly', function() {
            expect($scope.author).toEqual(FAKE_AUTHOR);
            expect($scope.initialized).toBe(true);
        });
    });
});
