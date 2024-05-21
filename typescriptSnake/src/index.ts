interface Person {
    fName: string;
    lName: string;
}

function greeter(person: Person) {
    return `Hello, ${person.fName} ${person.lName}`;
}

let user = { fName: 'Jane', lName: 'User' };

document.body.textContent = greeter(user);