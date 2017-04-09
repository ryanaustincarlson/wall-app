define(['angular'], function(angular) {
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
            whoami: whoami,
        };

        function init(options)
        {
            _addHandlersToRequest($http.get('/api/posts'), options);
        }

        function create(options)
        {
            var text = options.text;
            _addHandlersToRequest($http.post('/api/posts/', {
                text: text
            }), options);
        }

        function remove(options)
        {
            var url = options.post.url || '/api/posts/' + options.post.id + '/';
            _addHandlersToRequest($http.delete(url), options);
        }

        function whoami(options)
        {
            var url = '/api/whoami';
            _addHandlersToRequest($http.get(url), options);
        }

        function _addHandlersToRequest(request, options)
        {
            request.then(
                (options.success || angular.noop),
                (options.error || angular.noop)
            );
        }
    }
})
