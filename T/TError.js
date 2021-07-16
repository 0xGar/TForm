/*
    TError

    Description:        * Logs errors.

    Warnings:           * N/A.

    Purpose:            * Manage errors.

    Prerequisites:      * N/A

    Limitations:        * Errors must be added programatically.

    Example 1:
                        tError = new TError(false); //Initialize with console printing disabled.
                        ...
                        function example() {
                            let error = doRandomStuff();
                            if (error.hasError) { //Error exists
                                return;
                            }
                            //No error; continue the function
                            ...
                        }
                        ...
    Example 2:
                        tError = new TError(false); //Initialize with  console printing disabled.
                        
                        tError.push("There was a problem");
                        tError.push("And another problem.");

                        tError.forEach(function(error){ //Print errors to console
                            console.log(error);
                        });

                        tError.flush() //Clear all errors
*/
export default class TError {
    constructor(debugging){
        this.debugging=debugging;
        this.debugging=false;
        this.errors=[];
    }
    push(err){
        this.errors.push(err);
    }
    flush() {
        this.errors = [];
    }
    get(){
        return this.errors;
    }
    forEach(f) {
        for (var i=0;i<this.errors.length;i++)
            f(this.errors[i],i)
    }
    enableDebugging(){
        this.debugging=true;
    }
    disableDebugging(){
        this.debugging=false;
    }
    get length(){
        return this.errors.length;
    }
    get hasError(){
        return this.errors.length > 1 ? true : false;
    } 
}