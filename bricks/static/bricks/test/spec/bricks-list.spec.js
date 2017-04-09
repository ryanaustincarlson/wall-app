define(['angular', 'bricks-list/bricks-list.controller', 'angularMocks'], function(angular) {
    'use strict';

    var FAKE_DATA = [
        {
            text: 'text.1',
            author: 'author.1',
            author_url: 'http://domain.com/users/1',
            created: '2017-03-28T01:40:17.649481Z',
        },
        {
            text: 'text.2',
            author: 'author.2',
            author_url: 'http://domain.com/users/2',
            created: '2017-03-29T01:40:17.649481Z'
        },
    ];

    var FAKE_DATA_SORTED = [FAKE_DATA[1], FAKE_DATA[0]].map(function(item) {
        return angular.extend({}, item, {created: new Date(item.created)});
    });

    var CURRENT_USER = null;
    var FAKE_DATA_SERVICE = {
        getCurrentUser: function() { return CURRENT_USER; },
        init: function(opts) {
            opts.success(FAKE_DATA.map(function(item) {
                return angular.extend({}, item, {created: new Date(item.created)});
            }));
        },
        create: function(opts) {
            opts.success({
                id: '100',
                text: opts.text,
                created: new Date('2017-03-30T01:40:17.649481Z'),
            });
        },
    }
    var FAKE_NETWORK_SERVICE = {
        remove: function(opts) {
            opts.success({});
        }
    };

    describe('bricks list controller', function() {
        beforeEach(module('BricksListCtrl'))

        var $controller;
        var $scope;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
            $scope = {};
            var controller = $controller('BricksListCtrl', {
                $scope: $scope,
                BricksDataService: FAKE_DATA_SERVICE,
                BricksNetworkService: FAKE_NETWORK_SERVICE,
            });
        }));

        it('initializes properly, sorting posts', function() {
            expect($scope.posts).toEqual(FAKE_DATA_SORTED);
        });

        it('adds a new item, updates internal list', function() {
            $scope.newPostText = 'hello there!';
            $scope.addPost();

            var expectedNewPost = {
                id: '100',
                text: 'hello there!',
                created: new Date('2017-03-30T01:40:17.649481Z')
            };

            expect($scope.posts).toEqual([expectedNewPost].concat(FAKE_DATA_SORTED));
            expect($scope.newPostText, '');
        })

        it('removes item from list by calling network service and updating internal list', function() {
            $scope.removePost(FAKE_DATA_SORTED[0]);
            expect($scope.posts).toEqual([FAKE_DATA_SORTED[1]]);
        });

        it('should properly query BricksDataService for current user', function() {
            expect($scope.getCurrentUser()).toBeNull();
            CURRENT_USER = 'mario';
            expect($scope.getCurrentUser()).toEqual('mario');
        })
    })
});
