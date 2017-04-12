define(['angular', 'bricks-services'],
function(angular, BricksListCtrl) {
    'use strict';

    /*
     * Bricks List displays a list of posts ("bricks") that can
     * optionally be filtered by author. If it's *not* being
     * filtered by author, users can also make new posts to the wall.
     */

    var module = angular.module('BricksList', ['BricksNetworkService']);
    module.directive('bricksList', bricksList);
    module.controller('BricksListCtrl', BricksListCtrl);

    function bricksList()
    {
        return {
            scope: {
                'author': '=',
            },
            templateUrl: '/static/bricks/bricks-list/bricks-list.html',
            controller: BricksListCtrl,
            // restrict: 'E',
        };
    }

    BricksListCtrl.$inject = ['$scope', 'BricksDataService', 'BricksNetworkService'];
    function BricksListCtrl($scope, BricksDataService, BricksNetworkService) {
        $scope.posts = [];
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
                    if ($scope.posts.length == 0)
                    {
                        $scope.posts.push(newPost);
                    }
                    else
                    {
                        for (var i=0; i<$scope.posts.length; i++)
                        {
                            if ($scope.posts[i].created < newPost.created)
                            {
                                $scope.posts.splice(i, 0, newPost);
                                break;
                            }
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

        $scope.updatePost = function(post)
        {
            var updatedPost = angular.copy(post);
            updatedPost.text = updatedPost.metadata.textUpdate;
            BricksNetworkService.update({
                post: updatedPost,
                success: function(response)
                {
                    for (var i=0; i<$scope.posts.length; i++)
                    {
                        if ($scope.posts[i].id === response.data.id)
                        {
                            $scope.posts[i].text = response.data.text;
                        }
                    }

                    post.metadata.textUpdate = null;
                    post.metadata.editing = false;
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
});
