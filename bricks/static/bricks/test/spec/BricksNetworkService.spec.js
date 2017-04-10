define(['angular', 'bricks-services/BricksNetworkService', 'angularMocks'], function(angular) {
    'use strict';

    var RESPONSE_GET_POSTS = '_get_posts_response';
    var RESPONSE_GET_WHOAMI = '_get_whoami_response';
    var RESPONSE_CREATE = '_create_response';
    var RESPONSE_DELETE = '_delete_response';
    var RESPONSE_PATCH = '_patch_response';

    var TEXT_POST = 'post text';
    var TEXT_PATCH = 'patch text';

    var WALLPOST_ID = '12';

    var POSTS_URL = '/api/posts/';
    var WALLPOST_URL = POSTS_URL + WALLPOST_ID + '/';

    var MAKE_NETWORK_OPTIONS = function(actualResponse) {
        return {
            success: function(response) {
                actualResponse.data = response.data;
            },
        };
    }

    describe('Bricks Network Service', function() {

        beforeEach(module('BricksNetworkService'));

        var $httpBackend;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $httpBackend.when('GET', POSTS_URL).respond(RESPONSE_GET_POSTS);
            $httpBackend.when('POST', POSTS_URL, {text: TEXT_POST}).respond(RESPONSE_CREATE);
            $httpBackend.when('DELETE', WALLPOST_URL).respond(RESPONSE_DELETE)
            $httpBackend.when('PATCH', WALLPOST_URL, {text: TEXT_PATCH}).respond(RESPONSE_PATCH);
            $httpBackend.when('GET', '/api/whoami/').respond(RESPONSE_GET_WHOAMI);
        }));

        it('gets all posts', inject(function(BricksNetworkService) {
            $httpBackend.expectGET(POSTS_URL);

            var actualResponse = {};
            BricksNetworkService.init(MAKE_NETWORK_OPTIONS(actualResponse));

            $httpBackend.flush();

            expect(actualResponse.data).toEqual(RESPONSE_GET_POSTS);
        }));

        it('creates a new post', inject(function(BricksNetworkService) {
            $httpBackend.expectPOST(POSTS_URL, {text: TEXT_POST});

            var actualResponse = {};
            var opts = MAKE_NETWORK_OPTIONS(actualResponse);
            opts.text = TEXT_POST;
            BricksNetworkService.create(opts);

            $httpBackend.flush();

            expect(actualResponse.data).toEqual(RESPONSE_CREATE);
        }));

        it('deletes a post', inject(function(BricksNetworkService) {
            $httpBackend.expectDELETE(WALLPOST_URL);

            var actualResponse = {};
            var opts = MAKE_NETWORK_OPTIONS(actualResponse);
            opts.post = {
                url: WALLPOST_URL,
            };
            BricksNetworkService.remove(opts);

            $httpBackend.flush();

            expect(actualResponse.data).toEqual(RESPONSE_DELETE);
        }));

        it('updates a post', inject(function(BricksNetworkService) {
            $httpBackend.expectPATCH(WALLPOST_URL, {text: TEXT_PATCH});

            var actualResponse = {};
            var opts = MAKE_NETWORK_OPTIONS(actualResponse);
            opts.post = {
                url: WALLPOST_URL,
                text: TEXT_PATCH,
            };
            BricksNetworkService.update(opts);

            $httpBackend.flush();

            expect(actualResponse.data).toEqual(RESPONSE_PATCH);
        }));

        it('requests the current user', inject(function(BricksNetworkService) {
            $httpBackend.expectGET('/api/whoami/');

            var actualResponse = {};
            BricksNetworkService.whoami(MAKE_NETWORK_OPTIONS(actualResponse));

            $httpBackend.flush();

            expect(actualResponse.data).toEqual(RESPONSE_GET_WHOAMI);
        }))
    });
});
