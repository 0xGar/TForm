import TLoader from "./TLoader.js";
import TError from "./TError.js";
import TFormCreator from "./TFormCreator.js";
import TTextbox from "./TTextbox.js";

export default class T {
    constructor() {
        window.TLoader = TLoader;
        window.TError = TError;
        window.TFormCreator = TFormCreator;
        window.TTextbox = TTextbox;
    }
}