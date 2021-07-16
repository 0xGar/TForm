import T from "./T/T.js";

/*
    Data received from the server
*/
let onSuccess = function(json) {
    console.log("Server response: " + json)
};

/*
    Server response error
*/
let onFailure = function(json){
    console.log("Error getting server response: " + json);
};

/*
    Execute once T Components are initialized
*/
let onReady = function() {
        let errors = TLoader.submit(onSuccess,onFailure); //Submit form
        /*
            Print any errors encountered while processing the forum
            (onFailure(...) is for "fetch" errors,
            whereas this is for forum processing errors (e.g., invalid email))
        */
        errors.forEach(function(err){
            console.log("Received error processing the form: " + err)
        });
        errors.flush(); //Clear error log
    }

new T(); //Load T components

TLoader.ready(onReady); //When T Components are initialized