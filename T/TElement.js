
/*
    TElement

    Description:        * Superclass that tracks data verification for "T Web Component" elements
                        (e.g., is the value in this input box valid or invalid?).

    Warnings:           * This class should not be used directly; extend a class with this one 
                        (seeTTextBox for an example).
                        * Preferably, you do not use this class at all 
                        and instead extend one of the T Web Components
                        (given there's a T Web Component that provides the functionality you require).
                        * The folllowing must be overwritten in the subclasS:
                            onValid(...)
                            onInvalid(...)
                            CSS(...)
                        * The following are optional but are recommended to be overwritten in the subclass:
                            setContent(...)
                            isValid(...) //Must its super and get result on whether to continue or not
                            observedAttributes(...) //Must call its super class (read about this function!)
                            connectedCallback() //Must call its super class
                            attributeChangedCallback(...) //Must call its super class
                            setDefaultAttributes() //Must call its super class

    Purpose:            * Provide code-consistency for all "T Web Components" requiring verification.

    Prerequisites:      * N/A

    Limitations:        * Only provides very basic verification; 
                        subclass is responsible for most of the leg work.

    Example:            See TTextBox for a full solution.

                        class TTextBox extends TElement {
                            constructor(){
                                super();
                                this.innerHTML=`<input type="text">`;
                            }
                            static get observedAttributes(){
                                let attributes =  ["value"];
                                attributes.push(TElement.observedAttributes[0]); //Must call this static method
                                return attributes;
                            }
                            attributeChangedCallback(variable, oldValue, newValue){
                                if (variable == "value")
                                        this.setContent(newValue);
                                else
                                        super.attributeChangedCallback(variable,oldValue,newValue);
                            }
                            setDefaultAttributes(){
                                super.setDefaultAttributes(); //Mandatory
                                //Further verificaiton here
                            }
                            isValid(s){
                                //Return true if valid; false if invalid
                            }
                            onValid(element){
                                //Change CSS to green
                            }
                            onInvalid(element){
                                //Change CSS to red
                            }
                            setContent(value){
                                //Change the value of the input box to passed variable
                            }
                            getContent(element){
                                //Return the value of the input box
                            }  
                            CSS(element) {
                                //Change the input box's CSS
                            }
                        }

*/
export default class TElement extends HTMLElement {
    constructor(){
        super();
        this.errors= new TError(true);
        this.getQuery = this.getQuery.bind(this);
        this.setDefaultAttributes();
    }
    /*
        Name:           onValid
        Warning:        Must override this function in the subclass.
        Input:          An HTML node (e.g., specifically, the document.querSelector()).
        Output:         N/A
        Description:    Executes when element changes from invalid to valid.
    */
    onValid(element){
    }
    /*
        Name:           onInvalid
        Warning:        Must override this function in the subclass.
        Input:          An HTML node (e.g., specifically, the document.querSelector()).
        Output:         N/A
        Description:    Executes when element changes from valid to invalid.
    */
    onInvalid(element){
    }
    /*
        Name:           getContent
        Warning:        Must override this function in the subclass.
        Input:          An HTML node (e.g., specifically, the document.querSelector()).
        Output:         N/A
        Description:    Returns the element's data (e.g., the value from input).
    */
    getContent(element){
    }
    /*
        Name:           getContent
        Warning:        Must override this function in the subclass.
        Input:          An HTML node (e.g., specifically, the document.querSelector()).
        Output:         N/A
        Description:    Set the CSS for the element.
    */
    CSS(element) {
    }
    /*
        Name:           setContent
        Warning:        Must override this function in the subclass.
        Input:          An HTML node (e.g., specifically, the document.querSelector()).
        Output:         N/A
        Description:    Set the content of the element (e.g., use to input data from database).
    */    
    setContent(value){
    }
    /*
        Name:           isValid
        Warning:        Can override this function in the subclass;
                        if so, call super.isValid(s) and ensure 
                        it returns true to continue your function.
                        Also, should call this.checkValidity(value)
                        at the end of your function..
        Input:          A string from the HTML element (e.g., from input box).
        Output:         boolean
        Description:    Specifies whether or not the data is valid.
    */   
    isValid(s){
        if (this.getAttribute("type") == "email"){
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(s);
        }
        return true;
    }    
    /*
        Name:           observedAttributes
        Warning:        * Can override this function in the subclass 
                        (but must append "valid" to your observations if so).
        Input:          N/A
        Output:         string array
        Description:    See JavaScript documentation.
    */  
    static get observedAttributes(){
        return ["valid"];
    }
    /*
        Name:           connectedCallback
        Warning:        Can override in subclass but must call super.
        Input:          N/A
        Output:         N/A
        Description:    * Sets CSS and keybinding 
                        * See Javascript documentation for default usage.
    */  
    connectedCallback(){
        let element = this.getQuery();
        this.CSS(element);

        element.onkeyup = function(e) {
            this.checkValidity(e.target.value);
        }.bind(this); 
    }
    /*
        Name:           attributeChangedCallback
        Warning:        Can override in subclass but should call super.
        Input:          See Javascript documentation.
        Output:         N/A
        Description:    * Checks if the element is valid or invalid upon change.
                        * See Javascript documentation for default usage.
    */ 
    attributeChangedCallback(variable, oldValue, newValue){
        switch(variable){
            case "valid":
                if (newValue=="true" && (oldValue==null || oldValue=="false"))
                    this.onValid(this.getQuery())
                else if (newValue=="false" && (oldValue==null || oldValue=="true"))
                    this.onInvalid(this.getQuery())
                break;
        }
    }
    /*
        Name:           setDefaultAttributes
        Warning:        Can override in subclass but must call super.
        Input:          N/A
        Output:         N/A
        Description:    * Ensures mandatory attributes are set
    */  
    setDefaultAttributes(){
        let element = this.getQuery();
        if (!this.hasAttribute("id"))
            this.errors.push("No ID is set.");
        if (!this.hasAttribute("name"))
            this.errors.push("Name variable has not been set.")
        if (!this.hasAttribute("valid"))
            this.setAttribute("valid","false");
    }
    /*
        Name:           getQuery
        Warning:        Do not override.
        Input:          N/A
        Output:         The element's HTML node.
        Description:    Self-explanatory
    */  
    getQuery(){
        return this.querySelector(`#${this.getAttribute("id")}`);
    }
    /*
        Name:           checkValidity
        Warning:        Do not override. But should call this at the end of setContent() if you use it.
        Input:          The data belonging to the element (e.g., the text from input box).
        Output:         N/A
        Description:    Sets the element's attribute to true or false.
    */  
    checkValidity(s){
        if (this.isValid(s))
            this.setAttribute("valid", "true");
        else 
            this.setAttribute("valid","false");
    }
    /*
        Name:           getValidAttributes
        Warning:        Do not override.
        Input:          N/A
        Output:         Returns the "valid" attribute
        Description:    Self-explanatory
    */  
    getValidAttribute(){
        return this.getAttribute("valid");
    }
}