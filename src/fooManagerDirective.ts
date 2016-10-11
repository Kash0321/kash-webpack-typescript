export class FooManagerDirective {
    public link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => void;
    public restrict = 'E';
    public replace = true;
    public templateUrl = 'templates/FooManager.html';
    public scope = {};
    public bindToController = {};
    public controller = FooManagerController;
    controllerAs = 'vm';

    constructor() {
        FooManagerDirective.prototype.link = ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {
            $element.attr('id', $attrs.managerId);
        };
    }

    public static Factory(): any {
        var directive = () => {
            return new FooManagerDirective();
        };

        directive['$inject'] = [];

        return directive;
    }
}

export interface IFooManagerVM {
    Id: number;
    Name: string;
    Status: string;
}

export class FooManagerController {
    private MessageStatus: string;
    private Message: string;
    private IsNew: boolean;
    private StartId: number;

    public vm: IFooManagerVM;

    constructor(private $http: angular.IHttpService) { }

    public ShowMessage(status: string, message: string): void {
        this.MessageStatus = status;
        this.Message = message;
        $('#msgWindow').modal();
    }

    public Save(): void {
        if (this.IsNew) {
            this.$http.post('/Kash.JSTSUT.Web/api/Foos', { Name: this.vm.Name, Status: this.vm.Status }).then((req: ng.IHttpPromiseCallbackArg<IFooManagerVM>) => {
                this.vm.Id = req.data.Id;
                this.IsNew = false;
                this.ShowMessage('Información del sistema', 'Creado correctamente');
            },
                function (result) {
                    this.ShowMessage(result.status, result.statusText);
                    this.New();
                });
        }
        else {
            this.$http.put('/Kash.JSTSUT.Web/api/Foos/' + this.vm.Id, { Name: this.vm.Name, Status: this.vm.Status }).then((req) => {
                this.ShowMessage('Información del sistema', 'Guardado correctamente');
            },
                function (result) {
                    this.ShowMessage(result.status, result.statusText);
                    this.New();
                });
        };
    }

    public Delete(): void {
        let theId: number = this.vm.Id;
        this.$http.delete('/Kash.JSTSUT.Web/api/Foos/' + theId, {}).then((req) => {
            this.ShowMessage('Información del sistema', 'Eliminado correctamente');
            this.Retrieve('previous', theId);
            this.IsNew = false;
        },
            function (result) {
                this.ShowMessage(result.status, result.statusText);
                this.New();
            });
    }

    public New(): void {
        this.vm.Id = 0;
        this.vm.Name = '';
        this.vm.Status = '';

        this.IsNew = true;
    }

    public Retrieve(mode: string, id: number) {
        if (id) {
            this.StartId = id;
        }
        else {
            this.StartId = this.vm.Id;
        }

        let retId = undefined;
        this.$http.get('/Kash.JSTSUT.Web/api/Foos/' + this.StartId + '/' + mode + 'Id', {}).then((req: ng.IHttpPromiseCallbackArg<{}>) => {
            retId = req.data;
            this.IsNew = false;

            this.$http.get('/Kash.JSTSUT.Web/api/Foos/' + retId, {}).then((req: ng.IHttpPromiseCallbackArg<IFooManagerVM>) => {
                this.vm.Id = req.data.Id;
                this.vm.Name = req.data.Name;
                this.vm.Status = req.data.Status;
            },
                function (result) {
                    this.ShowMessage(result.status, result.statusText);
                    this.New();
                });
        },
            function (result) {
                this.ShowMessage(result.status, result.statusText);
                this.New();
            });
    }
}