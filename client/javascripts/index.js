angular.module('todoApp',[]);

angular.module('todoApp')
    .controller('ToDoController', ['$rootScope', '$scope', '$timeout', ToDoController])
    .directive('toDoList',['$http', '$rootScope', toDoList])
    .directive('createTask',['$http','$rootScope', createTask]);

function ToDoController($rootScope, $scope, $timeout) {
    var vm = this;

    vm.taskEditing = false;
    vm.taskForm = {};

    $scope.$broadcast ('getAllTask');
}

function createTask($http, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            addTask: '&addTask',
            users: '=users'
        },
        templateUrl: 'partials/addTask.html',

        link: function(scope, iElement, iAttrs) {
            scope.cleanForm = function() {
                scope.task = {};
            }
        },
        controller: function($scope, $element, $attrs) {
            var vm = this;
            vm.users = ['user 1', 'user 2', 'user 3', 'user 4'];
            
            vm.pushTask = function(task) { console.log(task);
                $http.put('/api/tasks', task, {headers: {'content-type': 'application/json'}}).then(function(response) {
                    console.log(response.data);
                    $scope.$broadcast('getAllTasks', 'pushed new task');
                    vm.list = response.data.Items;
                }, function(err) {
                    console.log(err);
                });
            }
            
            vm.editTask = function() {

                $rootScope.$broadcast('getAllTasks', 'edited old task');
            }

            vm.clearTask = function() {
                vm.task = {};
            } 

             $scope.$on('editTask', function(event, body) {
               console.log(event, body);
            })

        },
        controllerAs: 'vm'
    }
}

function toDoList($http, $rootScope) {
    return {
        restrict: 'E',
        scope: { },
        templateUrl: 'partials/showTasks.html',
        link: function(scope, iElement, iAttrs) {
            scope.$on('getAllTasks', function(event, body) {
                vm.loading = true;
                console.log('event'); getAllTasks();
            });
        },
        controller: function($scope, $element, $attrs) {
            var vm = this;
            vm.loading = true;

            function getAllTasks() {
                vm.loading = true;
                $http.get('/api/tasks').then(function(response) {
                    vm.list = response.data.Items;
                }, function(err) {
                    console.log(err);
                }).finally(function() {
                    vm.loading = false;
                });
            }

            getAllTasks();

            $scope.$on('getAllTask', function(event, data) { console.log(event, data);
                getAllTasks();
            });

            vm.deleteTask = function(task) {
                 //delete operation
            }

            vm.editTask = function(task) { console.log('error', task);
                $rootScope.$broadcast('editTask', task);
            }

        },
        controllerAs: 'vm'
    }
}