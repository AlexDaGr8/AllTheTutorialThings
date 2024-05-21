export class Contact {
    constructor({ email = `` , phone = `` } = {}) {
        this.email = email;
        this.phone = phone;
    }

    isEmpty() { 
        return this.email === null && this.phone === null;
    }
}

export function createContact(data) {
    return Object.freeze(new Contact(data));
}