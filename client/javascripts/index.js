angular.module('todoApp',[]);

angular.module('todoApp')
    .directive('toDoList',['$http', '$rootScope', toDoList])
    .directive('createTask',['$http','$rootScope', createTask]);

function createTask($http, $rootScope) {
    return {
        restrict: 'E',
        scope: { },
        templateUrl: 'partials/addTask.html',
        controller: function($scope, $element, $attrs) {
            var vm = this;
            vm.users = ['user 1', 'user 2', 'user 3', 'user 4'];
            vm.taskEditing = false;
            vm.errMessage = null; vm.pushRequesting = false;
            vm.task = {};
            
            vm.pushTask = function(task) {
                vm.errMessage = null; 
                vm.pushRequesting = true;
                $http.post('/api/tasks', task, {headers: {'content-type': 'application/json'}}).then(function(response) {
                    $scope.$emit('getAllTasks', 'pushed new task');
                }, function(err) {
                    vm.errMessage = err.data.message;
                }).finally(function() {
                    vm.pushRequesting = false;
                    vm.task = {};
                });
            }
            
            vm.editTask = function(task) {
                vm.errMessage = null;
                vm.editRequesting = true;
                $http.put('/api/tasks', task, {headers: {'content-type': 'application/json'}}).then(function(response) {
                    $scope.$emit('getAllTasks', 'modified a task');
                }, function(err) {
                    vm.errMessage = err.data.message
                }).finally(function() {
                     vm.task = {};
                     vm.taskEditing = false;
                     vm.editRequesting = false;
                });
            }

            $rootScope.$on('editTask', function(event, task) {
                vm.taskEditing = true; 
                vm.task = {};
                angular.extend(vm.task, task);
                vm.errMessage = null;
            });            

            vm.clearTask = function() { console.log('eached');
                vm.task = {};
                vm.errMessage = null;
            }
        },
        controllerAs: 'vm'
    }
}

function toDoList($http, $rootScope) {
    return {
        restrict: 'E',
        scope: { },
        templateUrl: 'partials/showTasks.html',
        controller: function($scope, $element, $attrs) {
            var vm = this;
            vm.loading = true;

            function getAllTasks() {
                vm.list = [];
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

            $rootScope.$on('getAllTasks', function(event, data) {
               getAllTasks();
            });

            vm.deleteTask = function(task) {
                if (window.confirm('Are you sure to delete task: '+ task.task_title +' ?')) {
                    $http.delete('/api/tasks',{headers : {'content-type': 'application/json'}, data: task}).then(function() {
                        getAllTasks();
                    }, function(err) {
                        console.log(err);
                    })
                }
            }

            vm.editTask = function(task) { console.log(task);
                $rootScope.$emit('editTask', task);
            }
        },
        controllerAs: 'vm'
    }
}