function greeter(person) {
    return "Hello, " + person.fName + " " + person.lName;
}
var user = { fName: 'Jane', lName: 'User' };
document.body.textContent = greeter(user);
