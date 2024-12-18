export class ErrorHandlerClass{
    constructor(message, statusCode, stack, name){
        this.message = message;
        this.statusCode = statusCode;
        this.stack = stack;
        this.name = name ;
    }
}