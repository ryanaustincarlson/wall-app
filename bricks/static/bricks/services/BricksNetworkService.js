define(['angular'], function(angular) {
    'use strict';

    /*
     * The network service only knows how to make network requests
     * and execute callbacks upon receiving a response. It doesn't
     * care what the response looks like. It's pretty dumb, but
     * we want the net service to focus on just this one little thing.
     */

    var module = angular.module('BricksNetworkService', []);

    // setup cross site request forgery tokens for ajax calls to play
    // nice with django
    module.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }]);

    module.factory('BricksNetworkService', BricksNetworkService);

    BricksNetworkService.$inject = ['$http'];
    function BricksNetworkService($http)
    {
        return {
            init: init,
            create: create,
            remove: remove,
            update: update,
            whoami: whoami,
        };

        function init(options)
        {
            _addHandlersToRequest($http.get('/api/posts/'), options,
                                  'Initialization failed!');
        }

        function create(options)
        {
            var text = options.text;
            _addHandlersToRequest($http.post('/api/posts/', {
                text: text
            }), options, 'Could not create new post');
        }

        function remove(options)
        {
            var url = options.post.url || '/api/posts/' + options.post.id + '/';
            _addHandlersToRequest($http.delete(url), options, 'Could not remove post');
        }

        function update(options)
        {
            var url = options.post.url || '/api/posts/' + options.post.id + '/';
            _addHandlersToRequest($http.patch(url, {
                text: options.post.text,
            }), options, 'Could not update post');
        }

        function whoami(options)
        {
            var url = '/api/whoami/';
            _addHandlersToRequest($http.get(url), options, 'Could not find current user');
        }

        function _addHandlersToRequest(request, options, errMsg)
        {
            var errAlert = function() { alert(errMsg); }
            request.then(
                (options.success || angular.noop),
                (options.error || (errMsg ? errAlert : angular.noop))
            );
        }
    }
})
