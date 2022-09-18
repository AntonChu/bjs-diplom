'use strict';

class UseForm{
    constructor(){
        this.loginFormCallback = function(data){
            ApiConnector.login(data, callback => response(callback));
        }
        // this.registerFormCallback(data);
    }
}
