import TElement from "./TElement.js";

/*
    TTextBox

    Description:        Input box (implementation of TElement).

    Warnings:           Should not initialize directly
                        (e.g. window.customElements.define(...)); see TCustomElements.

    Purpose:            See TElement.

    Prerequisites:      N/A

    Limitations:        Must extend this class to add your own functionality (see Example 2).
                        This is by design and purposeful, but technically a limitation.

    Example:            See TCustomElements for the proper approach.
                        ...
                        <t-box id="1" value="example@example.com" type="email" name="email" minLength=1 maxLength=10>
                        </t-box>
                        ...
                        window.customElemennts.define("t-box",TElement);
                        ...

    Example 2:          Change the CSS of the element
                        class NewTElement TTextBox(){
                            constructor(){
                                super();
                            }
                            CSS(element){
                                element.style.background = "green";
                            }
                        }
                        window.customElements.define("t-box",NewTElement)
*/
export default class TTextBox extends TElement {
    constructor(){
        super();
        this.innerHTML=`<input type="text" id="${this.getAttribute("id")}">`; //TODO: Remove id
    }
    static get observedAttributes(){
        let attributes =  ["value","maxLength","minLength","type"];
        attributes.push(TElement.observedAttributes[0]);
        return attributes;
    }
    attributeChangedCallback(variable, oldValue, newValue){
        switch (variable) {
            case "value":
                this.setContent(newValue);
                break;
            default:
                super.attributeChangedCallback(variable,oldValue,newValue);
                break;
        }
    }
    setDefaultAttributes(){
        super.setDefaultAttributes();

        if (!this.hasAttribute("type"))
            this.setAttribute("type","text");
    }
    isValid(s){
        if (!super.isValid(s))
            return;
    }
    onValid(element){
            element.style.setProperty("background","linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,255,255,1) 1%)","important");
    }
    onInvalid(element){
            element.style.setProperty("background","linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,255,1) 1%)","important");
    }
    setContent(value){
        this.querySelector(`input`).value=value;
        this.checkValidity(value);
    }
    getContent(element){
        return element.value;
    }  
    CSS(element) {
            element.style.width="100%";
            element.style.boxSizing="border-box";
            element.style.paddingLeft="1%";
            element.style.borderRadius="6px";
            element.style.outline="none";
    }
}
