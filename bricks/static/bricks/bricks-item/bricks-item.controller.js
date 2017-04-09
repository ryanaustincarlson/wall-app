define(['angular'], function(angular) {

    angular
    .module('BricksItemCtrl', [])
    .controller('BricksItemCtrl', BricksItemCtrl);

    BricksItemCtrl.$inject = ['$scope'];
    function BricksItemCtrl($scope)
    {
        $scope.item.metadata = {
            editing: false,
            textUpdate: null,
        };

        $scope.toggleEditing = function()
        {
            var item = $scope.item;
            item.metadata.editing = !item.metadata.editing;
            item.metadata.textUpdate = item.metadata.editing ? item.text : null;
        }
    }

    return BricksItemCtrl;
});
