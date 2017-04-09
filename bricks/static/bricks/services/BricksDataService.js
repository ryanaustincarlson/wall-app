define(['angular', './BricksNetworkService'], function(angular) {
    angular.module('BricksDataService', ['BricksNetworkService']).factory('BricksDataService', BricksDataService);

    BricksDataService.$inject = ['BricksNetworkService'];
    function BricksDataService(BricksNetworkService)
    {
        var CURRENT_USER = null;

        return {
            getCurrentUser: function() { return CURRENT_USER; },
            init: init,
            whoami: whoami,
            create: create,
        };

        function init(options)
        {
            var optSuccess = options.success;
            options.success = function(response)
            {
                response.data.forEach(function(post) {
                    post.created = new Date(post.created);
                });
                (optSuccess || angular.noop)(response.data);
            };

            BricksNetworkService.init(options);
        }

        function whoami(options)
        {
            CURRENT_USER = null;

            var optSuccess = options.success;
            options.success = function(response)
            {
                var author = response.data['username'];
                CURRENT_USER = author || null;
                optSuccess(CURRENT_USER);
            };

            BricksNetworkService.whoami(options);
        }

        function create(options)
        {
            var optSuccess = options.success;
            options.success = function(response)
            {
                response.data.created = new Date(response.data.created);
                (optSuccess || angular.noop)(response.data);
            };

            BricksNetworkService.create(options);
        }
    }
})
