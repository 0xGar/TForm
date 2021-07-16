/*
    TCustomElements

    Description:        * Registers all the T-Form Components by scanning the DOM.
                        * Provides dynamic form submittion/server response functionality (JSON).

    Warnings:           * N/A

    Purpose:            * Denote when all T Web Components are initialized
                        * Dynamically submit the form/receive server response (JSON).

    Prerequisites:      * A properly-created "T Web Form" structure in the DOM (see the TFormCreator class). 
                        * All "T Web Form" components must be uninitialized (e.g, window.customElements has not been called).

    Limitations:      Only a singular "T Web Form" can exist in the DOM.

    Example:
                        ...

                        <t-form id="1" method="post" url="127.0.0.1/submit.php">
                            <input id="1" type="text" name="firstName">
                            <t-box id ="2" type="email" name="email"></t-box>
                        </t-form>

                        ...

                        onSuccess = function(json){ 
                            console.log("Server responded with: " + json);
                        };
                        onFailure = function(json){ 
                            console.log("Error submitting to server: " + json);
                        };

                        TCustomElements.ready( ()=>{
                            TCustomElements.submit(onSuccess,onFailure);
                        });

                        ...
*/
export default class TLoader {
    static promises=[];
    /*
        ready(...)
        Input:          function()  -> Called once all "T Web Components" are initialized.
        Output:         N/A.
        Description:    Executes code once the "T Web Components" are initialized.
    */
    static ready(f){
        TLoader._defineAll();
        Promise.all(this.promises).then(f);
    }
    /*
        submit(...)
        Input:          * function(json) -> Called upon server response.
                        * function(json) -> Called upon error (e.g., can't connect to server).
        Description:    Call to submit the T Web Form to the server & get a response back (JSON).
                    
    */
    static submit(s,f){
        document.querySelector("t-form").submit(s,f);
        return document.querySelector("t-form").errors;
    }
    static _define(s,f){
        window.customElements.define(s,f);
        this.promises.push(window.customElements.whenDefined(s));
    }
    static _defineAll(){
        if (document.querySelector(`t-textbox`)!=null){ //TODO: dynamic load; do not use module
            TLoader._define("t-textbox",TTextbox);
        };
        if (document.querySelector(`t-form`)!=null){
            TLoader._define("t-form",TFormCreator);
        };                
    }
}