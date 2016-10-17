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
            $element.attr('id', $attrs['managerId']);
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

export class FooManagerController implements IFooManagerVM {
    private MessageStatus: string;
    private Message: string;
    private IsNew: boolean;
    private StartId: number;

    public Id: number;
    public Name: string;
    public Status: string;

    constructor(private $http: angular.IHttpService) { 
        this.New();
        this.Retrieve('first');
    }

    public ShowMessage(status: string, message: string): void {
        this.MessageStatus = status;
        this.Message = message;
        $('#msgWindow').modal();
    }

    public Save(): void {
        if (this.IsNew) {
            this.$http.post('/Kash.JSTSUT.Web/api/Foos', { Name: this.Name, Status: this.Status }).then(
                (req: ng.IHttpPromiseCallbackArg<IFooManagerVM>) => {
                    this.Id = req.data.Id;
                    this.IsNew = false;
                    this.ShowMessage('Información del sistema', 'Creado correctamente');
                },
                (result) => {
                    this.ShowMessage(result.status, result.statusText);
                    this.New();
                }
            );
        }
        else {
            this.$http.put('/Kash.JSTSUT.Web/api/Foos/' + this.Id, { Name: this.Name, Status: this.Status }).then(
                (req) => {
                    this.ShowMessage('Información del sistema', 'Guardado correctamente');
                },
                (result) => {
                    this.ShowMessage(result.status, result.statusText);
                    this.New();
                }
            );
        };
    }

    public Delete(): void {
        let theId: number = this.Id;
        this.$http.delete('/Kash.JSTSUT.Web/api/Foos/' + theId, {}).then(
            (req) => {
                this.ShowMessage('Información del sistema', 'Eliminado correctamente');
                this.Retrieve('previous', theId);
                this.IsNew = false;
            },
            (result) => {
                this.ShowMessage(result.status, result.statusText);
                this.New();
            });
    }

    public New(): void {
        this.Id = 0;
        this.Name = '';
        this.Status = '';

        this.IsNew = true;
    }

    public Retrieve(mode: string, id: number = undefined): void {
        if (id) {
            this.StartId = id;
        }
        else {
            this.StartId = this.Id;
        }

        let retId = undefined;
        this.$http.get('/Kash.JSTSUT.Web/api/Foos/' + this.StartId + '/' + mode + 'Id', {}).then(
            (req: ng.IHttpPromiseCallbackArg<{}>) => {
                retId = req.data;
                this.IsNew = false;

                this.$http.get('/Kash.JSTSUT.Web/api/Foos/' + retId, {}).then(
                    (req: ng.IHttpPromiseCallbackArg<IFooManagerVM>) => {
                        this.Id = req.data.Id;
                        this.Name = req.data.Name;
                        this.Status = req.data.Status;
                    },
                    (result) => {
                        this.ShowMessage(result.status, result.statusText);
                        this.New();
                    }
                );
            },
            (result) => {
                this.ShowMessage(result.status, result.statusText);
                this.New();
            }
        );
    }
}