var AFaireApplication = angular.module('AFaireApplication', ['LocalStorageModule']);

AFaireApplication.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    "use strict";
    localStorageServiceProvider.setPrefix('AFaireApplication');
}]);

AFaireApplication.controller('AFaireController', [ '$scope', 'localStorageService', function ($scope, localStorageService) {
    "use strict";

    var todos = localStorageService.get('todos');
    if (todos === null) {
        todos = [
            {
                'name': 'Todo #1',
                'text': 'Content #1'
            },
            {
                'name': 'Todo #2',
                'text': 'Content #'
            },
            {
                'name': 'Todo #3',
                'text': 'Content #3'
            },
            {
                'name': 'Todo #4',
                'text': 'Content #4'
            },
            {
                'name': 'Todo #5',
                'text': 'Content #5'
            },
            {
                'name': 'Todo #6',
                'text': 'Content #6'
            },
            {
                'name': 'Todo #7',
                'text': 'Content #7'
            },
            {
                'name': 'Todo #8',
                'text': 'Content #8'
            },
            {
                'name': 'Todo #8',
                'text': 'Content #8'
            },
            {
                'name': 'Todo #8',
                'text': 'Content #8'
            }];
        localStorageService.add('todos',  todos);
    } 

    $scope.todos = todos;
}]);