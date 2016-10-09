--function fooManagerDirective() {-
    var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/fooManager.html',
        scope: {},
        bindToController: {},
        link: link,
        controller: FooManagerController,
        controllerAs: 'vm',
    };

    function link($scope, $element, $attrs) {
        $element.attr('id', $attrs.managerId);
    }

    return directive;
}

function FooManagerController($http) {
    var vm = this;

    vm.showMessage = function (status, message) {
        vm.messageStatus = status;
        vm.message = message;
        $('#msgWindow').modal();
    }

    vm.save = function () {
        if (vm.isNew) {
            $http.post('/Kash.JSTSUT.Web/api/Foos', { Name: vm.Name, Status: vm.Status }).then(function (req) {
                vm.Id = req.data.Id;
                vm.isNew = false;
                vm.showMessage('Información del sistema', 'Creado correctamente');
            },
            function (result) {
                vm.showMessage(result.status, result.statusText);
                vm.new();
            });
        }
        else {
            $http.put('/Kash.JSTSUT.Web/api/Foos/' + vm.Id, { Name: vm.Name, Status: vm.Status }).then(function (req) {
                vm.showMessage('Información del sistema', 'Guardado correctamente');
            },
            function (result) {
                vm.showMessage(result.status, result.statusText);
                vm.new();
            });
        };
    }

    vm.delete = function () {
        var theId = vm.Id;
        $http.delete('/Kash.JSTSUT.Web/api/Foos/' + theId, {}).then(function (req) {
            vm.showMessage('Información del sistema', 'Eliminado correctamente');
            vm.retrieve('previous', theId);
            vm.isNew = false;
        },
        function (result) {
            vm.showMessage(result.status, result.statusText);
            vm.new();
        });
    }

    vm.new = function () {
        vm.Id = 0;
        vm.Name = '';
        vm.Status = '';

        vm.isNew = true;
    }

    vm.retrieve = function (mode, id) {

        if (id) {
            startId = id;
        }
        else {
            startId = vm.Id;
        }
        var retId = undefined;
        $http.get('/Kash.JSTSUT.Web/api/Foos/' + startId + '/' + mode + 'Id', {}).then(function (req) {
            retId = req.data;
            vm.isNew = false;

            $http.get('/Kash.JSTSUT.Web/api/Foos/' + retId, {}).then(function (req) {
                vm.Id = req.data.Id;
                vm.Name = req.data.Name;
                vm.Status = req.data.Status;
            },
            function (result) {
                vm.showMessage(result.status, result.statusText);
                vm.new();
            });
        },
        function (result) {
            vm.showMessage(result.status, result.statusText);
            vm.new();
        });
    }

    vm.retrieve('first');
}

module FooManagement.Directives
{
    export interface IFooManagerDirectiveVM
    {
        isNew: boolean;
        startId: number;
        
        Id: number;
    }

    export class FooManagerDirective
    {

    }
}

angular
    .module('app')
    .directive('fooManager', fooManagerDirective)
    .controller('FooManagerController', FooManagerController);