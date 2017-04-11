(function(require) {
    var root = '/static';
    var libsRoot = root + '/bricks/node_modules';

    var mkPkg = function(name, route)
    {
        return {name: name, location: root + route};
    }

    var mkLibsPath = function(path)
    {
        if (path.indexOf('/') != 0) { path = '/' + path; }
        return libsRoot + path;
    }

    require.config({
        packages: [
            mkPkg('bricks-app', '/bricks'),
            mkPkg('bricks-list', '/bricks/bricks-list'),
            mkPkg('bricks-item', '/bricks/bricks-item'),
            mkPkg('bricks-user', '/bricks/bricks-user'),
            mkPkg('bricks-services', '/bricks/services'),
        ],
        paths: {
            'angular': mkLibsPath('angular/angular.min'),
            'angular-ui-router': mkLibsPath('angular-ui-router/release/angular-ui-router.min'),
            'js-cookie': mkLibsPath('js-cookie/src/js.cookie'),
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-ui-router': {
                deps: ['angular'],
            },
        },
        deps: ['angular', 'bricks-app'],
        callback: function(angular) {
            angular.bootstrap(document, ['bricksApp']);
        }
    });
}(requirejs));
