class Person {
    constructor (fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }

    get fullName () {
        return this.firstName + ' ' + this.lastName;
    }

    set fullName (name) {
        var splitName = name.split(' ');
        this.firstName = splitName[0];
        this.lastName = splitName[1];
    }
}