export class TestDirective {
    public link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => void;
    public restrict = 'E';
    public replace = true;
    public templateUrl = 'templates/Test.html';
    public scope = {};
    public bindToController = {};
    public controller = TestController;
    controllerAs = 'vm';

    constructor() {
        TestDirective.prototype.link = 
            ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => { };
    }

    public static Factory(): any {
        var directive = () => {
            return new TestDirective();
        };

        directive['$inject'] = [];

        return directive;
    }
}

export class TestController {

    public vm: any;

    constructor(private $http: angular.IHttpService) { }
}