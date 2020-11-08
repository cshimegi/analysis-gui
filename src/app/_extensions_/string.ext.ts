export { } // this will make it module

declare global { // this is important to access it as global type String
    interface String {
        capitalizeFirstLetter(): string;
    }
}

/**
 * 
 */
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}