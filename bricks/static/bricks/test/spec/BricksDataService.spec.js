define(['angular', 'bricks-services/BricksDataService', 'angularMocks'], function(angular) {
    'use strict';

    var FAKE_USERNAME = 'mario';

    var FAKE_DATA = [
        {
            id: 1,
            text: 'text.1',
            author: 'author.1',
            author_url: 'http://domain.com/users/1',
            created: '2017-03-28T01:40:17.649481Z',
        },
        {
            id: 2,
            text: 'text.2',
            author: 'author.2',
            author_url: 'http://domain.com/users/2',
            created: '2017-03-29T01:40:17.649481Z'
        },
    ];

    var FAKE_NEW_ITEM = {
        id: 3,
        text: 'text.3',
        author: 'author.1',
        author_url: 'http://domain.com/users/3',
        created: '2017-04-02T01:40:17.649481Z'
    };

    var FAKE_DATA_PROCESSED = FAKE_DATA.map(function(item) {
        return angular.extend({}, item, {created: new Date(item.created)});
    });

    var FAKE_NETWORK_SERVICE = {
        init: function(options) {
            options.success({data: FAKE_DATA});
        },
        whoami: function(options) {
            options.success({data: {
                'username': FAKE_USERNAME,
            }});
        },
        create: function(options) {
            options.success({data: FAKE_NEW_ITEM});
        },
    };

    describe('Bricks Data Service', function() {
        beforeEach(module('BricksDataService'));

        beforeEach(module(function($provide) {
            $provide.value('BricksNetworkService', FAKE_NETWORK_SERVICE)
        }));

        it('initializes & creates date objs', inject(function(BricksDataService) {
            var posts = null;
            BricksDataService.init({
                success: function(data) { posts = data; }
            });
            expect(posts).toEqual(FAKE_DATA_PROCESSED);
        }));

        it('properly stores the current user on request', inject(function(BricksDataService) {
            expect(BricksDataService.getCurrentUser()).toBeNull();

            var currentUser = null;
            BricksDataService.whoami({
                success: function(user) { currentUser = user; },
            });
            expect(currentUser).toEqual(FAKE_USERNAME);
            expect(BricksDataService.getCurrentUser()).toEqual(FAKE_USERNAME);
        }));

        it('properly creates a new post', inject(function(BricksDataService) {
            var post = null;
            BricksDataService.create({
                success: function(newPost) {
                    post = newPost;
                },
            });

            var expected = angular.copy(FAKE_NEW_ITEM);
            expected.created = new Date(expected.created);
            expect(post, expected);
        }));
    });
});
