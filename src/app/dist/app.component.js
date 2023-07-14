"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'home-work';
        this.h2_valid = {
            color: 'white'
        };
        this.h2_invalid = {
            color: 'white'
        };
        //-------------------------------Reactive form---------------->
        this.h2_r_valid = {
            color: 'white'
        };
        this.h2_r_invalid = {
            color: 'white'
        };
    }
    //-------------------------------Template-driven form---------------->
    AppComponent.prototype.submit = function (form) {
        if (form.valid) {
            console.log(form.value);
            this.h2_valid = {
                color: 'green'
            };
        }
        else {
            form.control.markAllAsTouched();
            this.h2_invalid = {
                color: 'red'
            };
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            login: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('[a-zA-Z]+$')]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email], [this.checkEmail]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(7)])
        });
    };
    AppComponent.prototype.checkEmail = function (control) {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var emails = data.map(function (user) { return user.email; });
            return new Promise(function (resolve) {
                setTimeout(function () {
                    if (emails.includes(control.value)) {
                        control.markAllAsTouched();
                        resolve({ uniqEmail: true });
                    }
                    else {
                        resolve(null);
                    }
                }, 1000);
            });
        });
    };
    AppComponent.prototype.submitReactive = function () {
        if (this.form.valid) {
            console.log(this.form.value);
            this.h2_r_valid = {
                color: 'green'
            };
        }
        else {
            this.form.markAllAsTouched();
            this.h2_r_invalid = {
                color: 'red'
            };
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
