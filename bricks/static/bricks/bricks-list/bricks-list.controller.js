define(['angular', 'bricks-services'], function(angular) {
    'use strict';

    angular
    .module('BricksListCtrl', ['BricksDataService', 'BricksNetworkService'])
    .controller('BricksListCtrl', BricksListCtrl);

    BricksListCtrl.$inject = ['$scope', 'BricksDataService', 'BricksNetworkService'];
    function BricksListCtrl($scope, BricksDataService, BricksNetworkService) {
        BricksDataService.init({
            success: function(data) {
                $scope.posts = data;
                $scope.posts.sort(function(a, b) {
                    return a.created < b.created;
                });
            },
        });

        $scope.displayItemAuthor = !$scope.author;

        $scope.newPostText = '';

        $scope.addPost = function()
        {
            BricksDataService.create({
                text: $scope.newPostText,
                success: function(newPost)
                {
                    // insert into sorted order
                    for (var i=0; i<$scope.posts.length; i++)
                    {
                        if ($scope.posts[i].created < newPost.created)
                        {
                            $scope.posts.splice(i, 0, newPost);
                            break;
                        }
                    }

                    $scope.newPostText = '';
                }
            });
        }

        $scope.removePost = function(post)
        {
            BricksNetworkService.remove({
                post: post,
                success: function(response)
                {
                    for (var i=0; i<$scope.posts.length; i++)
                    {
                        if ($scope.posts[i].id === post.id)
                        {
                            $scope.posts.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        }

        $scope.filterByAuthor = function(post)
        {
            if (!$scope.author) { return true; }
            return post.author === $scope.author;
        }

        $scope.getCurrentUser = BricksDataService.getCurrentUser;
    }

    return BricksListCtrl;
});
