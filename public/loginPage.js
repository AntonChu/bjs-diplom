'use strict';

let user = new UserForm();
user.loginFormCallback = data => ApiConnector.login(data, response => {
    response.success ? location.reload() : user.setLoginErrorMessage(response.error)}
);

user.registerFormCallback = data => ApiConnector.register(data, response => {
    response.success ? location.reload() : user.setRegisterErrorMessage(response.error)}
);