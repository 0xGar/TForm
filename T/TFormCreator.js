import TError from "./TError.js";
/*
    TFormCreator

    Description:        * Scans the TForm DOM element and automatically creates form functionality from it.

    Warnings:           * This class supplements TCustomElements; it should not be used directly.

    Purpose:            * Provide dynamic form functionality.

    Prerequisites:      * A properly created "T Web Form" structure in the DOM.
                        * All of the T Web Components that use the form are initialized.

    Limitations:        * Only a singular "T Web Form" can exist in the DOM.

    Example:            See TCustomElements for a proper approach.
                        
                        ...

                        <t-form id="1" method="post" url="127.0.0.1/submit.php">
                            <input id="1" type="text" name="firstName">
                        </t-form>

                        ...
                        ...

                        onSuccess = function(json){ 
                            console.log("Server responded with: " + json);
                        };
                        onFailure = function(json){ 
                            console.log("Error submitting to server: " + json);
                        };

                        let registry = window.customElements.define("t-form", TForm);
                        registry.whenDefined("t-form").then(()=>{
                            let tForm = document.querySelector("t-form");
                            tForm.submit(onSuccess,onFailure);
                        }.bind(this));
*/
export default class TFormCreator extends HTMLElement{
    form=undefined;
    idList=[];
    constructor(){
        super();
        this.errors = new TError();
        this.form = document.createElement("form");
        let elements = this.querySelectorAll("[TForm]");
        for (let i=0;i < elements.length;i++){
            this.add(elements[i].id);
        };
    }
    static get observedAttributes(){
        return ["url","method"]; 
    }
    connectedCallback(){
        if (!this.hasAttribute("method")){
                this.errors.push(`Add "method" attribute to the form (e.g., post or get).`);
        }
        if (!this.hasAttribute("url")){
                this.errors.push(`Add "url" attribute to the form.`);
        }
    }
    add(id){
        this.idList.push(id);
    }
    submit(onSuccess,onFailure){
        if (this.errors.length > 0){
            return;
        }
        if (onSuccess===undefined || onFailure===undefined){
            this.errors.push(`When calling submit(...), supply both onSuccess and onFailure functions.`);
            return;
        }

        let error=false;
        this.idList.forEach(function(id, index){
            let element = document.getElementById(id);
            if (element === undefined) {
                this.errors.push(`${id} is undefined.`);
                error=true;
                return;
            }

            if (typeof element.getValidAttribute !== "undefined"){
                let attribute = element.getValidAttribute();
                 if (attribute == "false"){
                    this.errors.push(`Invalid form data for ${id} (${element.getErrors()})`);
                    onInvalid(element.errors.push(error));
                     error=true;
                     return;
                  }
                  element = element.getQuery();
             }
            this.form.appendChild(element.cloneNode());
        }.bind(this));

        if (error==true) 
            return;

        let form = new FormData(this.form);

        fetch (this.getAttribute("url"), {
            body: form,
            method: this.getAttribute("method")
        }).then(function(response) {
                return response.json()
            }).then(onSuccess).catch(onFailure);
    }
}