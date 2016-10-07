function messageModalDirective() {
    var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/messageModal.html',
        scope: {},
        bindToController: {
            messageStatus: '=',
            message: '='
        },
        link: link,
        controller: MessageModalController,
        controllerAs: 'vm',
    };

    function link($scope, $element, $attrs) {
        $element.attr('id', $attrs.modalId);
    }

    return directive;
}

function MessageModalController() {
}

angular
    .module('app')
    .directive('messageModal', messageModalDirective)
    .controller('MessageModalController', MessageModalController);